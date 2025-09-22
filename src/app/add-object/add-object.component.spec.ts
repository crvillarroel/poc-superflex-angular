import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AddObjectComponent } from './add-object.component';

describe('AddObjectComponent', () => {
  let component: AddObjectComponent;
  let fixture: ComponentFixture<AddObjectComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);

    await TestBed.configureTestingModule({
      declarations: [AddObjectComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: HttpClient, useValue: httpSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddObjectComponent);
    component = fixture.componentInstance;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with correct structure and validators', () => {
      expect(component.form).toBeDefined();
      expect(component.form.get('name')).toBeDefined();
      expect(component.form.get('year')).toBeDefined();
      expect(component.form.get('price')).toBeDefined();
      expect(component.form.get('cpuModel')).toBeDefined();
      expect(component.form.get('hardDiskSize')).toBeDefined();
    });

    it('should initialize isSubmitting as false', () => {
      expect(component.isSubmitting).toBe(false);
    });

    it('should have all form fields initially empty', () => {
      expect(component.form.get('name')?.value).toBe('');
      expect(component.form.get('year')?.value).toBe('');
      expect(component.form.get('price')?.value).toBe('');
      expect(component.form.get('cpuModel')?.value).toBe('');
      expect(component.form.get('hardDiskSize')?.value).toBe('');
    });

    it('should have form initially invalid', () => {
      expect(component.form.valid).toBe(false);
    });
  });

  describe('Form Validation', () => {
    describe('Name Field', () => {
      it('should be invalid when empty', () => {
        const nameControl = component.form.get('name');
        nameControl?.setValue('');
        nameControl?.markAsTouched();
        expect(nameControl?.invalid).toBe(true);
        expect(nameControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid when less than 2 characters', () => {
        const nameControl = component.form.get('name');
        nameControl?.setValue('A');
        nameControl?.markAsTouched();
        expect(nameControl?.invalid).toBe(true);
        expect(nameControl?.errors?.['minlength']).toBeTruthy();
      });

      it('should be valid when 2 or more characters', () => {
        const nameControl = component.form.get('name');
        nameControl?.setValue('MacBook Pro');
        expect(nameControl?.valid).toBe(true);
      });
    });

    describe('Year Field', () => {
      it('should be invalid when empty', () => {
        const yearControl = component.form.get('year');
        yearControl?.setValue('');
        yearControl?.markAsTouched();
        expect(yearControl?.invalid).toBe(true);
        expect(yearControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid when not 4 digits', () => {
        const yearControl = component.form.get('year');
        yearControl?.setValue('202');
        yearControl?.markAsTouched();
        expect(yearControl?.invalid).toBe(true);
        expect(yearControl?.errors?.['pattern']).toBeTruthy();
      });

      it('should be invalid when less than 1900', () => {
        const yearControl = component.form.get('year');
        yearControl?.setValue('1899');
        yearControl?.markAsTouched();
        expect(yearControl?.invalid).toBe(true);
        expect(yearControl?.errors?.['min']).toBeTruthy();
      });

      it('should be invalid when greater than current year', () => {
        const yearControl = component.form.get('year');
        const nextYear = new Date().getFullYear() + 1;
        yearControl?.setValue(nextYear.toString());
        yearControl?.markAsTouched();
        expect(yearControl?.invalid).toBe(true);
        expect(yearControl?.errors?.['max']).toBeTruthy();
      });

      it('should be valid for current year', () => {
        const yearControl = component.form.get('year');
        const currentYear = new Date().getFullYear();
        yearControl?.setValue(currentYear.toString());
        expect(yearControl?.valid).toBe(true);
      });

      it('should be valid for year 1900', () => {
        const yearControl = component.form.get('year');
        yearControl?.setValue('1900');
        expect(yearControl?.valid).toBe(true);
      });
    });

    describe('Price Field', () => {
      it('should be invalid when empty', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('');
        priceControl?.markAsTouched();
        expect(priceControl?.invalid).toBe(true);
        expect(priceControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid with invalid pattern', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('abc');
        priceControl?.markAsTouched();
        expect(priceControl?.invalid).toBe(true);
        expect(priceControl?.errors?.['pattern']).toBeTruthy();
      });

      it('should be invalid when zero', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('0');
        priceControl?.markAsTouched();
        expect(priceControl?.invalid).toBe(true);
        expect(priceControl?.errors?.['min']).toBeTruthy();
      });

      it('should be valid with integer price', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('1500');
        expect(priceControl?.valid).toBe(true);
      });

      it('should be valid with decimal price (one decimal)', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('1500.5');
        expect(priceControl?.valid).toBe(true);
      });

      it('should be valid with decimal price (two decimals)', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('1500.99');
        expect(priceControl?.valid).toBe(true);
      });

      it('should be valid with minimum valid price', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('0.01');
        expect(priceControl?.valid).toBe(true);
      });
    });

    describe('CPU Model Field', () => {
      it('should be invalid when empty', () => {
        const cpuControl = component.form.get('cpuModel');
        cpuControl?.setValue('');
        cpuControl?.markAsTouched();
        expect(cpuControl?.invalid).toBe(true);
        expect(cpuControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid when less than 2 characters', () => {
        const cpuControl = component.form.get('cpuModel');
        cpuControl?.setValue('i');
        cpuControl?.markAsTouched();
        expect(cpuControl?.invalid).toBe(true);
        expect(cpuControl?.errors?.['minlength']).toBeTruthy();
      });

      it('should be valid when 2 or more characters', () => {
        const cpuControl = component.form.get('cpuModel');
        cpuControl?.setValue('Intel Core i9');
        expect(cpuControl?.valid).toBe(true);
      });
    });

    describe('Hard Disk Size Field', () => {
      it('should be invalid when empty', () => {
        const diskControl = component.form.get('hardDiskSize');
        diskControl?.setValue('');
        diskControl?.markAsTouched();
        expect(diskControl?.invalid).toBe(true);
        expect(diskControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid when less than 2 characters', () => {
        const diskControl = component.form.get('hardDiskSize');
        diskControl?.setValue('1');
        diskControl?.markAsTouched();
        expect(diskControl?.invalid).toBe(true);
        expect(diskControl?.errors?.['minlength']).toBeTruthy();
      });

      it('should be valid when 2 or more characters', () => {
        const diskControl = component.form.get('hardDiskSize');
        diskControl?.setValue('1 TB');
        expect(diskControl?.valid).toBe(true);
      });
    });
  });

  describe('ngOnInit Method', () => {
    it('should execute without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('onSubmit Method', () => {
    beforeEach(() => {
      // Set up valid form data
      component.form.patchValue({
        name: 'MacBook Pro',
        year: '2023',
        price: '1849.99',
        cpuModel: 'Intel Core i9',
        hardDiskSize: '1 TB'
      });
    });

    it('should not submit when form is invalid', () => {
      component.form.get('name')?.setValue('');
      component.onSubmit();
      expect(httpClientSpy.post).not.toHaveBeenCalled();
      expect(component.isSubmitting).toBe(false);
    });

    it('should not submit when already submitting', () => {
      component.isSubmitting = true;
      component.onSubmit();
      expect(httpClientSpy.post).not.toHaveBeenCalled();
    });

    it('should submit when form is valid and not submitting', () => {
      const mockResponse = { id: '123', name: 'MacBook Pro' };
      httpClientSpy.post.and.returnValue(of(mockResponse));

      component.onSubmit();

      expect(component.isSubmitting).toBe(true);
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        'https://api.restful-api.dev/objects',
        {
          name: 'MacBook Pro',
          data: {
            year: 2023,
            price: 1849.99,
            'CPU model': 'Intel Core i9',
            'Hard disk size': '1 TB'
          }
        }
      );
    });

    it('should handle successful HTTP response', () => {
      const mockResponse = { id: '123', name: 'MacBook Pro' };
      httpClientSpy.post.and.returnValue(of(mockResponse));
      const consoleSpy = spyOn(console, 'log');

      component.onSubmit();

      expect(consoleSpy).toHaveBeenCalledWith('Object created successfully:', mockResponse);
      expect(component.isSubmitting).toBe(false);
      expect(component.form.pristine).toBe(true); // Form should be reset
    });

    it('should handle HTTP error response', () => {
      const mockError = { error: 'Server error', status: 500 };
      httpClientSpy.post.and.returnValue(throwError(() => mockError));
      const consoleErrorSpy = spyOn(console, 'error');

      component.onSubmit();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating object:', mockError);
      expect(component.isSubmitting).toBe(false);
    });

    it('should create correct request body with parsed values', () => {
      httpClientSpy.post.and.returnValue(of({}));
      
      component.form.patchValue({
        name: 'Test Device',
        year: '2020',
        price: '999.50',
        cpuModel: 'AMD Ryzen',
        hardDiskSize: '512 GB'
      });

      component.onSubmit();

      const expectedBody = {
        name: 'Test Device',
        data: {
          year: 2020,
          price: 999.50,
          'CPU model': 'AMD Ryzen',
          'Hard disk size': '512 GB'
        }
      };

      expect(httpClientSpy.post).toHaveBeenCalledWith(
        'https://api.restful-api.dev/objects',
        expectedBody
      );
    });
  });

  describe('getFieldError Method', () => {
    describe('Required Errors', () => {
      it('should return required error for name field', () => {
        const nameControl = component.form.get('name');
        nameControl?.setValue('');
        nameControl?.markAsTouched();
        
        const error = component.getFieldError('name');
        expect(error).toBe('Name is required');
      });

      it('should return required error for year field', () => {
        const yearControl = component.form.get('year');
        yearControl?.setValue('');
        yearControl?.markAsTouched();
        
        const error = component.getFieldError('year');
        expect(error).toBe('Year is required');
      });

      it('should return required error for price field', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('');
        priceControl?.markAsTouched();
        
        const error = component.getFieldError('price');
        expect(error).toBe('Price is required');
      });

      it('should return required error for cpuModel field', () => {
        const cpuControl = component.form.get('cpuModel');
        cpuControl?.setValue('');
        cpuControl?.markAsTouched();
        
        const error = component.getFieldError('cpuModel');
        expect(error).toBe('CPU Model is required');
      });

      it('should return required error for hardDiskSize field', () => {
        const diskControl = component.form.get('hardDiskSize');
        diskControl?.setValue('');
        diskControl?.markAsTouched();
        
        const error = component.getFieldError('hardDiskSize');
        expect(error).toBe('Hard Disk Size is required');
      });
    });

    describe('MinLength Errors', () => {
      it('should return minlength error for name field', () => {
        const nameControl = component.form.get('name');
        nameControl?.setValue('A');
        nameControl?.markAsTouched();
        
        const error = component.getFieldError('name');
        expect(error).toBe('Name must be at least 2 characters');
      });

      it('should return minlength error for cpuModel field', () => {
        const cpuControl = component.form.get('cpuModel');
        cpuControl?.setValue('i');
        cpuControl?.markAsTouched();
        
        const error = component.getFieldError('cpuModel');
        expect(error).toBe('CPU Model must be at least 2 characters');
      });

      it('should return minlength error for hardDiskSize field', () => {
        const diskControl = component.form.get('hardDiskSize');
        diskControl?.setValue('1');
        diskControl?.markAsTouched();
        
        const error = component.getFieldError('hardDiskSize');
        expect(error).toBe('Hard Disk Size must be at least 2 characters');
      });
    });

    describe('Pattern Errors', () => {
      it('should return pattern error for year field', () => {
        const yearControl = component.form.get('year');
        yearControl?.setValue('202');
        yearControl?.markAsTouched();
        
        const error = component.getFieldError('year');
        expect(error).toBe('Year must be a 4-digit number');
      });

      it('should return pattern error for price field', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('abc');
        priceControl?.markAsTouched();
        
        const error = component.getFieldError('price');
        expect(error).toBe('Price must be a valid number (e.g., 1849.99)');
      });
    });

    describe('Min Errors', () => {
      it('should return min error for year field', () => {
        const yearControl = component.form.get('year');
        yearControl?.setValue('1899');
        yearControl?.markAsTouched();
        
        const error = component.getFieldError('year');
        expect(error).toBe('Year must be 1900 or later');
      });

      it('should return min error for price field', () => {
        const priceControl = component.form.get('price');
        priceControl?.setValue('0');
        priceControl?.markAsTouched();
        
        const error = component.getFieldError('price');
        expect(error).toBe('Price must be greater than 0');
      });
    });

    describe('Max Errors', () => {
      it('should return max error for year field', () => {
        const yearControl = component.form.get('year');
        const nextYear = new Date().getFullYear() + 1;
        yearControl?.setValue(nextYear.toString());
        yearControl?.markAsTouched();
        
        const error = component.getFieldError('year');
        expect(error).toBe(`Year cannot be later than ${new Date().getFullYear()}`);
      });
    });

    describe('No Errors', () => {
      it('should return empty string when field is valid', () => {
        const nameControl = component.form.get('name');
        nameControl?.setValue('Valid Name');
        
        const error = component.getFieldError('name');
        expect(error).toBe('');
      });

      it('should return empty string when field has errors but not touched', () => {
        const nameControl = component.form.get('name');
        nameControl?.setValue('');
        // Don't mark as touched
        
        const error = component.getFieldError('name');
        expect(error).toBe('');
      });

      it('should return empty string for non-existent field', () => {
        const error = component.getFieldError('nonExistentField');
        expect(error).toBe('');
      });
    });
  });

  describe('getFieldLabel Method', () => {
    it('should return correct label for name field', () => {
      const label = component['getFieldLabel']('name');
      expect(label).toBe('Name');
    });

    it('should return correct label for year field', () => {
      const label = component['getFieldLabel']('year');
      expect(label).toBe('Year');
    });

    it('should return correct label for price field', () => {
      const label = component['getFieldLabel']('price');
      expect(label).toBe('Price');
    });

    it('should return correct label for cpuModel field', () => {
      const label = component['getFieldLabel']('cpuModel');
      expect(label).toBe('CPU Model');
    });

    it('should return correct label for hardDiskSize field', () => {
      const label = component['getFieldLabel']('hardDiskSize');
      expect(label).toBe('Hard Disk Size');
    });

    it('should return field name for unknown field', () => {
      const label = component['getFieldLabel']('unknownField');
      expect(label).toBe('unknownField');
    });

    it('should handle empty string field name', () => {
      const label = component['getFieldLabel']('');
      expect(label).toBe('');
    });
  });

  describe('isFieldInvalid Method', () => {
    it('should return true when field has errors and is touched', () => {
      const nameControl = component.form.get('name');
      nameControl?.setValue('');
      nameControl?.markAsTouched();
      
      const isInvalid = component.isFieldInvalid('name');
      expect(isInvalid).toBe(true);
    });

    it('should return false when field has errors but is not touched', () => {
      const nameControl = component.form.get('name');
      nameControl?.setValue('');
      // Don't mark as touched
      
      const isInvalid = component.isFieldInvalid('name');
      expect(isInvalid).toBe(false);
    });

    it('should return false when field is valid', () => {
      const nameControl = component.form.get('name');
      nameControl?.setValue('Valid Name');
      nameControl?.markAsTouched();
      
      const isInvalid = component.isFieldInvalid('name');
      expect(isInvalid).toBe(false);
    });

    it('should return false for non-existent field', () => {
      const isInvalid = component.isFieldInvalid('nonExistentField');
      expect(isInvalid).toBe(false);
    });

    it('should handle all form fields correctly', () => {
      // Set all fields to invalid state
      Object.keys(component.form.controls).forEach(fieldName => {
        const control = component.form.get(fieldName);
        control?.setValue('');
        control?.markAsTouched();
      });

      expect(component.isFieldInvalid('name')).toBe(true);
      expect(component.isFieldInvalid('year')).toBe(true);
      expect(component.isFieldInvalid('price')).toBe(true);
      expect(component.isFieldInvalid('cpuModel')).toBe(true);
      expect(component.isFieldInvalid('hardDiskSize')).toBe(true);
    });
  });

  describe('Component Properties', () => {
    it('should have correct component selector', () => {
      const componentMetadata = Reflect.getMetadata('annotations', AddObjectComponent)[0];
      expect(componentMetadata.selector).toBe('app-add-object');
    });

    it('should have correct template and style URLs', () => {
      const componentMetadata = Reflect.getMetadata('annotations', AddObjectComponent)[0];
      expect(componentMetadata.templateUrl).toBe('./add-object.component.html');
      expect(componentMetadata.styleUrls).toEqual(['./add-object.component.css']);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete form submission workflow', () => {
      const mockResponse = { id: '123' };
      httpClientSpy.post.and.returnValue(of(mockResponse));

      // Fill form with valid data
      component.form.patchValue({
        name: 'MacBook Pro',
        year: '2023',
        price: '1849.99',
        cpuModel: 'Intel Core i9',
        hardDiskSize: '1 TB'
      });

      expect(component.form.valid).toBe(true);
      expect(component.isSubmitting).toBe(false);

      component.onSubmit();

      expect(httpClientSpy.post).toHaveBeenCalled();
      expect(component.isSubmitting).toBe(false);
      expect(component.form.pristine).toBe(true);
    });

    it('should maintain form state during error scenarios', () => {
      const mockError = new Error('Network error');
      httpClientSpy.post.and.returnValue(throwError(() => mockError));

      component.form.patchValue({
        name: 'MacBook Pro',
        year: '2023',
        price: '1849.99',
        cpuModel: 'Intel Core i9',
        hardDiskSize: '1 TB'
      });

      component.onSubmit();

      expect(component.isSubmitting).toBe(false);
      expect(component.form.get('name')?.value).toBe('MacBook Pro'); // Form should not be reset on error
    });
  });
});
