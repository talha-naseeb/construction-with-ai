import type { Booking, Technician } from './types';

export const technicianFixtures: Technician[] = [
  { id: 'tech-1', name: 'Darnell Williams', initials: 'DW', trade: 'Lead carpenter', phone: '(512) 555-0148', availability: 'Available', currentLoad: '0 jobs today', skills: ['Carpentry', 'Renovation'], serviceArea: 'Austin metro' },
  { id: 'tech-2', name: 'Samantha Lee', initials: 'SL', trade: 'Project technician', phone: '(512) 555-0126', availability: 'Assigned', currentLoad: '1 job today', skills: ['Deck repair', 'Site visits'], serviceArea: 'Austin · Pflugerville' },
  { id: 'tech-3', name: 'Miguel Hernandez', initials: 'MH', trade: 'Electrician', phone: '(512) 555-0162', availability: 'Busy', currentLoad: '2 jobs today', skills: ['Electrical', 'HVAC'], serviceArea: 'Austin metro' },
  { id: 'tech-4', name: 'Brandon Taylor', initials: 'BT', trade: 'Plumber', phone: '(512) 555-0183', availability: 'Assigned', currentLoad: '1 job today', skills: ['Plumbing', 'Waterproofing'], serviceArea: 'Leander · Austin' }
];

export const bookingFixtures: Booking[] = [
  { id: 'bkg-1001', customer: 'Alex Johnson', phone: '(512) 555-0198', service: 'Kitchen Remodel Estimate', startAt: '2026-08-24T10:00:00-05:00', endAt: '2026-08-24T11:00:00-05:00', timezone: 'America/Chicago', address: '123 Maple Dr, Austin, TX', notes: 'Interested in cabinet layout and a new countertop estimate.', verified: true, status: 'Pending review' },
  { id: 'bkg-1002', customer: 'Maria Garcia', phone: '(713) 555-0142', service: 'Deck Repair Consultation', startAt: '2026-08-24T13:30:00-05:00', endAt: '2026-08-24T14:30:00-05:00', timezone: 'America/Chicago', address: '456 Oak St, Pflugerville, TX', notes: 'Deck boards are loose near the rear steps.', verified: true, technicianId: 'tech-2', status: 'Assigned' },
  { id: 'bkg-1003', customer: 'James Wilson', phone: '(832) 555-0113', service: 'Bathroom Renovation', startAt: '2026-08-25T09:00:00-05:00', endAt: '2026-08-25T10:00:00-05:00', timezone: 'America/Chicago', address: '789 Cedar Ln, Round Rock, TX', notes: 'Needs a walkthrough before an estimate is prepared.', verified: false, status: 'Needs verification' },
  { id: 'bkg-1004', customer: 'Sarah Thompson', phone: '(214) 555-0177', service: 'Roof Inspection', startAt: '2026-08-25T14:00:00-05:00', endAt: '2026-08-25T15:00:00-05:00', timezone: 'America/Chicago', address: '321 Pine Ave, Leander, TX', notes: 'Customer reported a leak after recent rain.', verified: true, technicianId: 'tech-4', status: 'Assigned' }
];
