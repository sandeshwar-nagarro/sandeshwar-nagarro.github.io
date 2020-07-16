import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  streamSrc: MediaStream;
  streamStarted = false;

  startStream = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.handleStream(stream);
  };

  handleStream = (stream: MediaStream) => {
    this.streamSrc = stream;
    this.streamStarted = true;
  };
}
