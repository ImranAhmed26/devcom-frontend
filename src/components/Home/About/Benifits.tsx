import { Card } from '@/components/Interface/Card';
import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function BenefitCard({
  icon: Icon,
  title,
  description,
}: BenefitCardProps) {
  return (
    <Card className='p-6 hover:shadow-lg transition-shadow'>
      <div className='h-12 w-12 rounded-full bg-brandLight dark:bg-brandDark flex items-center justify-center mb-4'>
        <Icon className='h-6 w-6 text-white dark:text-gray-800' />
      </div>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </Card>
  );
}
