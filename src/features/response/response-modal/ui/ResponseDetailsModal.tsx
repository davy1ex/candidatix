"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Input } from "@/shared/ui/input";
import { AIResponse } from "../../rensponse/model/types";

interface ResponseDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  response: AIResponse | null;
}

export const ResponseDetailsModal = ({ open, onOpenChange, response }: ResponseDetailsModalProps) => {
  if (!response) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Response Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <Textarea
              value={response.jobDescription || ''}
              readOnly
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Response</label>
            <Textarea
              value={response.response}
              readOnly
              className="min-h-[200px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job Link</label>
            <Input
              value={response.jobLink}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Created At</label>
            <Input
              value={new Date(response.createdAt).toLocaleDateString()}
              readOnly
            />
          </div>

          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
