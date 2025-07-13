'use client';

import { useState } from 'react';
import { FileText, Download, Eye, MoreHorizontal } from 'lucide-react';
import { documents } from '@/constants/MockData';

export function RecentDocuments() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className='rounded-medium border border-gray-200 dark:border-gray-700'>
      <div className='px-6 rounded-t-medium py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-quadraGray'>
        <h2 className='text-lg font-semibold  dark:text-white'>Recent Documents</h2>
      </div>
      <div className='p-6 dark:bg-'>
        <div className='space-y-4'>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className='flex items-center justify-between p-4 border dark:border-none dark:bg-hexaGray rounded-medium'
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center rounded-medium justify-center bg-gray-100 dark:bg-quadraGray'>
                  <FileText className='h-5 w-5' />
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium '>{doc.name}</p>
                  <div className='flex items-center gap-2 text-xs text-gray-500'>
                    <span>
                      {doc.pages} page{doc.pages > 1 ? 's' : ''}
                    </span>
                    <span>•</span>
                    <span>{doc.processedAt}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {doc.status}
                </span>
                {doc.accuracy !== '-' && (
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300'>
                    {doc.accuracy}
                  </span>
                )}
                <div className='relative'>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === doc.id ? null : doc.id)}
                    className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md'
                  >
                    <MoreHorizontal className='h-4 w-4' />
                  </button>
                  {openDropdown === doc.id && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10'>
                      <div className='py-1'>
                        <button className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          <Eye className='mr-2 h-4 w-4' />
                          View Text
                        </button>
                        <button className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          <Download className='mr-2 h-4 w-4' />
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
