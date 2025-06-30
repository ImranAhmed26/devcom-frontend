'use client'
import { UploadZone } from './UploadZone';
import { StatsCards } from './StatsCards';
import { RecentDocuments } from './RecentDocuments';
import { OCRResults } from './OcrResults';

export default function Dashboard() {
  return (
    <div className='space-y-6'>
      <StatsCards />
      <div className='grid gap-6 md:grid-cols-2'>
        <UploadZone />
        <OCRResults />
      </div>
      <RecentDocuments />
    </div>
  );
}
