import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AadharService } from 'src/app/aadhar.service';

@Component({
  selector: 'app-aadhar-verification',
  templateUrl: './aadhar-verification.component.html',
  styleUrls: ['./aadhar-verification.component.css']
})
export class AadharVerificationComponent {
url:any;
  

  constructor(
    public aadharService: AadharService,private domSanitizer:DomSanitizer
  ) {
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(
      "https://player.vimeo.com/video/840011485?autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;muted=1&amp;controls=0&amp;api=1&amp;player_id=vvvvimeoVideo-9892202"
    ) as string;    
  }

  getOtp:boolean = true;
  submitOtp:boolean = false;
  //aadharVerification:boolean = true;
  //faceScan:boolean = false;
  aadharDetails:boolean = false;

  aadharNumber:any;
  otp:any;
  transactionId:any;

  async myfunc()
  {
    await this.aadharService
          .getOtp({aadhaarId : this.aadharNumber})
          .subscribe((res:any) => {
            if (res) {   
              this.transactionId = res;     
              
              this.getOtp = false;
              this.submitOtp = true;
              this.aadharService.faceScan = false;
              this.aadharService.aadharDetails = false;
            }
          });       
  }
  aadharPhotoBase64:any;
  customerName:any;
  gender:any;
  customerAadharDetails:any;

  async scanface()
  {
    await this.aadharService
          .submitOtp({aadharOTP : this.otp, transactionId : this.transactionId})
          .subscribe((res:any) => {
            if (res) {
              this.customerAadharDetails = res.data.aadhaar_data;
              //this.aadharPhotoBase64 = res.data.aadhaar_data.photo_base64;
              this.aadharService.aadharBase64 = res.data.aadhaar_data.photo_base64; 
              this.customerName = res.data.aadhaar_data.name;   
              this.gender = res.data.aadhaar_data.gender;
              
              this.getOtp = false;
              this.submitOtp = false;
              this.aadharService.faceScan = true;
              this.aadharService.aadharDetails = false;
            }
          });
  }
}
