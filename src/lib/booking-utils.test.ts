import { describe, expect, it } from 'vitest';
import { bookingFixtures } from './mock-data';
import { bookingStatus, formatBookingSchedule, jobSummary } from './booking-utils';

describe('booking utilities', () => {
  it('marks unassigned work clearly for the admin', () => {
    expect(bookingStatus(bookingFixtures[0])).toBe('Pending review');
  });

  it('builds a share-ready summary with customer details', () => {
    expect(jobSummary(bookingFixtures[0])).toContain('Alex Johnson');
    expect(jobSummary(bookingFixtures[0])).toContain('123 Maple Dr');
  });

  it('formats canonical booking timestamps in the booking timezone', () => {
    expect(formatBookingSchedule(bookingFixtures[0])).toContain('10:00 AM');
  });
});
