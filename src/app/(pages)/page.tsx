"use client"
import { ResumeCard } from "@/entities/resume/server";
import { Settings } from "@/entities/settings/ui/Settings";
import { AIChat } from "@/entities/ai-chat/ui/AIChat";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <ResumeCard />
        </div>
        <Settings />
      </div>
    </div>
  );
}
