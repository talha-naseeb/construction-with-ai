export type BookingStatus = 'Pending review' | 'Needs verification' | 'Confirmed' | 'Assigned' | 'Cancelled' | 'Completed';

export type Booking = {
  id: string;
  customer: string;
  phone: string;
  email?: string;
  service: string;
  startAt: string;
  endAt: string;
  timezone: string;
  address: string;
  propertyType?: string;
  notes: string;
  verified: boolean;
  status: BookingStatus;
  technicianId?: string;
  cancellationReason?: string;
  sourceLeadId?: string;
  sourceCallId?: string;
};

export type Technician = {
  id: string;
  name: string;
  initials: string;
  trade: string;
  skills?: string[];
  serviceArea?: string;
  phone: string;
  availability: 'Available' | 'Assigned' | 'Busy';
  currentLoad: string;
};
