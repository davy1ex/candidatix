import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://google.com', { method: 'HEAD', cache:"no-store" });
        console.log(await res.json())
        return NextResponse.json({ status: res.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
