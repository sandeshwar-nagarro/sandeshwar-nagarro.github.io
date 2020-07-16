import { Component, ViewChild, OnInit } from "@angular/core";
//import COCO-SSD model as cocoSSD
// import * as cocoSSD from "@tensorflow-models/coco-ssd";

declare const cocoSsd: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  streamSrc: MediaStream;
  streamStarted = false;
  videoEl;
  canvasEl;

  ngOnInit() {}

  startStream = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.handleStream(stream);
  };

  handleStream = (stream: MediaStream) => {
    this.streamSrc = stream;
    this.streamStarted = true;
    this.predictWithCocoModel();
  };

  public async predictWithCocoModel() {
    const model = await cocoSsd.load({
      base: "lite_mobilenet_v2",
    });
    this.videoEl = document.getElementById("video");
    this.detectFrame(this.videoEl, model);
  }

  detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  renderPredictions = (predictions) => {
    this.canvasEl = document.getElementById("canvas");
    const ctx = this.canvasEl.getContext("2d");
    this.canvasEl.width = 300;
    this.canvasEl.height = 300;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Fonts
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(this.videoEl, 0, 0, 300, 300);

    predictions.forEach((prediction) => {
      // Bounding boxes's coordinates and sizes
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Bounding box style
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      // Draw the bounding
      ctx.strokeRect(x, y, width, height);

      // Label background
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach((prediction) => {
      // Write prediction class names
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });
  };
}
