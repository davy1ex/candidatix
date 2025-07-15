export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ollamaUrl = searchParams.get("ollamaUrl");

    const res = await fetch(`${ollamaUrl}/api/tags`, { // TODO: make all urls as vars from store
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
});

const text = await res.text(); // Ollama root just returns plain text
    return new Response(text, {
        status: res.status,
        headers: {
        'Content-Type': 'text/plain',
        },
    });
}