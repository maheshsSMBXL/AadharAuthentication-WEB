import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaceRecognizeComponent } from './Components/face-recognize/face-recognize.component';
import { AadharVerificationComponent } from './Components/aadhar-verification/aadhar-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    FaceRecognizeComponent,
    AadharVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
