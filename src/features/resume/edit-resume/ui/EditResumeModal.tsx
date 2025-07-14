"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { type Resume, useResume } from '@/entities/resume';
import { toast } from "sonner";
import {useDeleteResume} from "@/features/resume/delete-resume";

interface EditResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resume: Resume | null;
}

export const EditResumeModal = ({ open, onOpenChange, resume }: EditResumeModalProps) => {
  const [title, setTitle] = useState(resume?.title || '');
  const [skills, setSkills] = useState(resume?.skillsTag?.join(', ') || '');
  const [workExperience, setWorkExperience] = useState(resume?.workExperience || '');
  const [experienceYears, setExperienceYears] = useState(resume?.experienceYears?.toString() || '');
  const { updateTitle, updateWorkExperience, setResume } = useResume();
  const deleteResume = useDeleteResume();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!resume) return;

      const updatedResume = {
        ...resume,
        title,
        skillsTag: skills.split(',').map(skill => skill.trim()),
        workExperience,
        experienceYears: parseInt(experienceYears),
        updatedAt: new Date().toISOString()
      };

      setResume(updatedResume);
      toast.success("Resume updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update resume");
    }
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Resume</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Button onClick={async () => await deleteResume(resume.id)}>Delete Resume</Button>
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
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
};
