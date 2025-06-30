'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';

const miniJobs = [
  {
    title: 'Frontend Developer',
    company: 'TechNova',
    location: 'Remote',
    icon: <FaReact className="text-blue-500" size={28} />,
    bg: 'bg-blue-50 dark:bg-blue-900/40',
    initial: { top: '15%', left: '10%' },
    animate: {
      x: [0, 120, 0],
      y: [0, 80, 0],
      transition: {
        duration: 32,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        ease: 'easeInOut'
      }
    }
  },
  {
    title: 'Backend Engineer',
    company: 'Cloudify',
    location: 'Berlin',
    icon: <FaNodeJs className="text-green-600" size={28} />,
    bg: 'bg-green-50 dark:bg-green-900/40',
    initial: { top: '25%', left: '60%' },
    animate: {
      x: [0, -100, 0],
      y: [0, 100, 0],
      transition: {
        duration: 36,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        ease: 'easeInOut'
      }
    }
  },
  {
    title: 'Python Developer',
    company: 'DataWiz',
    location: 'London',
    icon: <FaPython className="text-yellow-500" size={28} />,
    bg: 'bg-yellow-50 dark:bg-yellow-900/40',
    initial: { top: '60%', left: '25%' },
    animate: {
      x: [0, 80, 0],
      y: [0, -60, 0],
      transition: {
        duration: 40,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        ease: 'easeInOut'
      }
    }
  }
];

const RoamingCards = () => (
  <div className="pointer-events-none fixed inset-0 w-full h-full z-0">
    {miniJobs.map((job, i) => (
      <motion.div
        key={job.title}
        className={`absolute shadow-lg rounded-2xl ${job.bg} bg-white/10 dark:bg-gray-200/10 backdrop-blur-md px-5 py-4 min-w-[300px] max-w-[320px] pointer-events-auto border border-white/20 dark:border-gray-700/20`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          top: job.initial.top,
          left: job.initial.left
        }}
        animate={job.animate}
      >
        <div className="flex items-center gap-3 mb-2">
          {job.icon}
          <span className="font-semibold text-brandLight dark:text-brandDark text-base">{job.title}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-300">{job.company}</div>
        <div className="text-xs text-gray-400 dark:text-gray-400">{job.location}</div>
      </motion.div>
    ))}
  </div>
);

export default RoamingCards;