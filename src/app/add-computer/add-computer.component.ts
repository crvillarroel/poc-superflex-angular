import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.css']
})
export class AddComputerComponent {
  form: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/), Validators.min(1970), Validators.max(currentYear)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0.01)]],
      cpuModel: ['', [Validators.required, Validators.minLength(2)]],
      hardDiskSize: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const v = this.form.value;
    const body = {
      name: v.name,
      data: {
        year: parseInt(v.year, 10),
        price: parseFloat(v.price),
        'CPU model': v.cpuModel,
        'Hard disk size': v.hardDiskSize
      }
    };

    this.http.post('https://api.restful-api.dev/objects', body).subscribe({
      next: () => {
        this.successMessage = 'Computer added successfully!';
        this.form.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'There was a problem adding the computer. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  fieldInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  fieldError(name: string): string {
    const c = this.form.get(name);
    if (!c?.errors) return '';
    if (c.errors['required']) return this.label(name) + ' is required';
    if (c.errors['minlength']) return `${this.label(name)} must be at least ${c.errors['minlength'].requiredLength} characters`;
    if (c.errors['pattern']) {
      if (name === 'year') return 'Year must be a 4 digit number';
      if (name === 'price') return 'Price must be a valid number (e.g. 1849.99)';
    }
    if (c.errors['min']) {
      if (name === 'year') return 'Year must be 1970 or later';
      if (name === 'price') return 'Price must be greater than 0';
    }
    if (c.errors['max']) return `Year cannot exceed ${new Date().getFullYear()}`;
    return '';
  }

  private label(name: string): string {
    const map: Record<string,string> = { name: 'Name', year: 'Year', price: 'Price', cpuModel: 'CPU Model', hardDiskSize: 'Hard Disk Size' };
    return map[name] || name;
  }
}
