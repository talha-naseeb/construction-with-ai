import type { Booking, Technician } from './types';

export const technicians: Technician[] = [
  { id: 'tech-1', name: 'Darnell Williams', initials: 'DW', trade: 'Lead carpenter', phone: '(512) 555-0148', availability: 'Available', currentLoad: '0 jobs today' },
  { id: 'tech-2', name: 'Samantha Lee', initials: 'SL', trade: 'Project technician', phone: '(512) 555-0126', availability: 'Assigned', currentLoad: '1 job today' },
  { id: 'tech-3', name: 'Miguel Hernandez', initials: 'MH', trade: 'Electrician', phone: '(512) 555-0162', availability: 'Busy', currentLoad: '2 jobs today' },
  { id: 'tech-4', name: 'Brandon Taylor', initials: 'BT', trade: 'Plumber', phone: '(512) 555-0183', availability: 'Assigned', currentLoad: '1 job today' }
];

export const initialBookings: Booking[] = [
  { id: 'bkg-1001', customer: 'Alex Johnson', phone: '(512) 555-0198', service: 'Kitchen Remodel Estimate', date: 'Today · 10:00 AM', address: '123 Maple Dr, Austin, TX', notes: 'Interested in cabinet layout and a new countertop estimate.', verified: true },
  { id: 'bkg-1002', customer: 'Maria Garcia', phone: '(713) 555-0142', service: 'Deck Repair Consultation', date: 'Today · 1:30 PM', address: '456 Oak St, Pflugerville, TX', notes: 'Deck boards are loose near the rear steps.', verified: true, technicianId: 'tech-2' },
  { id: 'bkg-1003', customer: 'James Wilson', phone: '(832) 555-0113', service: 'Bathroom Renovation', date: 'Tomorrow · 9:00 AM', address: '789 Cedar Ln, Round Rock, TX', notes: 'Needs a walkthrough before an estimate is prepared.', verified: false },
  { id: 'bkg-1004', customer: 'Sarah Thompson', phone: '(214) 555-0177', service: 'Roof Inspection', date: 'Tomorrow · 2:00 PM', address: '321 Pine Ave, Leander, TX', notes: 'Customer reported a leak after recent rain.', verified: true, technicianId: 'tech-4' }
];
