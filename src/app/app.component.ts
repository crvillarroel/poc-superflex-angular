import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-shipping-information></app-shipping-information>
    <app-absence-summary></app-absence-summary>
    <app-add-object></app-add-object>
  `,
  styles: [
    `:host {
      display: block;
      min-height: 100vh;
    }`
  ]
})
export class AppComponent {
  title = 'shipping-info-app';
}
