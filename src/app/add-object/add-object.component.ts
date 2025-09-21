import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/), Validators.min(1900), Validators.max(new Date().getFullYear())]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0.01)]],
      cpuModel: ['', [Validators.required, Validators.minLength(2)]],
      hardDiskSize: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = this.form.value;
      const requestBody = {
        name: formData.name,
        data: {
          year: parseInt(formData.year),
          price: parseFloat(formData.price),
          "CPU model": formData.cpuModel,
          "Hard disk size": formData.hardDiskSize
        }
      };

      this.http.post('https://api.restful-api.dev/objects', requestBody)
        .subscribe({
          next: (response) => {
            console.log('Object created successfully:', response);
            this.form.reset();
            this.isSubmitting = false;
            // You can add success notification here
          },
          error: (error) => {
            console.error('Error creating object:', error);
            this.isSubmitting = false;
            // You can add error notification here
          }
        });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'year') {
          return 'Year must be a 4-digit number';
        }
        if (fieldName === 'price') {
          return 'Price must be a valid number (e.g., 1849.99)';
        }
      }
      if (field.errors['min']) {
        if (fieldName === 'year') {
          return 'Year must be 1900 or later';
        }
        if (fieldName === 'price') {
          return 'Price must be greater than 0';
        }
      }
      if (field.errors['max']) {
        return `Year cannot be later than ${new Date().getFullYear()}`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      year: 'Year',
      price: 'Price',
      cpuModel: 'CPU Model',
      hardDiskSize: 'Hard Disk Size'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.errors && field.touched);
  }
}
