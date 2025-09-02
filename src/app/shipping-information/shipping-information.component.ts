import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-information',
  templateUrl: './shipping-information.component.html',
  styleUrls: ['./shipping-information.component.css']
})

export class ShippingInformationComponent {
  form: FormGroup;
  relatedProducts = [
    {
      id: 1,
      name: 'Express Shipping',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Gift Wrapping',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Insurance Coverage',
      price: 12.50,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=100&fit=crop'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ageVerification: [false, Validators.requiredTrue],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      location: ['', Validators.required],
      deliveryNote: [''],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  addProduct(product: any) {
    console.log('Adding product to order:', product);
    alert(`${product.name} added to your order for $${product.price}`);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Order completed:', this.form.value);
      alert('Order completed successfully! You will receive a confirmation email shortly.');
    } else {
      console.log('Form is invalid:', this.form.errors);
      alert('Please fill in all required fields to complete your order.');
    }
  }
}
