import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-shipping-information></app-shipping-information>
  `,
  styles: [
    ':host {
      display: block;
      min-height: 100vh;
    }'
  ]
})
export class AppComponent {
  title = 'shipping-info-app';
}
