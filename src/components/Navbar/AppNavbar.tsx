'use client';

import ThemeSwitch from '../Interface/CustomFeature/ThemeSwitch';

import React from 'react';

const AppNavbar = () => {
  return (
    <header className='flex justify-between h-16 items-center gap-4 border-b border-gray-200 dark:border-none bg-white dark:bg-quadraGray px-4'>
      <div className='flex items-center'>
        <div className='h-4 w-px bg-gray-300 mx-2' />
        <h1 className='text-lg font-semibold'>OCR Dashboard</h1>
      </div>
      <div>
        <div className='w-20 lg:px-3 py-2.5 lg:flex justify-end'>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
