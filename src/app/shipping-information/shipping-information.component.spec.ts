import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ShippingInformationComponent } from './shipping-information.component';

describe('ShippingInformationComponent', () => {
  let component: ShippingInformationComponent;
  let fixture: ComponentFixture<ShippingInformationComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingInformationComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingInformationComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with correct structure and validators', () => {
      expect(component.form).toBeDefined();
      expect(component.form.get('ageVerification')).toBeDefined();
      expect(component.form.get('fullName')).toBeDefined();
      expect(component.form.get('email')).toBeDefined();
      expect(component.form.get('phone')).toBeDefined();
      expect(component.form.get('address')).toBeDefined();
      expect(component.form.get('city')).toBeDefined();
      expect(component.form.get('postalCode')).toBeDefined();
      expect(component.form.get('location')).toBeDefined();
      expect(component.form.get('deliveryNote')).toBeDefined();
      expect(component.form.get('acceptTerms')).toBeDefined();
    });

    it('should have form initially invalid', () => {
      expect(component.form.valid).toBe(false);
    });

    it('should initialize relatedProducts array', () => {
      expect(component.relatedProducts).toBeDefined();
      expect(component.relatedProducts.length).toBe(3);
    });
  });

  describe('Form Initial Values', () => {
    it('should have ageVerification initially false', () => {
      expect(component.form.get('ageVerification')?.value).toBe(false);
    });

    it('should have fullName initially empty', () => {
      expect(component.form.get('fullName')?.value).toBe('');
    });

    it('should have email initially empty', () => {
      expect(component.form.get('email')?.value).toBe('');
    });

    it('should have phone initially empty', () => {
      expect(component.form.get('phone')?.value).toBe('');
    });

    it('should have address initially empty', () => {
      expect(component.form.get('address')?.value).toBe('');
    });

    it('should have city initially empty', () => {
      expect(component.form.get('city')?.value).toBe('');
    });

    it('should have postalCode initially empty', () => {
      expect(component.form.get('postalCode')?.value).toBe('');
    });

    it('should have location initially empty', () => {
      expect(component.form.get('location')?.value).toBe('');
    });

    it('should have deliveryNote initially empty', () => {
      expect(component.form.get('deliveryNote')?.value).toBe('');
    });

    it('should have acceptTerms initially false', () => {
      expect(component.form.get('acceptTerms')?.value).toBe(false);
    });
  });

  describe('Related Products Data Structure', () => {
    it('should have Express Shipping product with correct properties', () => {
      const expressShipping = component.relatedProducts.find(p => p.id === 1);
      expect(expressShipping).toBeDefined();
      expect(expressShipping?.name).toBe('Express Shipping');
      expect(expressShipping?.price).toBe(15.99);
      expect(expressShipping?.image).toBe('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop');
    });

    it('should have Gift Wrapping product with correct properties', () => {
      const giftWrapping = component.relatedProducts.find(p => p.id === 2);
      expect(giftWrapping).toBeDefined();
      expect(giftWrapping?.name).toBe('Gift Wrapping');
      expect(giftWrapping?.price).toBe(8.99);
      expect(giftWrapping?.image).toBe('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100&h=100&fit=crop');
    });

    it('should have Insurance Coverage product with correct properties', () => {
      const insurance = component.relatedProducts.find(p => p.id === 3);
      expect(insurance).toBeDefined();
      expect(insurance?.name).toBe('Insurance Coverage');
      expect(insurance?.price).toBe(12.50);
      expect(insurance?.image).toBe('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=100&fit=crop');
    });

    it('should have all products with unique IDs', () => {
      const ids = component.relatedProducts.map(p => p.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have all products with required properties', () => {
      component.relatedProducts.forEach(product => {
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.image).toBeDefined();
        expect(typeof product.id).toBe('number');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.image).toBe('string');
      });
    });
  });

  describe('Form Validation', () => {
    describe('Age Verification Field', () => {
      it('should be invalid when false', () => {
        const ageControl = component.form.get('ageVerification');
        ageControl?.setValue(false);
        expect(ageControl?.invalid).toBe(true);
        expect(ageControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid when true', () => {
        const ageControl = component.form.get('ageVerification');
        ageControl?.setValue(true);
        expect(ageControl?.valid).toBe(true);
      });
    });

    describe('Full Name Field', () => {
      it('should be invalid when empty', () => {
        const nameControl = component.form.get('fullName');
        nameControl?.setValue('');
        expect(nameControl?.invalid).toBe(true);
        expect(nameControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid with any non-empty string', () => {
        const nameControl = component.form.get('fullName');
        nameControl?.setValue('John Doe');
        expect(nameControl?.valid).toBe(true);
      });

      it('should be valid with single character', () => {
        const nameControl = component.form.get('fullName');
        nameControl?.setValue('A');
        expect(nameControl?.valid).toBe(true);
      });
    });

    describe('Email Field', () => {
      it('should be invalid when empty', () => {
        const emailControl = component.form.get('email');
        emailControl?.setValue('');
        expect(emailControl?.invalid).toBe(true);
        expect(emailControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid with invalid email format', () => {
        const emailControl = component.form.get('email');
        emailControl?.setValue('invalid-email');
        expect(emailControl?.invalid).toBe(true);
        expect(emailControl?.errors?.['email']).toBeTruthy();
      });

      it('should be invalid with email missing @', () => {
        const emailControl = component.form.get('email');
        emailControl?.setValue('testgmail.com');
        expect(emailControl?.invalid).toBe(true);
        expect(emailControl?.errors?.['email']).toBeTruthy();
      });

      it('should be invalid with email missing domain', () => {
        const emailControl = component.form.get('email');
        emailControl?.setValue('test@');
        expect(emailControl?.invalid).toBe(true);
        expect(emailControl?.errors?.['email']).toBeTruthy();
      });

      it('should be valid with correct email format', () => {
        const emailControl = component.form.get('email');
        emailControl?.setValue('test@example.com');
        expect(emailControl?.valid).toBe(true);
      });

      it('should be valid with complex email format', () => {
        const emailControl = component.form.get('email');
        emailControl?.setValue('user.name+tag@example.co.uk');
        expect(emailControl?.valid).toBe(true);
      });
    });

    describe('Phone Field', () => {
      it('should be invalid when empty', () => {
        const phoneControl = component.form.get('phone');
        phoneControl?.setValue('');
        expect(phoneControl?.invalid).toBe(true);
        expect(phoneControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid with any non-empty string', () => {
        const phoneControl = component.form.get('phone');
        phoneControl?.setValue('+1234567890');
        expect(phoneControl?.valid).toBe(true);
      });

      it('should be valid with different phone formats', () => {
        const phoneControl = component.form.get('phone');
        
        phoneControl?.setValue('123-456-7890');
        expect(phoneControl?.valid).toBe(true);
        
        phoneControl?.setValue('(123) 456-7890');
        expect(phoneControl?.valid).toBe(true);
        
        phoneControl?.setValue('1234567890');
        expect(phoneControl?.valid).toBe(true);
      });
    });

    describe('Address Field', () => {
      it('should be invalid when empty', () => {
        const addressControl = component.form.get('address');
        addressControl?.setValue('');
        expect(addressControl?.invalid).toBe(true);
        expect(addressControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid with any non-empty string', () => {
        const addressControl = component.form.get('address');
        addressControl?.setValue('123 Main St');
        expect(addressControl?.valid).toBe(true);
      });
    });

    describe('City Field', () => {
      it('should be invalid when empty', () => {
        const cityControl = component.form.get('city');
        cityControl?.setValue('');
        expect(cityControl?.invalid).toBe(true);
        expect(cityControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid with any non-empty string', () => {
        const cityControl = component.form.get('city');
        cityControl?.setValue('New York');
        expect(cityControl?.valid).toBe(true);
      });
    });

    describe('Postal Code Field', () => {
      it('should be invalid when empty', () => {
        const postalControl = component.form.get('postalCode');
        postalControl?.setValue('');
        expect(postalControl?.invalid).toBe(true);
        expect(postalControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid with any non-empty string', () => {
        const postalControl = component.form.get('postalCode');
        postalControl?.setValue('12345');
        expect(postalControl?.valid).toBe(true);
      });

      it('should be valid with different postal code formats', () => {
        const postalControl = component.form.get('postalCode');
        
        postalControl?.setValue('12345-6789');
        expect(postalControl?.valid).toBe(true);
        
        postalControl?.setValue('A1B 2C3');
        expect(postalControl?.valid).toBe(true);
      });
    });

    describe('Location Field', () => {
      it('should be invalid when empty', () => {
        const locationControl = component.form.get('location');
        locationControl?.setValue('');
        expect(locationControl?.invalid).toBe(true);
        expect(locationControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid with any non-empty string', () => {
        const locationControl = component.form.get('location');
        locationControl?.setValue('USA');
        expect(locationControl?.valid).toBe(true);
      });
    });

    describe('Delivery Note Field', () => {
      it('should be valid when empty (no validators)', () => {
        const noteControl = component.form.get('deliveryNote');
        noteControl?.setValue('');
        expect(noteControl?.valid).toBe(true);
      });

      it('should be valid with any string', () => {
        const noteControl = component.form.get('deliveryNote');
        noteControl?.setValue('Please leave at front door');
        expect(noteControl?.valid).toBe(true);
      });
    });

    describe('Accept Terms Field', () => {
      it('should be invalid when false', () => {
        const termsControl = component.form.get('acceptTerms');
        termsControl?.setValue(false);
        expect(termsControl?.invalid).toBe(true);
        expect(termsControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid when true', () => {
        const termsControl = component.form.get('acceptTerms');
        termsControl?.setValue(true);
        expect(termsControl?.valid).toBe(true);
      });
    });
  });

  describe('Form Validation Integration', () => {
    it('should be invalid when all required fields are empty', () => {
      expect(component.form.valid).toBe(false);
    });

    it('should be valid when all required fields are filled correctly', () => {
      component.form.patchValue({
        ageVerification: true,
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        city: 'New York',
        postalCode: '12345',
        location: 'USA',
        deliveryNote: 'Optional note',
        acceptTerms: true
      });

      expect(component.form.valid).toBe(true);
    });

    it('should be invalid if any required field is missing', () => {
      component.form.patchValue({
        ageVerification: true,
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        city: 'New York',
        postalCode: '12345',
        location: 'USA',
        acceptTerms: true
        // Missing deliveryNote is OK since it's optional
      });

      expect(component.form.valid).toBe(true);

      // Now remove a required field
      component.form.get('fullName')?.setValue('');
      expect(component.form.valid).toBe(false);
    });
  });

  describe('addProduct Method', () => {
    let consoleSpy: jasmine.Spy;
    let alertSpy: jasmine.Spy;

    beforeEach(() => {
      consoleSpy = spyOn(console, 'log');
      alertSpy = spyOn(window, 'alert');
    });

    it('should log product information to console', () => {
      const product = component.relatedProducts[0];
      component.addProduct(product);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', product);
    });

    it('should show alert with product name and price', () => {
      const product = component.relatedProducts[0];
      component.addProduct(product);

      expect(alertSpy).toHaveBeenCalledWith(`${product.name} added to your order for $${product.price}`);
    });

    it('should handle Express Shipping product', () => {
      const expressShipping = component.relatedProducts.find(p => p.name === 'Express Shipping')!;
      component.addProduct(expressShipping);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', expressShipping);
      expect(alertSpy).toHaveBeenCalledWith('Express Shipping added to your order for $15.99');
    });

    it('should handle Gift Wrapping product', () => {
      const giftWrapping = component.relatedProducts.find(p => p.name === 'Gift Wrapping')!;
      component.addProduct(giftWrapping);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', giftWrapping);
      expect(alertSpy).toHaveBeenCalledWith('Gift Wrapping added to your order for $8.99');
    });

    it('should handle Insurance Coverage product', () => {
      const insurance = component.relatedProducts.find(p => p.name === 'Insurance Coverage')!;
      component.addProduct(insurance);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', insurance);
      expect(alertSpy).toHaveBeenCalledWith('Insurance Coverage added to your order for $12.5');
    });

    it('should handle custom product object', () => {
      const customProduct = {
        id: 999,
        name: 'Custom Product',
        price: 99.99,
        image: 'custom-image.jpg'
      };

      component.addProduct(customProduct);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', customProduct);
      expect(alertSpy).toHaveBeenCalledWith('Custom Product added to your order for $99.99');
    });

    it('should handle product with zero price', () => {
      const freeProduct = {
        id: 100,
        name: 'Free Sample',
        price: 0,
        image: 'sample.jpg'
      };

      component.addProduct(freeProduct);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', freeProduct);
      expect(alertSpy).toHaveBeenCalledWith('Free Sample added to your order for $0');
    });

    it('should handle product with decimal price', () => {
      const decimalProduct = {
        id: 101,
        name: 'Decimal Product',
        price: 19.95,
        image: 'decimal.jpg'
      };

      component.addProduct(decimalProduct);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', decimalProduct);
      expect(alertSpy).toHaveBeenCalledWith('Decimal Product added to your order for $19.95');
    });
  });

  describe('onSubmit Method', () => {
    let consoleSpy: jasmine.Spy;
    let alertSpy: jasmine.Spy;

    beforeEach(() => {
      consoleSpy = spyOn(console, 'log');
      alertSpy = spyOn(window, 'alert');
    });

    describe('Valid Form Submission', () => {
      beforeEach(() => {
        // Set up valid form
        component.form.patchValue({
          ageVerification: true,
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St',
          city: 'New York',
          postalCode: '12345',
          location: 'USA',
          deliveryNote: 'Leave at door',
          acceptTerms: true
        });
      });

      it('should log order completion when form is valid', () => {
        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalledWith('Order completed:', component.form.value);
      });

      it('should show success alert when form is valid', () => {
        component.onSubmit();

        expect(alertSpy).toHaveBeenCalledWith('Order completed successfully! You will receive a confirmation email shortly.');
      });

      it('should handle valid form with empty delivery note', () => {
        component.form.get('deliveryNote')?.setValue('');
        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalledWith('Order completed:', component.form.value);
        expect(alertSpy).toHaveBeenCalledWith('Order completed successfully! You will receive a confirmation email shortly.');
      });
    });

    describe('Invalid Form Submission', () => {
      it('should log form errors when form is invalid', () => {
        // Form is invalid by default
        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalledWith('Form is invalid:', component.form.errors);
      });

      it('should show error alert when form is invalid', () => {
        component.onSubmit();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields to complete your order.');
      });

      it('should handle form with missing required fields', () => {
        component.form.patchValue({
          ageVerification: true,
          fullName: 'John Doe',
          // Missing other required fields
          acceptTerms: true
        });

        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalledWith('Form is invalid:', component.form.errors);
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields to complete your order.');
      });

      it('should handle form with invalid email', () => {
        component.form.patchValue({
          ageVerification: true,
          fullName: 'John Doe',
          email: 'invalid-email',
          phone: '1234567890',
          address: '123 Main St',
          city: 'New York',
          postalCode: '12345',
          location: 'USA',
          acceptTerms: true
        });

        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalledWith('Form is invalid:', component.form.errors);
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields to complete your order.');
      });

      it('should handle form with false age verification', () => {
        component.form.patchValue({
          ageVerification: false, // Invalid
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St',
          city: 'New York',
          postalCode: '12345',
          location: 'USA',
          acceptTerms: true
        });

        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalledWith('Form is invalid:', component.form.errors);
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields to complete your order.');
      });

      it('should handle form with false accept terms', () => {
        component.form.patchValue({
          ageVerification: true,
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St',
          city: 'New York',
          postalCode: '12345',
          location: 'USA',
          acceptTerms: false // Invalid
        });

        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalledWith('Form is invalid:', component.form.errors);
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields to complete your order.');
      });
    });
  });

  describe('Component Properties', () => {
    it('should have correct component selector', () => {
      const componentMetadata = Reflect.getMetadata('annotations', ShippingInformationComponent)[0];
      expect(componentMetadata.selector).toBe('app-shipping-information');
    });

    it('should have correct template and style URLs', () => {
      const componentMetadata = Reflect.getMetadata('annotations', ShippingInformationComponent)[0];
      expect(componentMetadata.templateUrl).toBe('./shipping-information.component.html');
      expect(componentMetadata.styleUrls).toEqual(['./shipping-information.component.css']);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete workflow from product addition to form submission', () => {
      const consoleSpy = spyOn(console, 'log');
      const alertSpy = spyOn(window, 'alert');

      // Add a product
      const product = component.relatedProducts[0];
      component.addProduct(product);

      // Fill and submit form
      component.form.patchValue({
        ageVerification: true,
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        city: 'New York',
        postalCode: '12345',
        location: 'USA',
        deliveryNote: 'Test note',
        acceptTerms: true
      });

      component.onSubmit();

      expect(consoleSpy).toHaveBeenCalledTimes(2); // Once for addProduct, once for onSubmit
      expect(alertSpy).toHaveBeenCalledTimes(2); // Once for addProduct, once for onSubmit
    });

    it('should maintain form state after adding products', () => {
      component.form.get('fullName')?.setValue('Test User');
      
      const product = component.relatedProducts[1];
      component.addProduct(product);

      expect(component.form.get('fullName')?.value).toBe('Test User');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null product in addProduct method', () => {
      const consoleSpy = spyOn(console, 'log');
      const alertSpy = spyOn(window, 'alert');

      component.addProduct(null);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', null);
      expect(alertSpy).toHaveBeenCalledWith('null added to your order for $undefined');
    });

    it('should handle undefined product in addProduct method', () => {
      const consoleSpy = spyOn(console, 'log');
      const alertSpy = spyOn(window, 'alert');

      component.addProduct(undefined);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', undefined);
      expect(alertSpy).toHaveBeenCalledWith('undefined added to your order for $undefined');
    });

    it('should handle product without name or price properties', () => {
      const consoleSpy = spyOn(console, 'log');
      const alertSpy = spyOn(window, 'alert');

      const incompleteProduct = { id: 999 };
      component.addProduct(incompleteProduct);

      expect(consoleSpy).toHaveBeenCalledWith('Adding product to order:', incompleteProduct);
      expect(alertSpy).toHaveBeenCalledWith('undefined added to your order for $undefined');
    });
  });
});
