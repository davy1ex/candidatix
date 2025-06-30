'use client';
import { useState } from "react";

import { ResumeCard } from "@/entities/resume/ui/ResumeCard";
import { Settings } from "@/entities/settings/ui/Settings";
import { ActivityHeatmap } from "@/shared/ui/ActivityHeatmap";
import { useResponseStore } from '@/entities/ai-response/model/responseStore';
import { ResponsesList } from "@/entities/ai-response/ui/ResponsesList";
import { CreateResponseModal } from "@/entities/ai-response/ui/CreateResponseModal";
import { Button } from "@/shared/ui/button";
import { CreateResumeModal } from '@/entities/resume/ui/CreateResumeModal';
import { Toaster } from '@/shared/ui/sonner';

export default function Home() {
  const { responses } = useResponseStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateResponseModalOpen, setIsCreateResponseModalOpen] = useState(false);

  // Process responses into activity data
  const activityData = responses.reduce((acc, response) => {
    const date = new Date(response.createdAt).toISOString().split('T')[0];
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]);

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <ResumeCard />
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create New Resume
          </Button>
        </div>
        <Settings />
      </div>

      <div className="flex col mb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Activity</h2>
          <ActivityHeatmap activityData={activityData} />
        </div>

        <div className="mb-8">
        
          <h2 className="text-2xl font-semibold mb-4 hover:underline cursor-pointer">
            Responses
          </h2>
          <Button 
            onClick={() => setIsCreateResponseModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New Response
          </Button>

            <ResponsesList />
        </div>

      </div>

      
      <CreateResumeModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
      />
      <CreateResponseModal 
        open={isCreateResponseModalOpen} 
        onOpenChange={setIsCreateResponseModalOpen}
      />
    </div>
  );
}