"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useResume } from '../model/resumeStore';
import { toast } from "sonner";

export const CreateResumeModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const { createResume } = useResume();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newResume = {
        title,
        skillsTag: skills.split(',').map(skill => skill.trim()),
        workExperience,
        experienceYears: parseInt(experienceYears),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await createResume(newResume);
      toast.success("Resume created successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create resume");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Skills (comma-separated)</label>
              <Input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., React, Node.js, Python"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Work Experience</label>
              <Textarea
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                placeholder="Enter your work experience..."
                className="min-h-[200px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Years of Experience</label>
              <Input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                placeholder="Enter years of experience"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Resume</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};