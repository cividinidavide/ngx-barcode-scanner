import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  enableCamera = false;
  errorMessage: string;

  onEnableScan(): void {
    if (this.enableCamera) {
      this.enableCamera = false;
      Quagga.stop();
    } else {
      this.onOpenCamera();
    }
  }

  onOpenCamera() {
    this.enableCamera = true;
    setTimeout(() => {
      Quagga.init({
          inputStream: {
            constraints: {
              facingMode: 'environment'
            }
          },
          decoder: {
            readers: [
              'code_39_reader',
              'code_39_vin_reader'
            ]
          },
        },
        (err) => {
          if (err) {
            this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
          } else {
            Quagga.start();

            Quagga.onDetected((res) => {
              this.onBarcodeScanned(res.codeResult.code);
            });
          }
        });
    }, 100);
  }

  onBarcodeScanned(barcode: string) {
    alert(barcode);
  }
}
