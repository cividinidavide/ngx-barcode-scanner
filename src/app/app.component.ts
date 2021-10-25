import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = '';
  isError = false;

  onError(error: any) {
    this.isError = error;
    alert(error);
  }
}
