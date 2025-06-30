'use client';
import React from 'react';
import { JOB_BOARD_DATA } from '@/constants/JobBoard';
import SearchInput from '@/components/Interface/Input/SearchInput';
import Select from '@/components/Interface/Dropdown/Select';

const SearchFilterBar = () => {
  const { placeholder, categories, experienceLevels, programmingLanguages } =
    JOB_BOARD_DATA.searchBar;

  return (
    <div className='flex flex-col lg:flex-row gap-4 bg-gray-50 dark:bg-gray-900/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800/20'>
      <div className='flex-1'>
        <SearchInput placeholder={placeholder} />
      </div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <Select options={categories} />
        <Select options={experienceLevels} />
        <Select options={programmingLanguages} />
      </div>
    </div>
  );
};

export default SearchFilterBar;
