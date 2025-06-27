import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useSettings } from "../model/settingsStore";

export const Settings = () => {
  const { ollamaUrl, ollamaModel, isOpen, toggleSettings, setOllamaUrl, setOllamaModel } = useSettings();
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = async () => {
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
  }, [isOpen, ollamaUrl]);

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
