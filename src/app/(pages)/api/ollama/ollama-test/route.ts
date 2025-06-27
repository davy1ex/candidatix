export async function GET() {
    const res = await fetch('http://172.22.208.1:11434/api/tags', { // TODO: make all urls as vars from store
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