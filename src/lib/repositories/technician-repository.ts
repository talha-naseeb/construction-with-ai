import { technicianFixtures } from '@/lib/mock-data';
import type { Technician } from '@/lib/types';

export type TechnicianRepository = {
  list: () => Promise<Technician[]>;
};

export const technicianRepository: TechnicianRepository = {
  async list() {
    return technicianFixtures.map((technician) => ({ ...technician }));
  }
};
