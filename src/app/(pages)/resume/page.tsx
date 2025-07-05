"use client"
import { Button } from '@/shared/ui/button';
import { useResume } from '@/entities/resume';
import { useEffect, useState } from 'react';

export default function ResumePage() {
  const { resume, updateTitle, updateWorkExperience, undoChanges } = useResume();
  const [title, setTitle] = useState('');
  const [workExperience, setWorkExperience] = useState('');

  useEffect(() => {
    if (resume) {
      setTitle(resume.title);
      setWorkExperience(resume.workExperience);
    }
  }, [resume]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    updateTitle(value);
    console.log("FROM PAGE title", value)
  };

  const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setWorkExperience(value);
    updateWorkExperience(value);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Resume edit</h1>
          <p className="text-gray-600">All changes saving automaticaly</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Resume title</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="w-full p-2 border rounded-md resize-none"
              placeholder="For ex.: Frontend-developer React"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Work experience</label>
            <textarea
              value={workExperience}
              onChange={handleWorkExperienceChange}
              className="w-full p-2 border rounded-md"
              rows={8}
              placeholder="Input work experience from past works"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={undoChanges}
            className="!bg-white !text-gray-600 hover:!bg-gray-100"
          >
            Ctrl+Z (Undo)
          </Button>
        </div>
      </div>
    </div>
  );
}
