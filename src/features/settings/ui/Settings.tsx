'use client'
import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useSettings } from "../model/settingsStore";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select";

export const Settings = () => {
  const { 
    geminiUrl,
    setGeminiUrl,
    geminiKey,
    setGeminiKey,

    ollamaUrl, 
    setOllamaUrl, 
    ollamaModel, 
    setOllamaModel ,
    
    isOpen, 
    toggleSettings, 
  } = useSettings();

  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [LLMProvider, setLLMProvider] = useState("ollama")
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = async () => {
    if (LLMProvider == "gemini") {
      return // TODO: make here also checking correctly connection 
    }
    
    setIsTesting(true);
    try {
      const response = await fetch('/api/ollama/ollama-test');
      
      if (!response.ok) {
        throw new Error('Failed to connect to Ollama');
      }
      
      const data = await response.json();
      const availableModels = data.models.map((model) => model.name);

      console.log("DATA", availableModels)
      console.log("ollamaModel on client:", ollamaModel)

      if (availableModels?.includes(ollamaModel)) {
        setConnectionStatus('✅ Connection successful! Model available.');
      } else {
        setConnectionStatus('⚠️ Connection successful, but model not found.');
      }
    } catch (error) {
      setConnectionStatus('❌ Failed to connect to Ollama: ' + error.message);
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    if (isOpen && ollamaUrl) {
      testConnection();
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
                  <div className="grid gap-2">

                    <Label htmlFor="ollama-url">Ollama URL</Label>
                    <Input
                      id="ollama-url"
                      value={ollamaUrl}
                      onChange={(e) => setOllamaUrl(e.target.value)}
                      placeholder="http://10.0.75.1:11434"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ollama-model">Ollama Model</Label>
                    <Input
                      id="ollama-model"
                      value={ollamaModel}
                      onChange={(e) => setOllamaModel(e.target.value)}
                      placeholder="llama2"
                    />
                  </div>
                </>
              )}

              {LLMProvider == "gemini" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="ollama-url">Gemini URL</Label>
                    <Input
                      id="ollama-url"
                      value={geminiUrl}
                      onChange={(e) => setGeminiUrl(e.target.value)}
                      placeholder="Gemini url"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="gemini-key">Gemini URL</Label>
                    <Input
                      id="gemini-key"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder="Gemini url"
                    />
                  </div>

                  {/* <div className="grid gap-2">  // TODO: add selecting Gemini model
                    <Label htmlFor="ollama-model">Gemini Model</Label>
                    <Input
                      id="ollama-model"
                      value={ollamaModel}
                      onChange={(e) => setOllamaModel(e.target.value)}
                      placeholder="llama2"
                    />
                  </div> */}
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
