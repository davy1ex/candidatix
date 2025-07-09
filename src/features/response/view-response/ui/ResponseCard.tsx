import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { format } from 'date-fns';
import { AIResponse } from '@/entities/rensponse/model/types';

interface ResponseCardProps {
  response: AIResponse;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponseCard = ({ response, isOpen, onOpenChange }: ResponseCardProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Response Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Date</h3>
            <p className="text-sm text-gray-600">
              {format(new Date(response.createdAt), 'MMM d, yyyy HH:mm')}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Job Description</h3>
            <p className="text-sm text-gray-600">
              {response.jobDescription || 'No job description provided'}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Response</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {response.response}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Job Link</h3>
            <a
              href={response.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {response.jobLink}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};