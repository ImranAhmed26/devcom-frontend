import { Card } from '@/components/Interface/Card';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

export function ProcessStep({
  icon: Icon,
  title,
  description,
  step,
}: ProcessStepProps) {
  return (
    <Card className='p-4 relative border-none bg-gray-300/50 dark:bg-black/20 rounded-2xl'>
      <div className='absolute -top-3 -left-3 w-8 h-8 rounded-full bg-brandLight dark:bg-brandDark text-gray-200 dark:text-gray-800 flex items-center justify-center font-bold'>
        {step}
      </div>
      <Icon className='h-8 w-8 text-primary mb-4' />
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </Card>
  );
}
