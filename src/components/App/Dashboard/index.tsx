'use client'
import { UploadZone } from './UploadZone';
import { StatsCards } from './StatsCards';
import { OCRResults } from './OcrResults';
import { RecentWorkSpaceList } from './RecentWorkspace';

export default function Dashboard() {
  return (
    <div className='space-y-6'>
      <StatsCards />
      <RecentWorkSpaceList />
      <div className='grid gap-6 md:grid-cols-2'>
        <UploadZone />
        <OCRResults />
      </div>  
    </div>
  );
}
