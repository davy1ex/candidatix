'use client'
import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/shared/ui/button';
import { useResponseStore } from '../model/responseStore';
import { AIResponse } from '../model/types';
import { ResponseDetailsModal } from './ResponseDetailsModal';

export const ResponsesList = () => {
  const { responses, isLoading } = useResponseStore();
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No responses saved yet</p>
      </div>
    );
  }

  return (
    <>
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left pr-2 font-medium text-gray-500">Date</th>
            <th className="text-left pr-2 font-medium text-gray-500">Job Description</th>
            <th className="text-left pr-2 font-medium text-gray-500">Response</th>
            <th className="text-left pr-2 font-medium text-gray-500">Link</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response.id} className="border-b border-gray-200">
              <td className="pr-2">
                {format(new Date(response.createdAt), 'MMM d, yyyy')}
              </td>
              <td className="pr-2">
                <div className="truncate max-w-[200px]">
                  {response.jobDescription?.substring(0, 100)}
                  {response.jobDescription && response.jobDescription?.length > 100 ? '...' : ''}
                </div>
              </td>
              <td className="pr-2">
                <div className="truncate max-w-[200px]">
                  {response.response.substring(0, 100)}{response.response.length > 100 ? '...' : ''}
                </div>
              </td>
              <td className="flex w-[100%] h-[100%] items-center justify-center">
                <a 
                  href={response.jobLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  
                  link
                </a>
                <Button 
                  className='flex ml-2' 
                  size="m" 
                  onClick={() => setSelectedResponse(response)}
                >
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <ResponseDetailsModal 
      open={selectedResponse !== null} 
      onOpenChange={() => setSelectedResponse(null)} 
      response={selectedResponse}
    />
    </>
  );
};
