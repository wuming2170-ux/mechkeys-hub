export default {
  async fetch(request) {
    const url = new URL(request.url);
    const src = url.searchParams.get('src');
    if (!src) return new Response('Missing ?src=', { status: 400 });
    try {
      const r = await fetch(src, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://www.1688.com/',
        }
      });
      const blob = await r.blob();
      return new Response(blob, {
        headers: {
          'Content-Type': r.headers.get('Content-Type') || 'image/jpeg',
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
        }
      });
    } catch(e) {
      return new Response('Error: ' + e.message, { status: 500 });
    }
  }
};
