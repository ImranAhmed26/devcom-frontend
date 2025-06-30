import React from 'react';
import { JOB_BOARD_DATA } from '@/constants/JobBoard';

const TitleBar = () => {
  const { title, description } = JOB_BOARD_DATA.titleBar;

  return (
    <div className='flex flex-col gap-3 pb-8'>
      <h1 className='text-5xl font-bold text-gray-900 dark:text-white'>
        {title}
      </h1>
      <h4 className='text-xl text-brandLight dark:text-brandDark max-w-2xl'>
        {description}
      </h4>
    </div>
  );
};

export default TitleBar;
