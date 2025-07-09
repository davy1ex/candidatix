import {useSettings} from "@/features/settings";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";

export const OllamaSettingsForm = () => {
    const {
        ollamaUrl,
        setOllamaUrl,
        ollamaModel,
        setOllamaModel
    } = useSettings()

    return (
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
    )
}