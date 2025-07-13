import axios from "axios"
import { NextRequest, NextResponse } from 'next/server';
// import HttpsProxyAgent from 'https-proxy-agent'; // TODO: add http proxy

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt, model = 'gemini-2.0-flash'} = body;

        const apiKey = process.env.GEMINI_API_KEY;
        const geminiUrlBase = process.env.GEMINI_URL || 'https://generativelanguage.googleapis.com/v1beta/models'; //  TODO: add select models
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

        // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        //
        // const fetchOptions: RequestInit = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-goog-api-key': apiKey
        //     },
        //     body: JSON.stringify({
        //         contents: [
        //             {
        //                 parts: [
        //                     {
        //                         text: prompt,
        //                     },
        //                 ],
        //             },
        //         ],
        //     }),
        // };
        //
        // // if (proxyUrl) {
        // //     fetchOptions.agent = new HttpsProxyAgent(proxyUrl);
        // // }
        //
        // const fetchResponse = await fetch(url, fetchOptions);

        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
        const fetchResponse = await axios('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            data: {
                model: 'qwen/qwen3-235b-a22b:free',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    },
                ],
            },
        });

        console.log(fetchResponse)
        console.log('_________________')
        console.log(fetchResponse.data)
        console.log(fetchResponse.data.choices[0].message)


        if (!fetchResponse.status == 200) {
            const errorText = fetchResponse.statusText;
            console.error('Gemini API error:', errorText);
            return NextResponse.json({ error: errorText });
        }

        // if (stream && fetchResponse.body) {
        //     return new Response(fetchResponse.body, {
        //         headers: {
        //             'Content-Type': fetchResponse.headers.get('Content-Type') || 'application/json',
        //             'Transfer-Encoding': 'chunked',
        //         },
        //     });
        // } // TODO: Refactor stream logic for gemini

        const result = await fetchResponse.data;
        return NextResponse.json(result.choices[0].message.content);
    } catch (error: any) {
        console.error('API /gemini/generate error:', error);
        return NextResponse.json(
            { error: error.message || 'Unknown error' },
            { status: 500 }
        );
    }
}
