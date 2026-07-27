const http = require('http');
const https = require('https');

exports.handler = async (event, context) => {
  /* Handle CORS */
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  const streamType = (event.queryStringParameters && event.queryStringParameters.type) || 'music';

  /* Map stream types to LWB stream URLs or fallback HTTPS sermon streams */
  const streamUrls = {
    music: 'http://stream.lwbcast.org:8000/stream.mp3',
    sermon: 'http://stream.lwbcast.org:8000/sermon.mp3',
    healing: 'http://stream.lwbcast.org:8000/healing.mp3'
  };

  const targetUrl = streamUrls[streamType] || streamUrls.music;

  try {
    const audioBuffer = await new Promise((resolve, reject) => {
      const req = http.get(targetUrl, { timeout: 4000 }, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        } else {
          reject(new Error(`Stream HTTP ${res.statusCode}`));
        }
      });
      req.on('error', (err) => reject(err));
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Stream request timeout'));
      });
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: audioBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    console.warn('LWB stream proxy failed, serving HTTPS sermon audio stream fallback:', err.message);
    
    /* HTTPS Fallback: High-quality sermon audio stream from Voice of God Recordings CDN */
    return {
      statusCode: 302,
      headers: {
        'Location': 'https://branham.org/azure/branham/65-1212.m4a',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
