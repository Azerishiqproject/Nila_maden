export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('https://finans.truncgil.com/today.json', {
      // Ensure no caching at edge and fetch fresh data frequently
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Upstream fetch failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Allow browser usage from same origin
        'Cache-Control': 'no-store',
      },
    });
  } catch  {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


