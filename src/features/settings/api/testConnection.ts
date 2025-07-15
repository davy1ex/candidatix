interface TestConnection {
    model: string;
    setIsTesting: (isTesting: boolean) => void;
    setConnectionStatus: (connectionStatus: string) => void;
}

export const testOllamaConnection = async ({
    model,
    setIsTesting,
    setConnectionStatus,
}: TestConnection) => {
    setIsTesting(true);
    try {
        setConnectionStatus('')
        const response = await fetch('/api/ollama/ollama-test');

        if (!response.ok) {
            throw new Error('Failed to connect to Ollama');
        }

        const data = await response.json();
        const availableModels = data.models.map((model) => model.name);

        console.log("DATA", availableModels)
        console.log("ollamaModel on client:", model)

        if (availableModels?.includes(model)) {
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

// TODO: testGeminiConnection