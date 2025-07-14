'use client';
import React from 'react';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { Card } from '@/components/Interface/Card';
import ActionButton from '@/components/Interface/Button/ActionButton';
import { CONTACT_DATA } from '@/constants/landingPage';

const BookAppointment = () => {
  // Placeholder for the booking handler function (should be implemented or passed as a prop)
  const handleBooking = (link: string) => {
    console.log('link', link);
    // Add your booking logic here
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Column - Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <ContactForm />
          </Card>

          {/* Right Column - Contact Information and Free Consultation */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <ContactInfo />
            </div>

            {/* Free Consultation */}
            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
              <p className="text-primary-foreground/90">
                Book a free 30-minute consultation to discuss your project
                requirements and explore how we can help your business grow.
              </p>
              <div className="pt-2">
                <ActionButton
                  title={CONTACT_DATA.button.actionBtn.title}
                  func={() => handleBooking(CONTACT_DATA.button.actionBtn.link)}
                  textStyle="rounded-large"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
