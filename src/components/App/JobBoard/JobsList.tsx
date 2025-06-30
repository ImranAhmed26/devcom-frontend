'use client';
import React, { useState } from 'react';
import { JOB_BOARD_DATA } from '@/constants/JobBoard';
import { getRelativeTime } from '@/lib/helper';
import { MOCK_JOBS } from '@/constants/MockData';
import JobDetailsPopup from './JobDetailsPopup';

const JobsList = () => {
  const { buttons } = JOB_BOARD_DATA;
  const [hoveredJobId, setHoveredJobId] = useState<number | null>(null);
  let hoverTimer: NodeJS.Timeout;

  const handleMouseEnter = (jobId: number) => {
    hoverTimer = setTimeout(() => {
      setHoveredJobId(jobId);
    }, 900);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setHoveredJobId(null);
  };

  return (
    <div className='flex flex-col lg:flex-row gap-8'>
      <div className='grid gap-4 w-full lg:w-[70%] min-w-0 lg:min-w-[600px]'>
        {MOCK_JOBS.map((job) => (
          <div
            key={job.id}
            onMouseEnter={() => handleMouseEnter(job.id)}
            onMouseLeave={handleMouseLeave}
            className='relative'
          >
            <div className='group flex flex-col lg:flex-row justify-between items-start gap-6 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/40 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800/20 hover:shadow-md hover:bg-white dark:hover:bg-gray-900/60 transition-all'>
              <div className='flex-1 space-y-4 w-full'>
                <div className='space-y-1'>
                  <h2 className='text-xl font-semibold group-hover:brandLight dark:group-hover: transition-colors'>
                    {job.title}
                  </h2>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm font-medium text-brandLight dark:text-brandDark'>
                    <span>{job.company}</span>
                    <span className='hidden sm:block'>•</span>
                    <div className='flex items-center gap-2'>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{getRelativeTime(job.postedDate)}</span>
                    </div>
                  </div>
                </div>
                <p className='text-base leading-relaxed line-clamp-2'>
                  {job.description}
                </p>
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
            </div>

            {hoveredJobId === job.id && (
              <div className='hidden lg:block absolute -top-40 -translate-y-1/2 -right-80 z-10'>
                <JobDetailsPopup job={job} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
