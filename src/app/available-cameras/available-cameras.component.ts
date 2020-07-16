import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-available-cameras",
  templateUrl: "./available-cameras.component.html",
  styleUrls: ["./available-cameras.component.css"],
})
export class AvailableCamerasComponent implements OnInit {
  cameraOptions = [];

  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    const defaultOption = new Option();
    defaultOption.label = "Select camera";
    this.cameraOptions.push(defaultOption);

    this.appService
      .getCameraSelection()
      .then((options) => (this.cameraOptions = [defaultOption, ...options]));
  }
}
