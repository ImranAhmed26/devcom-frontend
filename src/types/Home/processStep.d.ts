import { LucideIcon } from 'lucide-react';

export type ProcessStep = {
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription: React.ReactNode;
};

export type ProcessStepItem = ProcessStep & {
  icon: React.ComponentType;
};
