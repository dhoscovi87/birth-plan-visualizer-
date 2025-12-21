
import React from 'react';

export type SectionType = 'Labor' | 'Delivery' | 'Cesarean';

export interface BirthPlanItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: SectionType;
  color: 'blue' | 'pink';
}

export interface UserSelection {
  selected: boolean;
  note: string;
}

export type Selections = Record<string, UserSelection>;

export interface PlanData {
  items: BirthPlanItem[];
  selections: Selections;
  patientName: string;
  partnerName: string;
  dueDate: string;
}