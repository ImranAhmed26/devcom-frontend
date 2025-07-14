import { Card } from '@/components/Interface/Card';
import { LucideIcon, Check } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
}: ServiceCardProps) {
  return (
    <Card className='p-6 hover:shadow-lg transition-shadow'>
      <Icon className='h-12 w-12 text-primary mb-4' />
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-muted-foreground mb-4'>{description}</p>
      <ul className='space-y-2'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center gap-2'>
            <Check className='h-4 w-4 text-primary' />
            <span className='text-sm'>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
