import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { VideoControlsComponent } from "./video-controls/video-controls.component";
import { AvailableCamerasComponent } from "./available-cameras/available-cameras.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    VideoControlsComponent,
    AvailableCamerasComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
