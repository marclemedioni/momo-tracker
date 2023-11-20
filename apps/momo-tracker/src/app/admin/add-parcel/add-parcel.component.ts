import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'mt-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.scss'],
})
export class AddParcelComponent {
  video!: HTMLVideoElement | null;
  snapshot!: string | null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.openCamera();
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

  validateSnapshot() {
    console.log('validateSnapshot');
  }

  deleteSnapshot() {
    console.log('deleteSnapshot');
    this.snapshot = null;
    setTimeout(() => this.openCamera());
  }
}
