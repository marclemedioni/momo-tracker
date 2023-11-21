import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as Tesseract from 'tesseract.js';

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
export class AddParcelComponent implements AfterViewInit, OnDestroy  {

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
  wordsInfo: WordInfo[] = [];

  constructor() { }

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

    console.log(scaleFactor)

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
    alert(word.text);
    // Réagir à la sélection du mot ici
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  stopCamera(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
  }
}
