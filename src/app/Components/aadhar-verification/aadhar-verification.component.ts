import { Component } from '@angular/core';
import { AadharService } from 'src/app/aadhar.service';

@Component({
  selector: 'app-aadhar-verification',
  templateUrl: './aadhar-verification.component.html',
  styleUrls: ['./aadhar-verification.component.css']
})
export class AadharVerificationComponent {

  constructor(
    public aadharService: AadharService
  ) {
  }

  getOtp:boolean = true;
  submitOtp:boolean = false;
  //aadharVerification:boolean = true;
  faceScan:boolean = false;
  aadharDetails:boolean = false;

  aadharNumber:any;
  otp:any;
  transactionId:any;

  async myfunc()
  {
    debugger;
    await this.aadharService
          .getOtp({aadhaarId : this.aadharNumber})
          .subscribe((res) => {
            if (res) {   
              this.transactionId = res;           
            }
          });
    this.getOtp = false;
    this.submitOtp = true;
    this.faceScan = false;
    this.aadharService.aadharDetails = false;
    //this.aadharDetails = this.aadharService.aadharDetails;
  }
  aadharPhotoBase64:any;
  customerName:any;
  gender:any;
  customerAadharDetails:any;

  async scanface()
  {
    debugger;
    await this.aadharService
          .submitOtp({aadharOTP : this.otp, transactionId : this.transactionId})
          .subscribe((res:any) => {
            if (res) {
              this.customerAadharDetails = res.data.aadhaar_data;
              //this.aadharPhotoBase64 = res.data.aadhaar_data.photo_base64;
              this.aadharService.aadharBase64 = res.data.aadhaar_data.photo_base64; 
              this.customerName = res.data.aadhaar_data.name;   
              this.gender = res.data.aadhaar_data.gender;      
            }
          });
    this.getOtp = false;
    this.submitOtp = false;
    this.faceScan = true;
    this.aadharService.aadharDetails = false;
    //this.aadharDetails = this.aadharService.aadharDetails;
  }
}
