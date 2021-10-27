import {AfterViewInit, Component} from '@angular/core';

import Quagga from "@ericblade/quagga2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  barcodeDec = [ 'code_128_reader', 'code_32_reader', 'ean_reader', 'codabar_reader', 'upc_reader', 'code_93_reader' ]
  /*value = '';
  isError = false;

  onError(error: any) {
    this.isError = error;
    alert(error);
  }*/

  ngAfterViewInit() {
    const this$ = this;
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner') || '',
        },
        decoder: {
          readers: this.barcodeDec,
        }
      },
      function(err) {
        if (err) {
          alert(err);
          Quagga.stop();
          return;
        }
        Quagga.start();

        Quagga.onProcessed(function(result) {
          let drawingCtx = Quagga.canvas.ctx.overlay, drawingCanvas = Quagga.canvas.dom.overlay;
          if (result) {
            if (result.boxes) {
              drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width') || ''), parseInt(drawingCanvas.getAttribute('height') || ''));
              result.boxes.filter(function(box) {
                return box !== result.box;
              }).forEach(function(box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
              });
            }

            if (result.box) {
              Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
              Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
          }
        });

        Quagga.onDetected((res) => {
          alert(res);
        });
      }
    );
  }
}
