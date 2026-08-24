import { describe, expect, it } from 'vitest';
import { initialBookings } from './mock-data';
import { bookingStatus, jobSummary } from './booking-utils';

describe('booking utilities', () => {
  it('marks unassigned work clearly for the admin', () => {
    expect(bookingStatus(initialBookings[0])).toBe('Needs assignment');
  });

  it('builds a share-ready summary with customer details', () => {
    expect(jobSummary(initialBookings[0])).toContain('Alex Johnson');
    expect(jobSummary(initialBookings[0])).toContain('123 Maple Dr');
  });
});
