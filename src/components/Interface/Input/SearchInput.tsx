'use client';
import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchInput = ({
  placeholder,
  onChange,
  className = '',
}: SearchInputProps) => {
  return (
    <div className='relative'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full px-4 py-3.5 pl-12 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandLight transition-all ${className}`}
      />
      <Search className='absolute left-4 top-4 h-5 w-5' />
    </div>
  );
};

export default SearchInput;
