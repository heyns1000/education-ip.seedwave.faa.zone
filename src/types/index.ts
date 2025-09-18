export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  triggers: string[];
  notes: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  type: 'controller' | 'rescue' | 'other';
  active: boolean;
  notes: string;
}

export interface PeakFlowReading {
  id: string;
  date: string;
  reading: number;
  personalBest: number;
  zone: 'green' | 'yellow' | 'red';
  notes: string;
}

export interface User {
  name: string;
  age: number;
  condition: string;
  personalBest: number;
}