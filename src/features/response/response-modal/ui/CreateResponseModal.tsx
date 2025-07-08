"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Calendar } from "@/shared/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useResponseStore, AIResponse } from '@/entities/rensponse';
import { toast } from "sonner";
import { format } from "date-fns";
import { useResume } from '@/entities/resume/model/resumeStore';

export const CreateResponseModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [response, setResponse] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { addResponse } = useResponseStore();
  const { resume } = useResume();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newResponse: AIResponse = {
        id: crypto.randomUUID(),
        jobDescription: jobDescription || undefined,
        jobLink: jobLink,
        response: response,
        resumeId: selectedResumeId,
        createdAt: date?.toISOString() || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addResponse(newResponse);
      toast.success("Response created successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create response");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Response</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Job Description</label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter job description..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Job Link</label>
              <Input
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                placeholder="Enter job link"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Response</label>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Enter your response..."
                className="min-h-[200px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Created At</label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={date ? format(date, 'yyyy-MM-dd') : ''}
                  onClick={() => setDate(undefined)}
                  readOnly
                />
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Select Resume</label>
              <Select value={selectedResumeId} onValueChange={setSelectedResumeId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a resume" />
                </SelectTrigger>
                <SelectContent>
                  {resume && (
                    <SelectItem value={resume.id}>
                      {resume.title}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Response</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
