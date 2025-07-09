'use client'
import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { useSettings } from "../model/settingsStore";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select";
import {OllamaSettingsForm} from "./OllamaSettingsForm";
import {GeminiSettingsForm} from "./GeminiSettingsForm";
import {testOllamaConnection} from "../api/testConnection"

export const Settings = () => {
  const {
    ollamaUrl,
    ollamaModel,

    isOpen, 
    toggleSettings, 
  } = useSettings();

  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [LLMProvider, setLLMProvider] = useState("ollama")
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isOpen && ollamaUrl) {
      testOllamaConnection({model: ollamaModel, setIsTesting, setConnectionStatus});
    }
  }, [isOpen, ollamaUrl]); // TODO: add check connection also for remote LLM (gemini)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleSettings}
        className="h-8"
      >
        Settings
      </Button>

      <Dialog open={isOpen} onOpenChange={toggleSettings}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>AI Provider Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Select value={LLMProvider} onValueChange={setLLMProvider}>
                <SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"ollama"}>
                      Ollama
                    </SelectItem>

                    <SelectItem value={"gemini"}>
                      Gemini
                    </SelectItem>
                  </SelectContent>
                </SelectTrigger>
              </Select>
              
              {LLMProvider == "ollama" && (
                <>
                  <OllamaSettingsForm />
                </>
              )}

              {LLMProvider == "gemini" && (
                <>
                  <GeminiSettingsForm />
                </>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={testConnection}
                disabled={isTesting}
              >
                {isTesting ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>
            {connectionStatus && (
              <div className="text-sm text-gray-600 mt-2">
                {connectionStatus}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
