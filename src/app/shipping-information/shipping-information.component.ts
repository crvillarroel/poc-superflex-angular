import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-information',
  template: `
    <div class="canvas-bg">
      <div class="form-card">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" autocomplete="off">
          <!-- Legend -->
          <div class="legend">
            <h2 class="legend-title">Shipping information</h2>
            <div class="legend-desc">We ship within 2 working days</div>
          </div>

          <!-- Full Name Field -->
          <div class="field">
            <label for="fullName" class="field-label">Full Name</label>
            <div class="input-wrapper">
              <input
                id="fullName"
                formControlName="fullName"
                type="text"
                class="input"
                [attr.aria-label]="'Full Name'"
                placeholder="Value"
                required
              />
            </div>
          </div>

          <!-- Location Field -->
          <div class="field">
            <label for="location" class="field-label">Location</label>
            <div class="select-wrapper">
              <select
                id="location"
                formControlName="location"
                class="select"
                [attr.aria-label]="'Location'"
                required
              >
                <option value="" disabled selected hidden>Value</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Other">Other</option>
              </select>
              <img
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/26f80e2f-ac3b-4227-b5cd-ee2675bf61fc"
                alt=""
                class="chevron"
                aria-hidden="true"
              />
            </div>
          </div>

          <!-- Delivery Note Field -->
          <div class="field">
            <label for="deliveryNote" class="field-label">Delivery note</label>
            <div class="textarea-wrapper">
              <textarea
                id="deliveryNote"
                formControlName="deliveryNote"
                class="textarea"
                rows="2"
                [attr.aria-label]="'Delivery note'"
                placeholder="Value"
              ></textarea>
              <img
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7433d6b6-56d5-4037-a55b-fd98a3fbe9a6"
                alt=""
                class="drag-icon"
                aria-hidden="true"
              />
            </div>
          </div>

          <!-- Checkbox Field -->
          <div class="checkbox-field">
            <label class="checkbox-row">
              <span class="custom-checkbox">
                <input
                  type="checkbox"
                  formControlName="acceptTerms"
                  class="checkbox-input"
                  required
                />
                <span class="checkbox-box">
                  <img
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/91d0e1b7-e2dd-4c94-8d3c-9d60bea214a8"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
              </span>
              <span class="checkbox-label">I accept the terms</span>
            </label>
            <div class="checkbox-desc-row">
              <img
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7433d6b6-56d5-4037-a55b-fd98a3fbe9a6"
                alt=""
                class="space-icon"
                aria-hidden="true"
              />
              <a href="#" class="checkbox-desc">Read our T&amp;Cs</a>
            </div>
          </div>

          <!-- Button Group -->
          <div class="button-group">
            <button
              type="submit"
              class="submit-btn"
              [disabled]="form.invalid"
            >
              Save shipping information
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* Canvas background */
    .canvas-bg {
      background: #e5e5e5;
      min-height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 40px 0;
    }
    /* Card */
    .form-card {
      background: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      width: 320px;
      padding: 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    /* Legend */
    .legend {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }
    .legend-title {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      color: #1e1e1e;
      margin: 0;
    }
    .legend-desc {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #757575;
    }
    /* Field */
    .field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .field-label {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #1e1e1e;
      margin-bottom: 0;
    }
    .input-wrapper {
      background: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
    }
    .input {
      border: none;
      outline: none;
      width: 100%;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      color: #1e1e1e;
      background: transparent;
      line-height: 16px;
    }
    .input::placeholder {
      color: #b3b3b3;
      font-weight: 400;
    }
    /* Select Field */
    .select-wrapper {
      position: relative;
      background: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 12px 12px 12px 16px;
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
    }
    .select {
      border: none;
      outline: none;
      width: 100%;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      color: #1e1e1e;
      background: transparent;
      appearance: none;
      line-height: 16px;
      padding-right: 24px;
    }
    .chevron {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      pointer-events: none;
    }
    /* Textarea Field */
    .textarea-wrapper {
      position: relative;
      background: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      align-items: flex-start;
      width: 100%;
      min-height: 80px;
    }
    .textarea {
      border: none;
      outline: none;
      width: 100%;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      color: #1e1e1e;
      background: transparent;
      line-height: 22px;
      resize: none;
      min-height: 40px;
    }
    .textarea::placeholder {
      color: #b3b3b3;
      font-weight: 400;
    }
    .drag-icon {
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: 16px;
      height: 16px;
      opacity: 0.5;
      pointer-events: none;
    }
    /* Checkbox Field */
    .checkbox-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }
    .custom-checkbox {
      position: relative;
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    }
    .checkbox-input {
      position: absolute;
      width: 16px;
      height: 16px;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }
    .checkbox-box {
      width: 16px;
      height: 16px;
      background: #2c2c2c;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }
    .checkbox-label {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #1e1e1e;
    }
    .checkbox-desc-row {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      position: relative;
      margin-top: 2px;
    }
    .space-icon {
      width: 16px;
      height: 16px;
      position: absolute;
      left: 0;
      top: 3px;
      pointer-events: none;
      opacity: 0.5;
    }
    .checkbox-desc {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #757575;
      text-decoration: underline;
      margin-left: 28px;
    }
    /* Button Group */
    .button-group {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .submit-btn {
      width: 100%;
      background: #2c2c2c;
      color: #f5f5f5;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      line-height: 16px;
      font-weight: 400;
      border: none;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .submit-btn:hover:not(:disabled) {
      background: #1e1e1e;
    }
  `]
})
export class ShippingInformationComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      location: ['', Validators.required],
      deliveryNote: [''],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      alert('Shipping information saved!');
    }
  }
}
