import { Component, ElementRef, Renderer2 } from '@angular/core';
import { createWorker } from "tesseract.js";

@Component({
  selector: 'mt-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.scss'],
})
export class AddParcelComponent {
  worker!: Tesseract.Worker
  video!: HTMLVideoElement | null;
  snapshot!: string | null;
  result!: Tesseract.Page;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  async ngAfterViewInit() {
    await this.createWorker();
    this.openCamera();
  }

  async createWorker() {
    this.worker = await createWorker();
  }

  openCamera() {
    const video = document.querySelector('video');

    // Store video element for later use.
    this.video = video;

    console.log('openCamera', video);

    if (video && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: {
              exact: 'environment',
            },
          },
          audio: false,
        })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log('Something went wrong!', error);
        });
    }
  }

  takeSnapshot() {
    console.log('takeSnapshot', this.video);

    const width = this.video?.offsetWidth || 100;
    const height = this.video?.offsetHeight || 100;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (context && this.video) {
      context.drawImage(this.video, 0, 0, width, height);
    }

    this.snapshot = canvas.toDataURL('image/jpeg', 1);

    setTimeout(() => {
      const img: HTMLImageElement = document.getElementById(
        'preview'
      ) as HTMLImageElement;

      img.src = canvas.toDataURL('image/jpeg', 1);
    });
  }

  async validateSnapshot() {
    console.log('validateSnapshot');
    if (!this.snapshot) {
      return;
    }

    const ret = await this.worker.recognize(this.snapshot)

    this.result = ret.data
  }

  deleteSnapshot() {
    console.log('deleteSnapshot');
    this.snapshot = null;
    setTimeout(() => this.openCamera());
  }
}
