import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppService {
  getAvailableCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    let options: HTMLOptionElement[] = [];

    videoDevices.map((videoDevice) => {
      const option = new Option();
      option.value = videoDevice.deviceId;
      option.label = videoDevice.label;
      options.push(option);
    });

    return options;
  };
}
