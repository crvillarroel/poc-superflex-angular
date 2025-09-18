import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AbsenceRequest {
  startDate: string;
  endDate: string;
  status: 'approved' | 'pending' | 'cancelled';
  hours?: string;
  hasDocument?: boolean;
}

interface AbsenceSection {
  id: string;
  title: string;
  color: string;
  available: string;
  requests: AbsenceRequest[];
  hasHours?: boolean;
  hasJustifications?: boolean;
}

@Component({
  selector: 'app-absence-summary',
  templateUrl: './absence-summary.component.html',
  styleUrls: ['./absence-summary.component.css']
})
export class AbsenceSummaryComponent {
  filterForm: FormGroup;
  
  absenceSections: AbsenceSection[] = [
    {
      id: 'vacations',
      title: 'Vacaciones',
      color: '#22c55e',
      available: '10 de 20 días disponibles',
      requests: [
        { startDate: '01/01/2023', endDate: '05/01/2023', status: 'approved' },
        { startDate: '04/04/2023', endDate: '06/04/2023', status: 'pending' }
      ]
    },
    {
      id: 'bridges',
      title: 'Puentes',
      color: '#ef4444',
      available: '0 de 1 día disponible',
      requests: [
        { startDate: '01/05/2023', endDate: '03/05/2023', status: 'approved' }
      ]
    },
    {
      id: 'free-hours',
      title: 'Horas de libre disposición',
      color: '#f97316',
      available: '16 de 24 horas disponibles',
      hasHours: true,
      hasJustifications: true,
      requests: [
        { startDate: '02/03/2023', endDate: '', status: 'approved', hours: '3h', hasDocument: true },
        { startDate: '01/05/2023', endDate: '', status: 'pending', hours: '1h', hasDocument: true }
      ]
    },
    {
      id: 'paid-leave',
      title: 'Permisos Retribuidos',
      color: '#8b5cf6',
      available: 'Sin Límite',
      hasHours: true,
      hasJustifications: true,
      requests: [
        { startDate: '02/03/2023', endDate: '', status: 'approved', hours: '3h' }
      ]
    },
    {
      id: 'medical-leave',
      title: 'Baja médica',
      color: '#8b5cf6',
      available: 'Sin Límite',
      requests: []
    },
    {
      id: 'maternity-leave',
      title: 'Baja de maternidad / paternidad',
      color: '#6b7280',
      available: '',
      requests: []
    }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      absenceType: ['']
    });
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  onApprove(sectionId: string, requestIndex: number): void {
    // Handle approve action
    console.log('Approve request', sectionId, requestIndex);
  }

  onCancel(sectionId: string, requestIndex: number): void {
    // Handle cancel action
    console.log('Cancel request', sectionId, requestIndex);
  }

  viewDocument(sectionId: string, requestIndex: number): void {
    // Handle view document action
    console.log('View document', sectionId, requestIndex);
  }
}
