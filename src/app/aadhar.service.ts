import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AadharService {

  aadharBase64:any;

  constructor(private http: HttpClient) { }
  
  getOtp(data: any) {
    return this.http.post(
      environment.serviceUrl + '/AadhaarId',
      data,{responseType:'text'}
    );
  }
  submitOtp(data: any) {
    return this.http.post(
      environment.serviceUrl + '/AadhaarOTP',
      data
    );
  }
  faceMatch(data: any) {
    return this.http.post(
      environment.serviceUrl + '/ImageVerification',
      data
    );
  }
}
