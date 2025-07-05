"use client"

import { useRouter } from 'next/navigation';
import { useResume } from '../model/resumeStore';
import { Button } from '@/shared/ui/button';
import { EditResumeModal } from './EditResumeModal';
import { useState } from 'react';

export const ResumeCard = () => {
  const router = useRouter();
  const { resume, isLoading } = useResume();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="p-4 bg-white text-black rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resume</h3>
        <Button 
          variant="secondary"
          size="sm"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </Button>
      </div>
      
      {isLoading ? (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Title:</span>
            <span className="text-gray-600">{resume?.title || 'Empty'}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Work Experience:</span>
            <span className="font-medium"><pre>{resume?.workExperience}</pre></span>
          </div>
        </div>
      )}
    <EditResumeModal 
      open={isEditModalOpen} 
      onOpenChange={setIsEditModalOpen} 
      resume={resume}
    />
    </div>
  );
}