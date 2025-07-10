import {useSettings} from "@/features/settings";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";

export const SettingsProxyTab = () => {
    const {
        proxyUrl,
        setProxyUrl
    } = useSettings()

    return (
        <>
            <div className="grid gap-2">

                <Label htmlFor="ollama-url">Your proxy URL</Label>
                <Input
                    id="ollama-url"
                    value={proxyUrl}
                    onChange={(e) => setProxyUrl(e.target.value)}
                    placeholder="http://10.0.75.1:11434"
                />
            </div>
        </>
    )
}