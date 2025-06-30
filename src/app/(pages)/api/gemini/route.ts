import { NextRequest, NextResponse } from 'next/server';
import HttpsProxyAgent from 'https-proxy-agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { model = 'gemini-2.0-flash', contents, stream = false } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }

    // proxy — IP Windows (im develop from wsl) TODO: select proxy 
    const proxyUrl = process.env.PROXY_URL || 'http://172.27.208.1:2080';
    const agent = new HttpsProxyAgent(proxyUrl);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const fetchResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
      agent,
    });

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text();
      console.error('Gemini API error:', errorText);
      return NextResponse.json({ error: errorText }, { status: fetchResponse.status });
    }

    if (stream && fetchResponse.body) {
      // Пробрасываем поток напрямую
      return new Response(fetchResponse.body, {
        headers: {
          'Content-Type': fetchResponse.headers.get('Content-Type') || 'application/json',
          'Transfer-Encoding': 'chunked',
        },
      });
    }

    const result = await fetchResponse.json();
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('API /gemini/generate error:', error);
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
