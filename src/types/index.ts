export type UserRole = 'admin' | 'manager' | 'scientist';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  season: string;
  fieldLocation: string;
  imageUrl?: string;
  status: 'active' | 'harvested' | 'planned';
  createdAt: string;
  updatedAt: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  assignedTasks: string[];
  status: 'active' | 'inactive';
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  type: string;
  assignedDriver: string;
  status: 'available' | 'in-use' | 'maintenance';
  lastMaintenance: string;
}