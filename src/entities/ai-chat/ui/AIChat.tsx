"use client"
import ReactMarkdown from 'react-markdown';
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { useSettings } from "@/entities/settings/model/settingsStore";
import { useResume } from "@/entities/resume/model/resumeStore";
import { generateAIResponse } from "../service/aiChatService";
import { useState } from "react";
import {AutoResizeTextarea} from "@/shared/ui/autoResizeTextarea"
import { CopyToClipboardButton } from "@/shared/ui/buttonCopyToClipboard";

export const AIChat = () => {
  const { isOpen: isSettingsOpen, ollamaUrl, ollamaModel } = useSettings();
  const { resume } = useResume();

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [status, setStatus] = useState<'idle' | 'thinking' | 'streaming' | 'done'>('idle');  
  const [error, setError] = useState<string | null>(null);  

  const handleGenerate = async () => {
    if (!prompt || !resume) return;
  
    setResponse('');
    setError(null);
    setIsLoading(true);
    setStatus('thinking');
  
    try {
      await generateAIResponse(prompt, (chunk) => {
        setStatus('streaming');
        setResponse(prev => prev + chunk);
      });
  
      setStatus('done');
    } catch (err: any) {
      setError(err.message || 'Error');
      setStatus('done');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSettingsOpen) {
    return null; // Don't show if settings are open
  }

  return (
    <>
      <div className="flex h-screen pb-50">
          {/* Left Column - Question/Prompt */}
          <div className="w-1/2 p-4 flex flex-col gap-4">
              <div className="flex-1">
                  <div className="flex-column h-[100%]">
                      <Label htmlFor="prompt">Your Question</Label>
                      <AutoResizeTextarea 
                          value={prompt} 
                          onChange={(e) => setPrompt(e.target.value)}
                      />
                  </div>

                  {error && (
                      <div className="text-red-500 text-sm">
                          {error}
                      </div>
                  )}
              </div>

              <div className="flex justify-end gap-2">
                  <Button 
                      onClick={handleGenerate}
                      disabled={isLoading || !prompt}
                  >
                      {isLoading ? 'Generating...' : 'Generate'}
                  </Button>
              </div>
          </div>

          {/* Right Column - Response */}
          <div className="w-1/2 p-4 flex flex-col gap-4">
              <div className="flex-1">
                  {response && (
                    <div className="mt-4 p-4 rounded-lg">
                        <Label>AI Response</Label>
                        <div className="prose prose-sm max-w-none rounded-lg shadow-sm border h-full overflow-y-auto">
                            <ReactMarkdown>{response}</ReactMarkdown>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {status === 'thinking' && '🤔 Thinking...'}
                            {status === 'streaming' && '💬 Typing...'}
                            {status === 'done' && '✅ Success'}
                          </span>
                          <CopyToClipboardButton response={response} />
                        </div>
                        
                        <div className="flex justify-end mt-2">
                            <CopyToClipboardButton response={response} />
                        </div>
                    </div>
                  )}

                  {!response && status !== 'idle' && (
                    <div className="text-sm text-gray-500 mt-4">
                      {status === 'thinking' && 'AI thinking...'}
                      {status === 'streaming' && 'AI typing response...'}
                      {status === 'done' && 'Success.'}
                    </div>
                  )}
              </div>
          </div>
      </div>
    </>
  );
};
