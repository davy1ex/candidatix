export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, messages, stream = false } = body;

    const ollamaHost = process.env.OLLAMA_HOST || 'http://172.22.208.1:11434';

    const response = await fetch(`${ollamaHost}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages, stream }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama Error:", errorText);
      return new Response(errorText, { status: response.status });
    }

    console.log("API generate: streaming?", stream);
    console.log("Response headers:", response.headers.get("Content-Type"));

    if (stream && response.body) {
    return new Response(response.body, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
      },
    });
  }

    const result = await response.json();
    return Response.json(result);

  } catch (err: any) {
    console.error("API /ollama/generate error:", err);
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}