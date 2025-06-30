'use client';

import { useState } from 'react';
import { Input } from '@/components/Interface/Input';
import { Textarea } from '@/components/Interface/TextArea';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label htmlFor='name' className='text-sm font-medium'>
            Name
          </label>
          <Input id='name' placeholder='Your Full Name' required />
        </div>
        <div className='space-y-2'>
          <label htmlFor='email' className='text-sm font-medium'>
            Email
          </label>
          <Input
            id='email'
            type='email'
            placeholder='name@example.com'
            required
          />
        </div>
      </div>
      <div className='space-y-2'>
        <label htmlFor='subject' className='text-sm font-medium'>
          Subject
        </label>
        <Input id='subject' placeholder='Project Discussion' required />
      </div>
      <div className='space-y-2'>
        <label htmlFor='message' className='text-sm font-medium'>
          Message
        </label>
        <Textarea
          id='message'
          placeholder='Tell us about your project...'
          className='min-h-[150px]'
          required
        />
      </div>
      <motion.button
        type='submit'
        className='flex items-center rounded-large py-2 px-4 text-white bg-black'
        disabled={isSubmitting}
      >
        <Send className='mr-2 h-4 w-4' />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </form>
  );
}
