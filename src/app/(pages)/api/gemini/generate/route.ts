import { NextRequest, NextResponse } from 'next/server';
// import HttpsProxyAgent from 'https-proxy-agent'; // TODO: add http proxy

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt, model = 'gemini-2.0-flash'} = body;

        const apiKey = process.env.GEMINI_API_KEY;
        const geminiUrlBase = process.env.GEMINI_URL || 'https://generativelanguage.googleapis.com/v1beta/models';
        // const proxyUrl = process.env.PROXY_URL;

        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
        }

        if (!prompt) {
            return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
        }

        const contents = [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ];

        const url = `${geminiUrlBase}/${model}:generateContent?key=${apiKey}`;

        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contents }),
        };

        // if (proxyUrl) {
        //     fetchOptions.agent = new HttpsProxyAgent(proxyUrl);
        // }

        const fetchResponse = await fetch(url, fetchOptions);

        if (!fetchResponse.ok) {
            const errorText = await fetchResponse.text();
            console.error('Gemini API error:', errorText);
            return NextResponse.json({ error: errorText }, { status: fetchResponse.status });
        }

        // if (stream && fetchResponse.body) {
        //     return new Response(fetchResponse.body, {
        //         headers: {
        //             'Content-Type': fetchResponse.headers.get('Content-Type') || 'application/json',
        //             'Transfer-Encoding': 'chunked',
        //         },
        //     });
        // } // TODO: Refactor stream logic for gemini

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
