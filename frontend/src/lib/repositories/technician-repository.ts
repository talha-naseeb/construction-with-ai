import { technicianFixtures } from '@/lib/mock-data';
import type { Technician } from '@/lib/types';

export type TechnicianRepository = {
  list: () => Promise<Technician[]>;
  get: (id: string) => Promise<Technician | null>;
  create: (input: Omit<Technician, 'id' | 'initials' | 'currentLoad'>) => Promise<Technician>;
  update: (id: string, input: Omit<Technician, 'id' | 'initials' | 'currentLoad'>) => Promise<Technician>;
};

let technicians: Technician[] = technicianFixtures.map((technician) => ({ ...technician, skills: [...(technician.skills ?? [])] }));
const clone = (technician: Technician): Technician => ({ ...technician, skills: technician.skills ? [...technician.skills] : undefined });
const initialsFor = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

export const technicianRepository: TechnicianRepository = {
  async list() {
    return technicians.map(clone);
  },
  async get(id) {
    const technician = technicians.find((item) => item.id === id);
    return technician ? clone(technician) : null;
  },
  async create(input) {
    const technician: Technician = { ...input, id: `tech-${Date.now()}`, initials: initialsFor(input.name), currentLoad: '0 jobs today' };
    technicians = [...technicians, technician];
    return clone(technician);
  },
  async update(id, input) {
    const existing = technicians.find((item) => item.id === id);
    if (!existing) throw new Error('This technician is no longer available. Refresh and try again.');
    const technician: Technician = { ...existing, ...input, initials: initialsFor(input.name) };
    technicians = technicians.map((item) => item.id === id ? technician : item);
    return clone(technician);
  }
};
