import React from 'react';
import ServiceItem from './ServiceItem';
import SectionHeader from '@/components/Interface/Typography/SectionHeader';
import Image from 'next/image';
import { Service } from '@/types/Home/serviceItem';
import { BANNER_DATA } from '@/constants/landingPage';
const Services = () => {
  return (
    <section
      id='features'
      className='relative z-1 overflow-hidden bg-gray-1 '
    >
      {/* <!-- section title --> */}
      <SectionHeader
        title={'Services we offer'}
        description='Discover our range of tailored services designed to help your business thrive with expertise, innovation, and a focus on your success.
        '
      />

      <div className='relative z-1 mx-auto w-full max-w-6xl px-4 sm:px-8 xl:px-0'>
        <div className='grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3'>
          {/* <!-- features item --> */}
          {BANNER_DATA.serviceData?.map((item: Service, key: number) => (
            <ServiceItem data={item} key={key} />
          ))}
        </div>

        {/* <!-- Features Background Shapes --> */}
        <div className='hidden sm:block'>
          <div className='absolute left-0 top-1/2 -z-1 -translate-y-1/2'>
            <Image
              src='/assets/features/features-shape-01.svg'
              alt='shape'
              width={600}
              height={600}
            />
          </div>
          <div className='absolute right-0 top-1/2 -z-1 -translate-y-1/2'>
            <Image
              src='/assets/features/features-shape-02.svg'
              alt='shape'
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
