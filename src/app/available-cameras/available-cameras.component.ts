import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-available-cameras",
  templateUrl: "./available-cameras.component.html",
  styleUrls: ["./available-cameras.component.css"],
})
export class AvailableCamerasComponent implements OnInit {
  cameraOptions = [];

  @Output() cameraSelected = new EventEmitter<string>();

  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .getAvailableCameras()
      .then((options) => (this.cameraOptions = [...options]));
  }

  onCameraSelected(deviceId: string) {
    this.cameraSelected.emit(deviceId);
  }
}
