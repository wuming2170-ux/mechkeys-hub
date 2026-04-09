export default {
  async fetch(request) {
    const url = new URL(request.url);
    const src = url.searchParams.get('src');
    
    if (!src) {
      return new Response('Missing ?src= parameter', { status: 400 });
    }
    
    try {
      const fetchResponse = await fetch(src, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Referer': 'https://www.1688.com/',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        }
      });
      
      if (!fetchResponse.ok) {
        return new Response('Failed to fetch image', { status: 502 });
      }
      
      const blob = await fetchResponse.blob();
      const contentType = fetchResponse.headers.get('Content-Type') || 'image/jpeg';
      
      return new Response(blob, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        }
      });
    } catch (err) {
      return new Response('Proxy error: ' + err.message, { status: 500 });
    }
  }
};
