import { Component } from '@angular/core';

@Component({
  selector: 'app-aadhar-verification',
  templateUrl: './aadhar-verification.component.html',
  styleUrls: ['./aadhar-verification.component.css']
})
export class AadharVerificationComponent {

  getOtp:boolean = true;
  submitOtp:boolean = false;
  //aadharVerification:boolean = true;
  faceScan:boolean = false;

  myfunc()
  {
    debugger;
    this.getOtp = false;
    this.submitOtp = true;
    this.faceScan = false;
  }
  scanface()
  {  
    debugger;  
    this.getOtp = false;
    this.submitOtp = false;
    this.faceScan = true;
  }
}
