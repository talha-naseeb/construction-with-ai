export type BookingStatus = 'Pending review' | 'Needs verification' | 'Confirmed' | 'Assigned' | 'Cancelled' | 'Completed';

export type Booking = {
  id: string;
  customer: string;
  phone: string;
  service: string;
  startAt: string;
  endAt: string;
  timezone: string;
  address: string;
  notes: string;
  verified: boolean;
  status: BookingStatus;
  technicianId?: string;
  cancellationReason?: string;
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
