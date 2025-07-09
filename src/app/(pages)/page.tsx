'use client';
import { Toaster } from '@/shared/ui/sonner';
import { ResumeSection } from "@/widgets/resume-section";
import { Settings } from "@/features/settings";
import { ActivityHeatmapSection } from "@/widgets/activityHeatmap-section";
import { ResponseSection } from "@/widgets/responses-sections/ui/ResponsesSection";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <ResumeSection />
        <Settings />
      </div>    

      <div className="flex col mb-8">
        <ActivityHeatmapSection />
        <ResponseSection />
      </div>
    </div>
  );
}