'use client';
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange?: (value: string) => void;
  className?: string;
}

const Select = ({ options, onChange, className = '' }: SelectProps) => {
  return (
    <select 
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/20 text-brandLight dark:text-brandDark cursor-pointer focus:ring-2 focus:ring-blue-500/20 min-w-0 sm:min-w-[180px] transition-all ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;