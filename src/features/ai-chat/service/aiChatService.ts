import { useSettings } from '@/features/settings/model/settingsStore'; // TODO: make requirements by correct way
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







export const generateAIResponseGemini = async (prompt: string, onChunk: OnChunkCallback) => {
  const { geminiKey, geminiUrl } = useSettings.getState();
  const { resume } = useResume.getState();

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
            `Пользователь: ${prompt}`
        }
      ]
    }
  ];

  const response = await fetch(`/api/gemini/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gemini-2.0-flash',
      contents,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch AI response: ${response.statusText}`);
  }

  const json = await response.json();

  const candidate = json.candidates?.[0];
  if (!candidate || !candidate.content?.parts) {
    throw new Error('Invalid response from Gemini API');
  }

  const fullText = candidate.content.parts.map((p: { text: string }) => p.text).join('');

  const sentences = fullText.split(/(?<=[.!?])\s+/);

  for (const sentence of sentences) {
    onChunk(sentence + ' ');
  }
};
