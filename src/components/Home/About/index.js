'use client';
import { ServiceCard } from './ServiceCard';
import { ProcessStep } from './ProcessStep';
import { BenefitCard } from './Benifits';
import {
  Code2,
  Lightbulb,
  Rocket,
  Zap,
  Trophy,
  Users2,
  Globe,
  Smartphone,
  Gauge,
  Shield,
  Palette,
  Search,
} from 'lucide-react';
import AltButton from '@/components/Interface/Button/AltButton';
import ActionButton from '@/components/Interface/Button/ActionButton';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();
  const handleBooking = () => {
    router.push('https://calendly.com/business-interaspect/free-consultation');
  };
  return (
    <main className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='pt-32 pb-16 px-4 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10' />
        <div className='container mx-auto'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
              Transforming Ideas into
              <span className='block bg-gradient-to-r from-brandLight to-violet-600 bg-clip-text h-16 text-transparent'>
                Digital Reality
              </span>
            </h1>
            <p className='text-xl text-muted-foreground mb-8'>
              {` We're not just developers – we're digital craftsmen passionate
              about creating exceptional web experiences that drive business
              growth.`}
            </p>
            <AltButton
              func={handleBooking}
              title='Schedule a Consultation'
              textStyle='rounded-large '
            />
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-4'>Our Services</h2>
          <p className='text-center mb-12 max-w-2xl mx-auto'>
            Comprehensive web development solutions tailored to your business
            needs
          </p>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <ServiceCard
              icon={Globe}
              title='Custom Web Development'
              description='Modern, responsive websites built with the latest technologies'
              features={[
                'React, Node Js, Django, C#, AWS',
                'Responsive Design',
                'Performance Optimization',
              ]}
            />
            <ServiceCard
              icon={Smartphone}
              title='E-commerce Solutions'
              description='Convert visitors into customers with powerful online stores'
              features={[
                'Secure Payments',
                'Inventory Management',
                'Mobile-First Design',
              ]}
            />
            <ServiceCard
              icon={Gauge}
              title='Web Applications'
              description='Scalable applications that streamline your business processes'
              features={[
                'Cloud Infrastructure',
                'Real-time Updates',
                'User Authentication',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Our Development Process
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-8'>
            <ProcessStep
              icon={Search}
              title='Discovery'
              description='We dive deep to understand your business needs and objectives'
              step={1}
            />
            <ProcessStep
              icon={Lightbulb}
              title='Strategy'
              description='Our team plan the best strategy to achieve the perfect solution for you'
              step={2}
            />
            <ProcessStep
              icon={Code2}
              title='Development'
              description='Clean, efficient code following best practices'
              step={3}
            />
            <ProcessStep
              icon={Zap}
              title='Testing'
              description='Rigorous testing to ensure perfect functionality'
              step={4}
            />
            <ProcessStep
              icon={Rocket}
              title='Launch'
              description='Smooth deployment and ongoing support'
              step={5}
            />
          </div>
        </div>
      </section>

      {/* Benefit Section */}
      <section className='py-16 px-4 bg-muted/30'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-4'>Why Choose Us</h2>
          <p className='text-center text-muted-foreground mb-12 max-w-2xl mx-auto'>
            We deliver value through innovation, quality, and client-focused
            development
          </p>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <BenefitCard
              icon={Shield}
              title='Modern Tech Stack'
              description='We use the latest technologies like React, Node.js, Angular, Django, C# to build future-proof solutions'
            />
            <BenefitCard
              icon={Palette}
              title='Custom Solutions'
              description='Every project is unique. We create tailored solutions that match your specific needs'
            />
            <BenefitCard
              icon={Search}
              title='SEO Optimized'
              description='Built-in SEO best practices to improve your visibility and reach'
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Our Core Values
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='p-6 rounded-lg bg-muted/30'>
              <Users2 className='h-12 w-12 text-primary mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Client Partnership</h3>
              <p className='text-muted-foreground'>
                We believe in building long-term relationships with our clients,
                becoming true partners in their digital success journey.
              </p>
            </div>
            <div className='p-6 rounded-lg bg-muted/30'>
              <Rocket className='h-12 w-12 text-primary mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Innovation First</h3>
              <p className='text-muted-foreground'>
                We stay at the forefront of technology, embracing new tools and
                methodologies to deliver cutting-edge solutions.
              </p>
            </div>
            <div className='p-6 rounded-lg bg-muted/30'>
              <Trophy className='h-12 w-12 text-primary mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Excellence Always</h3>
              <p className='text-muted-foreground'>
                Quality is non-negotiable. We maintain the highest standards in
                every project we undertake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4 bg-primary text-primary-foreground'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Ready to Start Your Project?
          </h2>
          <p className='text-lg mb-8 text-primary-foreground/80'>
            {`Let's discuss how we can help bring your vision to life.`}
          </p>
          <ActionButton
            func={handleBooking}
            title=' Get in Touch'
            textStyle='rounded-large'
          ></ActionButton>
        </div>
      </section>
    </main>
  );
}
