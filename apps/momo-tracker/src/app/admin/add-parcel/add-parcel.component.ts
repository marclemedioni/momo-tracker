import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import Tesseract from 'tesseract.js';
import { StorageAllocator } from '@momo-tracker/storage-allocator';
import { LocationService } from '../../core/services/location.service';
import { UniqNumberService } from '../../core/services/uniq-number.service';
import { ParcelService } from '../../core/services/parcel.service';
import { Location, Parcel } from '@momo-tracker/models';
import { Router } from '@angular/router';

interface WordInfo {
  text: string;
  bbox: { x0: number, y0: number, x1: number, y1: number };
  id: number;
}

@Component({
  selector: 'mt-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.scss'],
})
export class AddParcelComponent implements AfterViewInit, OnDestroy, OnInit  {

  @ViewChild('capturedImage') capturedImage!: ElementRef;
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  mediaStream: MediaStream | null = null;
  videoWidth = 0;
  videoHeight = 0;
  scanning = false;
  captured = false;
  textResult = '';
  imageWithHighlights!: string;
  uniqNumber!: number | null;
  bestLocation!: Location | null;
  wordsInfo: WordInfo[] = [];

  parcelForm = this.fb.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    locationId: new FormControl<number | null>(null, { validators:[Validators.required], nonNullable: true}),
    size: new FormControl<Parcel['size']|null>(null ,{ validators:[Validators.required], nonNullable: true}),
  });


  constructor(private fb: NonNullableFormBuilder, private locationService: LocationService, private uniqNumberService: UniqNumberService, private parcelService: ParcelService,  private router: Router) { }

  async ngOnInit() {
    const locations = await this.locationService.getAll();
    this.parcelForm.get('size')?.valueChanges.subscribe(async (selectedValue) => {
      this.bestLocation = null;
      this.uniqNumber = null;

      const storageAllocator = new StorageAllocator([...locations]);
      if (!selectedValue) {
        return;
      }

      this.bestLocation = storageAllocator.findBestZone(selectedValue)

      if (this.bestLocation) {
        this.parcelForm.patchValue({locationId: this.bestLocation.id})
        this.uniqNumber = await this.uniqNumberService.getFirstAvailable(this.bestLocation.shortName);
      }
    })

    this.parcelForm.updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    this.setupCamera();
  }

  setupCamera(): void {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          this.mediaStream = stream;
          const video = this.videoElement.nativeElement;
          video.srcObject = stream;
          video.play();
          video.onloadedmetadata = () => {
            this.videoWidth = video.videoWidth;
            this.videoHeight = video.videoHeight;
          };
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
        });
    }
  }

  captureImage(): void {
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    const video = this.videoElement.nativeElement;
    const rect = this.getRecognitionRectangle();

    context.drawImage(video, rect.x, rect.y, rect.width, rect.height, 0, 0, canvas.width, canvas.height);
    this.wordsInfo = [];
    this.captured = true;
    this.scanText(canvas);
  }

  cancelImage() {
    this.captured = false;
  }

  getRecognitionRectangle(): { x: number, y: number, width: number, height: number } {
    // Calculez les dimensions et la position du rectangle en fonction de la taille de la vidéo
    const video = this.videoElement.nativeElement;
    const scale = video.videoWidth / video.offsetWidth;
    const rectWidth = 300 * scale;  // Largeur du rectangle en pixels (ajustez selon vos besoins)
    const rectHeight = 150 * scale; // Hauteur du rectangle en pixels (ajustez selon vos besoins)
    const rectX = (video.videoWidth - rectWidth) / 2;
    const rectY = (video.videoHeight - rectHeight) / 2;

    return { x: rectX, y: rectY, width: rectWidth, height: rectHeight };
  }

  onImageLoad(): void {
    // Créer des éléments HTML pour les mots
    this.createHtmlOverlaysForWords();
  }

  scanText(canvas: HTMLCanvasElement): void {
    this.scanning = true;
    Tesseract.recognize(
      canvas,
      'eng',
      { logger: m => console.log(m) }
    ).then(result => {
      this.textResult = result.data.text;
      this.highlightWords(result.data.words);
      this.imageWithHighlights = canvas.toDataURL();
      this.scanning = false;
    });
  }

  highlightWords(words: Tesseract.Word[]): void {
    this.wordsInfo = words.map((word, index) => ({
      text: word.text,
      bbox: word.bbox,
      id: index
    }));
  }

  calculateScaleFactor(): number {
    const imageElement = this.capturedImage.nativeElement;
    return imageElement.naturalWidth / imageElement.clientWidth;
  }



  createHtmlOverlaysForWords(): void {
    const container = document.getElementById('overlay-container');
    const scaleFactor = this.calculateScaleFactor();

    if (!container) {
      return
    }

    this.wordsInfo.forEach(word => {
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.left = `${word.bbox.x0 / scaleFactor}px`;
      element.style.top = `${word.bbox.y0 / scaleFactor}px`;
      element.style.width = `${(word.bbox.x1 - word.bbox.x0) / scaleFactor}px`;
      element.style.height = `${(word.bbox.y1 - word.bbox.y0) / scaleFactor}px`;
      element.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // Style de surbrillance
      element.onclick = () => this.onWordClick(word);
      container.appendChild(element);
    });
  }

  onWordClick(word: WordInfo): void {
    for (const field of ['lastName', 'firstName']) { // 'field' is a string
      const control = this.parcelForm.get(field); // 'control' is a FormControl
      if (control && !control.value) {
        control.setValue(word.text);
        return;
      }

    }
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  stopCamera(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
  }

  async addParcel() {
    if (!this.parcelForm.valid) {
      return;
    }

    const parcel = this.parcelForm.getRawValue();
    await this.parcelService.add({
      locationId: parcel.locationId as number,
      size: parcel.size as Parcel['size'],
      recipient: {
        firstName: parcel.firstName,
        lastName: parcel.lastName
      },
      receivedAt: new Date(),
      uniqNumber: `${this.bestLocation?.shortName}${this.uniqNumber}`
    }, this.uniqNumber as number);

    this.router.navigate(['admin/parcels']).then(() => {
      this.router.navigate(['admin/parcels/add'])
    })
  }
}
