import { useState, useEffect } from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {OllamaSettingsForm} from "@/features/settings/ui/OllamaSettingsForm";
import {GeminiSettingsForm} from "@/features/settings/ui/GeminiSettingsForm";
import {Button} from "@/shared/ui/button";
import {useSettings} from "../../model/settingsStore";
import {testOllamaConnection} from "@/features/settings/api/testConnection";

export const SettingsLLMProviderTab = () => {
    const {
        ollamaUrl,
        ollamaModel,
        isOpen
    } = useSettings();

    const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
    const [LLMProvider, setLLMProvider] = useState("ollama")
    const [isTesting, setIsTesting] = useState(false);

    useEffect(() => {
        if (isOpen && LLMProvider == 'ollama') {
            testOllamaConnection({model: ollamaModel, setIsTesting, setConnectionStatus});
        }

        if (LLMProvider != 'ollama') {
            setIsTesting(false); // TODO: add cancel testing ollama feature here
        }
    }, [isOpen, ollamaUrl, LLMProvider]); // TODO: add check connection also for remote LLM (gemini)

    const handleTestConnection = () => {
        if (LLMProvider === 'ollama') {
            testOllamaConnection({
                model: ollamaModel,
                setIsTesting,
                setConnectionStatus,
            });
        }
    }

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Select value={LLMProvider} onValueChange={setLLMProvider}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
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
                    onClick={handleTestConnection}
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
    )
}