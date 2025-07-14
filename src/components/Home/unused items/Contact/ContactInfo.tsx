import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

function ContactInfoItem({ icon, title, content }: ContactInfoItemProps) {
  return (
    <div className='flex items-start space-x-4'>
      <div className='p-2 bg-primary/10 rounded-lg'>{icon}</div>
      <div>
        <h3 className='font-medium'>{title}</h3>
        <p className='text-muted-foreground'>{content}</p>
      </div>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className='space-y-6'>
      <ContactInfoItem
        icon={<MapPin className='h-5 w-5 text-primary' />}
        title='Office Location'
        content='705 Progress Ave Suite 110, Scarborough, ON M1H 2X1'
      />
      <ContactInfoItem
        icon={<Phone className='h-5 w-5 text-primary' />}
        title='Phone Number'
        content='+1 (437) 606-1704'
      />
      <ContactInfoItem
        icon={<Mail className='h-5 w-5 text-primary' />}
        title='Email Address'
        content='contact@businessinteraspect.com'
      />
      <ContactInfoItem
        icon={<Clock className='h-5 w-5 text-primary' />}
        title='Business Hours'
        content='Mon - Fri: 9:00 AM - 6:00 PM EST'
      />
    </div>
  );
}
