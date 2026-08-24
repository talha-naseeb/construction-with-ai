export type CallOutcome = 'Booking created' | 'Lead created' | 'Resolved' | 'Failed';
export type LeadStatus = 'New' | 'Follow-up due' | 'Qualified' | 'Lost';
export type JobStatus = 'Site visit' | 'Quote pending' | 'Scheduled' | 'In progress' | 'Completed';
export type ServiceState = 'Active' | 'Paused';

export type CallRecord = { id: string; customer: string; phone: string; service: string; startedAt: string; duration: string; outcome: CallOutcome; verification: 'Recognized' | 'Not verified' | 'Step-up required'; summary: string; transcript: Array<{ speaker: 'Customer' | 'Retell'; text: string }> };
export type LeadRecord = { id: string; customer: string; service: string; location: string; source: string; status: LeadStatus; followUp: string; owner: string };
export type JobRecord = { id: string; customer: string; service: string; technician: string; scheduledFor: string; status: JobStatus };
export type ServiceRecord = { id: string; name: string; category: string; areas: string; bookingQuestions: number; state: ServiceState };
export type CustomerRecord = { id: string; name: string; phone: string; email: string; verification: 'Level 0' | 'Level 1' | 'Level 2'; activeWork: string; lastContact: string };

const calls: CallRecord[] = [
  { id: 'call-1048', customer: 'Alex Johnson', phone: '(512) 555-0198', service: 'Kitchen remodel estimate', startedAt: 'Today · 09:42 AM', duration: '06:18', outcome: 'Booking created', verification: 'Not verified', summary: 'Wants an in-home estimate for cabinet and countertop work.', transcript: [{ speaker: 'Retell', text: 'Thanks for calling. What work would you like help with?' }, { speaker: 'Customer', text: 'I need an estimate for a kitchen remodel—cabinets and countertops.' }, { speaker: 'Retell', text: 'I can request a kitchen remodel estimate. What day works best for a visit?' }, { speaker: 'Customer', text: 'Tomorrow morning, if possible.' }] },
  { id: 'call-1047', customer: 'Maria Garcia', phone: '(713) 555-0142', service: 'Deck repair', startedAt: 'Today · 09:17 AM', duration: '04:05', outcome: 'Resolved', verification: 'Recognized', summary: 'Confirmed the upcoming deck consultation time.', transcript: [{ speaker: 'Customer', text: 'Can you check the time for my deck appointment?' }, { speaker: 'Retell', text: 'Your appointment is today at 1:30 PM.' }] },
  { id: 'call-1046', customer: 'Owen Wright', phone: '(512) 555-0181', service: 'Swimming pool installation', startedAt: 'Today · 08:56 AM', duration: '03:42', outcome: 'Lead created', verification: 'Not verified', summary: 'Service is not in the catalogue; follow-up requested.', transcript: [{ speaker: 'Customer', text: 'Do you install swimming pools?' }, { speaker: 'Retell', text: 'I cannot confirm that service. I can send your request to the team for follow-up.' }] },
  { id: 'call-1045', customer: 'Sarah Thompson', phone: '(214) 555-0177', service: 'Roof inspection', startedAt: 'Today · 08:33 AM', duration: '02:11', outcome: 'Failed', verification: 'Step-up required', summary: 'Caller requested an address change; verification was not completed.', transcript: [{ speaker: 'Customer', text: 'I need to change the address for my roof inspection.' }, { speaker: 'Retell', text: 'To change an address, please complete a secure verification step.' }] }
];
const leads: LeadRecord[] = [
  { id: 'lead-201', customer: 'Owen Wright', service: 'Swimming pool installation', location: 'Austin, TX', source: 'Inbound AI call', status: 'Follow-up due', followUp: 'Today · 2:00 PM', owner: 'Aisha Khan' },
  { id: 'lead-200', customer: 'Priya Shah', service: 'Exterior painting', location: 'Round Rock, TX', source: 'Website callback', status: 'New', followUp: 'Tomorrow', owner: 'Unassigned' },
  { id: 'lead-199', customer: 'Eric Cole', service: 'Foundation repair', location: 'Leander, TX', source: 'Inbound AI call', status: 'Qualified', followUp: 'Thu, May 22', owner: 'Aisha Khan' }
];
const jobs: JobRecord[] = [
  { id: 'job-320', customer: 'Maria Garcia', service: 'Deck repair consultation', technician: 'Samantha Lee', scheduledFor: 'Today · 1:30 PM', status: 'Site visit' },
  { id: 'job-319', customer: 'Sarah Thompson', service: 'Roof inspection', technician: 'Brandon Taylor', scheduledFor: 'Tomorrow · 2:00 PM', status: 'Scheduled' },
  { id: 'job-318', customer: 'Ben Foster', service: 'Electrical upgrade', technician: 'Miguel Hernandez', scheduledFor: 'Today · 2:00 PM', status: 'In progress' }
];
const services: ServiceRecord[] = [
  { id: 'svc-01', name: 'Kitchen remodeling', category: 'Construction', areas: 'Austin metro', bookingQuestions: 4, state: 'Active' },
  { id: 'svc-02', name: 'Electrical repair', category: 'Electrical', areas: 'Austin · Round Rock', bookingQuestions: 3, state: 'Active' },
  { id: 'svc-03', name: 'Plumbing repair', category: 'Plumbing', areas: 'Austin metro', bookingQuestions: 3, state: 'Active' },
  { id: 'svc-04', name: 'Waterproofing', category: 'Maintenance', areas: 'Leander only', bookingQuestions: 5, state: 'Paused' }
];
const customers: CustomerRecord[] = [
  { id: 'cust-100', name: 'Maria Garcia', phone: '(713) 555-0142', email: 'maria@example.com', verification: 'Level 1', activeWork: 'Deck repair consultation', lastContact: 'Today · 09:17 AM' },
  { id: 'cust-101', name: 'Alex Johnson', phone: '(512) 555-0198', email: 'alex@example.com', verification: 'Level 0', activeWork: 'Awaiting confirmation', lastContact: 'Today · 09:42 AM' },
  { id: 'cust-102', name: 'Sarah Thompson', phone: '(214) 555-0177', email: 'sarah@example.com', verification: 'Level 2', activeWork: 'Roof inspection', lastContact: 'Today · 08:33 AM' }
];

export const operationsRepository = {
  listCalls: () => calls,
  getCall: (id: string) => calls.find((call) => call.id === id),
  listLeads: () => leads,
  getLead: (id: string) => leads.find((lead) => lead.id === id),
  listJobs: () => jobs,
  getJob: (id: string) => jobs.find((job) => job.id === id),
  listServices: () => services,
  getService: (id: string) => services.find((service) => service.id === id),
  listCustomers: () => customers,
  getCustomer: (id: string) => customers.find((customer) => customer.id === id)
};
