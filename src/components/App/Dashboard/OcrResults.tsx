'use client';
import { extractedText } from '@/constants/MockData';
import { Copy, Download } from 'lucide-react';

export function OCRResults() {
  return (
    <div className='rounded-medium border border-gray-200 dark:borde dark:border-gray-700'>
      <div className='px-6 py-4 rounded-t-medium border-b border-gray-200 dark:bg-quadraGray dark:border-none'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold dark:text-brandDark'>Extracted Text</h2>
          <div className='flex gap-2'>
            <button className='inline-flex items-center px-3 py-1.5 text-sm font-medium text-white dark:text-gray-800 bg-brandLight hover:bg-brandDark dark:bg-brandDark dark:hover:bg-brandLight rounded-small'>
              <Copy className='mr-2 h-4 w-4' />
              Copy
            </button>
            <button className='inline-flex items-center px-3 py-1.5 text-sm font-medium text-white dark:text-gray-800 bg-brandLight hover:bg-brandDark dark:bg-brandDark dark:hover:bg-brandLight rounded-small'>
              <Download className='mr-2 h-4 w-4' />
              Export
            </button>
          </div>
        </div>
      </div>
      <div className='p-6 rounded-b-medium dark:bg-hexaGray'>
        <textarea
          value={extractedText}
          readOnly
          className='w-full min-h-[300px] p-3 text-sm font-mono bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-medium resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Extracted text will appear here...'
        />
        <div className='mt-4 flex items-center justify-between text-sm '>
          <span>Confidence: 99.2%</span>
          <span>Processing time: 2.3s</span>
        </div>
      </div>
    </div>
  );
}
