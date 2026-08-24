export type BookingStatus = 'Needs assignment' | 'Assigned';

export type Booking = {
  id: string;
  customer: string;
  phone: string;
  service: string;
  date: string;
  address: string;
  notes: string;
  verified: boolean;
  technicianId?: string;
};

export type Technician = {
  id: string;
  name: string;
  initials: string;
  trade: string;
  phone: string;
  availability: 'Available' | 'Assigned' | 'Busy';
  currentLoad: string;
};
