import { useSettings } from '@/entities/settings/model/settingsStore'; // TODO: make requirements by correct way
import { useResume } from '@/entities/resume/model/resumeStore'; // TODO: make requirements by correct way

type OnChunkCallback = (chunk: string) => void;

export const generateAIResponse = async (prompt: string, onChunk: OnChunkCallback) => {
  const { ollamaUrl, ollamaModel } = useSettings.getState();
  const { resume } = useResume.getState();

  if (!ollamaUrl || !ollamaModel || !resume) {
    throw new Error('AI settings or resume not configured');
  }

  const response = await fetch(`/api/ollama/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: ollamaModel,
      messages: [
        {
          role: "system",
          content:
            "Ты — AI, помогающий составлять отклики на вакансии. Используй резюме кандидата, чтобы составить персонализированный текст. Не придумывай информацию, которой нет в резюме.", // TODO: make here selecting lang by users settings
        },
        {
          role: "assistant",
          content: `Резюме кандидата:\nTitle: ${resume.title}\n\nОпыт работы:\n${resume.workExperience}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Failed to fetch AI response: ${response.statusText}`);
  }
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let previousText = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || ''; 

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('{')) continue; 

      try {
        const parsed = JSON.parse(trimmed);
        const fullText = parsed.message?.content || '';
        if (parsed.done) return;

        if (fullText.startsWith(previousText)) {
          const delta = fullText.slice(previousText.length);
          previousText = fullText;
          if (delta) onChunk(delta);
        } else {
          previousText = fullText;
          onChunk(fullText);
        }
      } catch (err) {
        continue;
      }
    }
  }
};
