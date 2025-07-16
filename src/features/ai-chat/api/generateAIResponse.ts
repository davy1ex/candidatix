import { useSettings } from '@/features/settings';
import {Resume} from "@/entities/resume";

type OnChunkCallback = (chunk: string) => void;

export const generateAIResponse = async (
    prompt: string,
    systemPrompt: string,
    exampleShot?: string,
    resume: Resume,
    onChunk: OnChunkCallback,
    provider: 'ollama' | 'gemini',
    signal: AbortSignal 
) => {
  console.log(provider)
  if (provider === 'ollama') {
    return generateAIResponseOllama(prompt, systemPrompt, exampleShot, resume, onChunk, signal);
  }
  if (provider === 'gemini') {
    return generateAIResponseGemini(prompt, resume, onChunk);
  }
  throw new Error('Unknown LLM provider');
};

export const generateAIResponseOllama = async (
  prompt: string, 
  systemPrompt: string, 
  exampleShot: string, 
  resume: Resume, 
  onChunk: OnChunkCallback,
  signal: AbortSignal
) => {
  const { ollamaUrl, ollamaModel } = useSettings.getState();

  if (!ollamaUrl || !ollamaModel || !resume) {
    throw new Error('AI settings or resume not configured');
  }

  const response = await fetch(`/api/ollama/generate?ollamaUrl=${ollamaUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: ollamaModel,
      messages: [
        {
          role: "system",
          content:
            `${systemPrompt}. Используй как пример текста для вайба это: ${exampleShot}`
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
    signal
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
      } catch {
        // ignore parse errors
      }
    }
  }
};

export const generateAIResponseGemini = async (prompt: string, resume: Resume, onChunk: OnChunkCallback) => {
  const { geminiKey, geminiUrl } = useSettings.getState();

  if (!geminiKey || !geminiUrl || !resume) {
    throw new Error('AI settings or resume not configured');
  }

  const contents = [
    {
      parts: [
        {
          text:
              `Ты — AI, помогающий составлять отклики на вакансии. Используй резюме кандидата, чтобы составить персонализированный текст. Не придумывай информацию, которой нет в резюме.\n` +
              `Резюме кандидата:\nTitle: ${resume.title}\n\nОпыт работы:\n${resume.workExperience}\n\n` +
              `Пользователь: ${prompt}`,
        },
      ],
    },
  ];

  const response = await fetch(`/api/gemini/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-2.0-flash',
      prompt: `Ты — AI, помогающий составлять отклики на вакансии. Используй резюме кандидата, чтобы составить персонализированный текст. Не придумывай информацию, которой нет в резюме.\n` +
          `Резюме кандидата:\nTitle: ${resume.title}\n\nОпыт работы:\n${resume.workExperience}\n\n` +
          `Пользователь: ${prompt}`
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch AI response: ${response.statusText}`);
  }
  const text = await response.text()
  console.log("FROM AI", text);
  onChunk(text)
};
