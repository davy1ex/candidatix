import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {useSettings} from "@/features/settings";

export const GeminiSettingsForm = () => {
    const {
        geminiUrl,
        setGeminiUrl,
        geminiKey,
        setGeminiKey
    } = useSettings()
    return (
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
    )
}