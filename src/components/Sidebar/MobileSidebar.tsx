'use client';

import { useState } from 'react';
import { Menu, X, FileText, Upload, History, Settings, BarChart3, Folder, CreditCard, User } from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    url: '#',
    icon: BarChart3,
  },
  {
    title: 'Upload',
    url: '#',
    icon: Upload,
  },
  {
    title: 'Documents',
    url: '#',
    icon: Folder,
  },
  {
    title: 'History',
    url: '#',
    icon: History,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className='md:"hidden" p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md'
      >
        <Menu className='h-5 w-5' />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40 md:"hidden"' onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:"hidden" ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white'>
              <FileText className='h-4 w-4' />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold text-gray-900'>OCR Pro</span>
              <span className='text-xs text-gray-500'>Text Recognition</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='flex-1 px-4 py-4'>
          <div className='space-y-1'>
            <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-3'>Navigation</p>
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  item.title === 'Dashboard'
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className='h-4 w-4' />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className='px-4 py-4 border-t border-gray-200 space-y-1'>
          <a
            href='#'
            className='flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors'
            onClick={() => setIsOpen(false)}
          >
            <User className='h-4 w-4' />
            <span>Account</span>
          </a>
          <a
            href='#'
            className='flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors'
            onClick={() => setIsOpen(false)}
          >
            <CreditCard className='h-4 w-4' />
            <span>Billing</span>
          </a>
        </div>
      </div>
    </>
  );
}
