'use client';
import React from 'react';
import Carousel from '@/components/Interface/CustomFeature/Carousal';

const Projects = () => {
  return (
    <div className='flex flex-col justify-center items-center pt-20 '>
      <div className='max-w-7xl flex flex-col items-center gap-10 '>
        <Carousel />
      </div>
    </div>
  );
};

export default Projects;
