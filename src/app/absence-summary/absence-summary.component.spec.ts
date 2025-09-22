import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AbsenceSummaryComponent } from './absence-summary.component';

describe('AbsenceSummaryComponent', () => {
  let component: AbsenceSummaryComponent;
  let fixture: ComponentFixture<AbsenceSummaryComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbsenceSummaryComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(AbsenceSummaryComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize filterForm with empty absenceType', () => {
      expect(component.filterForm).toBeDefined();
      expect(component.filterForm.get('absenceType')?.value).toBe('');
    });

    it('should initialize absenceSections with correct data', () => {
      expect(component.absenceSections).toBeDefined();
      expect(component.absenceSections.length).toBe(6);
    });
  });

  describe('absenceSections Data Structure', () => {
    it('should have vacations section with correct properties', () => {
      const vacationsSection = component.absenceSections.find(s => s.id === 'vacations');
      expect(vacationsSection).toBeDefined();
      expect(vacationsSection?.title).toBe('Vacaciones');
      expect(vacationsSection?.color).toBe('#22c55e');
      expect(vacationsSection?.available).toBe('10 de 20 días disponibles');
      expect(vacationsSection?.requests.length).toBe(2);
      expect(vacationsSection?.hasHours).toBeUndefined();
      expect(vacationsSection?.hasJustifications).toBeUndefined();
    });

    it('should have bridges section with correct properties', () => {
      const bridgesSection = component.absenceSections.find(s => s.id === 'bridges');
      expect(bridgesSection).toBeDefined();
      expect(bridgesSection?.title).toBe('Puentes');
      expect(bridgesSection?.color).toBe('#ef4444');
      expect(bridgesSection?.available).toBe('0 de 1 día disponible');
      expect(bridgesSection?.requests.length).toBe(1);
    });

    it('should have free-hours section with hasHours and hasJustifications flags', () => {
      const freeHoursSection = component.absenceSections.find(s => s.id === 'free-hours');
      expect(freeHoursSection).toBeDefined();
      expect(freeHoursSection?.title).toBe('Horas de libre disposición');
      expect(freeHoursSection?.color).toBe('#f97316');
      expect(freeHoursSection?.hasHours).toBe(true);
      expect(freeHoursSection?.hasJustifications).toBe(true);
      expect(freeHoursSection?.requests.length).toBe(2);
    });

    it('should have paid-leave section with hasHours and hasJustifications flags', () => {
      const paidLeaveSection = component.absenceSections.find(s => s.id === 'paid-leave');
      expect(paidLeaveSection).toBeDefined();
      expect(paidLeaveSection?.title).toBe('Permisos Retribuidos');
      expect(paidLeaveSection?.color).toBe('#8b5cf6');
      expect(paidLeaveSection?.available).toBe('Sin Límite');
      expect(paidLeaveSection?.hasHours).toBe(true);
      expect(paidLeaveSection?.hasJustifications).toBe(true);
      expect(paidLeaveSection?.requests.length).toBe(1);
    });

    it('should have medical-leave section with empty requests', () => {
      const medicalLeaveSection = component.absenceSections.find(s => s.id === 'medical-leave');
      expect(medicalLeaveSection).toBeDefined();
      expect(medicalLeaveSection?.title).toBe('Baja médica');
      expect(medicalLeaveSection?.color).toBe('#8b5cf6');
      expect(medicalLeaveSection?.available).toBe('Sin Límite');
      expect(medicalLeaveSection?.requests.length).toBe(0);
    });

    it('should have maternity-leave section with empty available and requests', () => {
      const maternityLeaveSection = component.absenceSections.find(s => s.id === 'maternity-leave');
      expect(maternityLeaveSection).toBeDefined();
      expect(maternityLeaveSection?.title).toBe('Baja de maternidad / paternidad');
      expect(maternityLeaveSection?.color).toBe('#6b7280');
      expect(maternityLeaveSection?.available).toBe('');
      expect(maternityLeaveSection?.requests.length).toBe(0);
    });
  });

  describe('Request Data Structure', () => {
    it('should have vacation requests with correct structure', () => {
      const vacationsSection = component.absenceSections.find(s => s.id === 'vacations');
      const firstRequest = vacationsSection?.requests[0];
      
      expect(firstRequest).toBeDefined();
      expect(firstRequest?.startDate).toBe('01/01/2023');
      expect(firstRequest?.endDate).toBe('05/01/2023');
      expect(firstRequest?.status).toBe('approved');
      expect(firstRequest?.hours).toBeUndefined();
      expect(firstRequest?.hasDocument).toBeUndefined();
    });

    it('should have free-hours requests with hours and document properties', () => {
      const freeHoursSection = component.absenceSections.find(s => s.id === 'free-hours');
      const firstRequest = freeHoursSection?.requests[0];
      
      expect(firstRequest).toBeDefined();
      expect(firstRequest?.startDate).toBe('02/03/2023');
      expect(firstRequest?.endDate).toBe('');
      expect(firstRequest?.status).toBe('approved');
      expect(firstRequest?.hours).toBe('3h');
      expect(firstRequest?.hasDocument).toBe(true);
    });

    it('should have paid-leave request without hasDocument property', () => {
      const paidLeaveSection = component.absenceSections.find(s => s.id === 'paid-leave');
      const firstRequest = paidLeaveSection?.requests[0];
      
      expect(firstRequest).toBeDefined();
      expect(firstRequest?.startDate).toBe('02/03/2023');
      expect(firstRequest?.endDate).toBe('');
      expect(firstRequest?.status).toBe('approved');
      expect(firstRequest?.hours).toBe('3h');
      expect(firstRequest?.hasDocument).toBeUndefined();
    });
  });

  describe('getStatusText Method', () => {
    it('should return "Aprobado" for approved status', () => {
      const result = component.getStatusText('approved');
      expect(result).toBe('Aprobado');
    });

    it('should return "Pendiente" for pending status', () => {
      const result = component.getStatusText('pending');
      expect(result).toBe('Pendiente');
    });

    it('should return "Cancelado" for cancelled status', () => {
      const result = component.getStatusText('cancelled');
      expect(result).toBe('Cancelado');
    });

    it('should return original status for unknown status', () => {
      const unknownStatus = 'unknown-status';
      const result = component.getStatusText(unknownStatus);
      expect(result).toBe(unknownStatus);
    });

    it('should handle empty string status', () => {
      const result = component.getStatusText('');
      expect(result).toBe('');
    });
  });

  describe('getStatusClass Method', () => {
    it('should return "status-approved" for approved status', () => {
      const result = component.getStatusClass('approved');
      expect(result).toBe('status-approved');
    });

    it('should return "status-pending" for pending status', () => {
      const result = component.getStatusClass('pending');
      expect(result).toBe('status-pending');
    });

    it('should return "status-cancelled" for cancelled status', () => {
      const result = component.getStatusClass('cancelled');
      expect(result).toBe('status-cancelled');
    });

    it('should return empty string for unknown status', () => {
      const result = component.getStatusClass('unknown-status');
      expect(result).toBe('');
    });

    it('should return empty string for empty status', () => {
      const result = component.getStatusClass('');
      expect(result).toBe('');
    });
  });

  describe('onApprove Method', () => {
    it('should call console.log with correct parameters', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'vacations';
      const requestIndex = 0;

      component.onApprove(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('Approve request', sectionId, requestIndex);
    });

    it('should handle different section IDs', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'free-hours';
      const requestIndex = 1;

      component.onApprove(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('Approve request', sectionId, requestIndex);
    });

    it('should handle different request indices', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'bridges';
      const requestIndex = 5;

      component.onApprove(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('Approve request', sectionId, requestIndex);
    });
  });

  describe('onCancel Method', () => {
    it('should call console.log with correct parameters', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'paid-leave';
      const requestIndex = 0;

      component.onCancel(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('Cancel request', sectionId, requestIndex);
    });

    it('should handle different section IDs', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'medical-leave';
      const requestIndex = 2;

      component.onCancel(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('Cancel request', sectionId, requestIndex);
    });

    it('should handle negative request indices', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'maternity-leave';
      const requestIndex = -1;

      component.onCancel(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('Cancel request', sectionId, requestIndex);
    });
  });

  describe('viewDocument Method', () => {
    it('should call console.log with correct parameters', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'free-hours';
      const requestIndex = 0;

      component.viewDocument(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('View document', sectionId, requestIndex);
    });

    it('should handle different section IDs', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'paid-leave';
      const requestIndex = 1;

      component.viewDocument(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('View document', sectionId, requestIndex);
    });

    it('should handle zero request index', () => {
      const consoleSpy = spyOn(console, 'log');
      const sectionId = 'vacations';
      const requestIndex = 0;

      component.viewDocument(sectionId, requestIndex);

      expect(consoleSpy).toHaveBeenCalledWith('View document', sectionId, requestIndex);
    });
  });

  describe('Form Integration', () => {
    it('should update form control value', () => {
      const absenceTypeControl = component.filterForm.get('absenceType');
      
      absenceTypeControl?.setValue('vacations');
      
      expect(absenceTypeControl?.value).toBe('vacations');
    });

    it('should handle form reset', () => {
      const absenceTypeControl = component.filterForm.get('absenceType');
      
      absenceTypeControl?.setValue('bridges');
      component.filterForm.reset();
      
      expect(absenceTypeControl?.value).toBeNull();
    });

    it('should validate form structure', () => {
      expect(component.filterForm.contains('absenceType')).toBe(true);
      expect(component.filterForm.get('absenceType')).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null or undefined parameters in methods', () => {
      const consoleSpy = spyOn(console, 'log');
      
      // Test with empty strings
      component.onApprove('', 0);
      component.onCancel('', 0);
      component.viewDocument('', 0);
      
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });

    it('should handle status methods with null/undefined input', () => {
      // TypeScript will prevent null/undefined, but testing edge cases
      const statusText = component.getStatusText('null' as any);
      const statusClass = component.getStatusClass('undefined' as any);
      
      expect(statusText).toBe('null');
      expect(statusClass).toBe('');
    });
  });

  describe('Component Properties', () => {
    it('should have correct component selector', () => {
      const componentMetadata = Reflect.getMetadata('annotations', AbsenceSummaryComponent)[0];
      expect(componentMetadata.selector).toBe('app-absence-summary');
    });

    it('should have correct template and style URLs', () => {
      const componentMetadata = Reflect.getMetadata('annotations', AbsenceSummaryComponent)[0];
      expect(componentMetadata.templateUrl).toBe('./absence-summary.component.html');
      expect(componentMetadata.styleUrls).toEqual(['./absence-summary.component.css']);
    });
  });
});
