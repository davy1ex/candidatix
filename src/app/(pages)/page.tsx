"use client"

import { ResumeCard } from "@/entities/resume/server";
import { Settings } from "@/entities/settings/ui/Settings";
import { AIChat } from "@/entities/ai-chat/ui/AIChat";
import { ActivityHeatmap } from "@/shared/ui/ActivityHeatmap";
import { useResponseStore } from '@/entities/ai-response/model/responseStore';
import { ResponsesList } from "@/entities/ai-response/ui/ResponsesList";
import Link from "next/link";

export default function Home() {
  const { responses } = useResponseStore();

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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <ResumeCard />
        </div>
        <Settings />
      </div>

      <div className="flex col mb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Activity</h2>
          <ActivityHeatmap activityData={activityData} />
        </div>

        <div className="mb-8">
        <Link href="/responses">
          <h2 className="text-2xl font-semibold mb-4 hover:underline cursor-pointer">
            Responses
          </h2>
        </Link>
            <ResponsesList />
        </div>

      </div>

      
      
    </div>
  );
}