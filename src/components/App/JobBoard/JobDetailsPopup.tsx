'use client';
import React from 'react';
import { Job } from '@/constants/JobBoard';

interface JobDetailsPopupProps {
  job: Job | undefined;
}

const JobDetailsPopup = ({ job }: JobDetailsPopupProps) => {
  if (!job) return null;

  return (
    <div className='w-[400px] fixed right-[15%] top-1/4 space-y-6 p-6 bg-white dark:bg-gray-900/40 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/20 transition-all'>
      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold'>
          {job.title}
        </h2>
        <div className='flex items-center gap-2 text-sm font-medium text-brandLight/70 dark:text-brandDark/70'>
          <span>{job.company}</span>
          <span>•</span>
          <span>{job.location}</span>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-brandLight dark:text-brandDark'>
          Job Description
        </h3>
        <p className='text-base'>
          {job.description}
        </p>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-brandLight dark:text-brandDark'>
          Required Skills
        </h3>
        <div className='flex flex-wrap gap-2'>
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className='px-3 py-1 bg-white dark:bg-gray-800/50 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700/20'
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <button className='w-full px-4 py-3 bg-brandLight hover:bg-brandDark text-white font-medium rounded-xl transition-colors'>
        Apply Now
      </button>
    </div>
  );
};

export default JobDetailsPopup;
