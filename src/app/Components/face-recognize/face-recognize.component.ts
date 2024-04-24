import { Component, ViewChild, ElementRef } from '@angular/core';
import { AadharService } from 'src/app/aadhar.service';

@Component({
  selector: 'app-face-recognize',
  templateUrl: './face-recognize.component.html',
  styleUrls: ['./face-recognize.component.css']
})
export class FaceRecognizeComponent {

  @ViewChild('videoElement') videoElement!: ElementRef;
  private video!: HTMLVideoElement;
  mediaRecorder: any;
  streamVideo!: MediaStream;

  constructor(
    private aadharService: AadharService
  ) { }

  ngOnInit() {
    this.video = this.videoElement?.nativeElement;
    //this.initCamera();
    this.load(true);
  }

  async initCamera() {
    debugger;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  async load(firstTime = false) {
    debugger;
    //if (firstTime) await register(await connect());
    const stream = false
      ? await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true },
        })
      : await navigator.mediaDevices.getUserMedia({
          video: {
            width: 860,
          },
          audio: { echoCancellation: true },
        });
    this.video = this.videoElement.nativeElement;
    this.video.autoplay = true;
    this.video.muted = true;
    //this.stream = true;
    this.video.srcObject = stream;
    //this.MediaStream = stream.getTracks();
  }

  captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    const context = canvas.getContext('2d');
    context!.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/jpeg');
    this.convertToBase64(imageDataURL);

    this.streamVideo = this.video.srcObject as MediaStream;
    this.streamVideo.getTracks().forEach(track => track.stop());    
  }

  convertToBase64(imageDataURL: string) {
    const base64Image = imageDataURL.split('base64,')[1];
    console.log('Base64 Image:', base64Image);
    // Here you can send the base64Image to your server or use it as needed

    this.aadharService
          .faceMatch({scanBase64 : base64Image, aadhaarBase64 : this.aadharService.aadharBase64})
          .subscribe((res) => {
            if (res) {              
            }
          });
  }
}
