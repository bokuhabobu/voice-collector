/**
 * Cloudflare Worker for VoiceCollector - Direct R2 Uploader
 * 
 * - Handles CORS preflight and headers for any origin
 * - Streams uploaded ZIP binary directly to R2 bucket
 * - Extracts filename from 'x-filename' header or URL query parameter
 * - Returns clean JSON response
 */

export default {
  async fetch(request, env, ctx) {
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-filename, x-speaker, Authorization',
      'Access-Control-Max-Age': '86400',
    };

    // 1. Handle CORS Preflight (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    // 2. Health check (GET /)
    if (request.method === 'GET' || request.method === 'HEAD') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'VoiceCollector R2 Storage Worker',
          timestamp: new Date().toISOString(),
          r2Configured: !!env.RECORDINGS_BUCKET,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders,
          },
        }
      );
    }

    // 3. Handle Upload (PUT or POST)
    if (request.method === 'PUT' || request.method === 'POST') {
      // Check if R2 bucket binding exists
      if (!env.RECORDINGS_BUCKET) {
        return new Response(
          JSON.stringify({
            error: 'R2_NOT_CONFIGURED',
            message: 'RECORDINGS_BUCKET is not bound to this worker. Please bind your R2 bucket in Cloudflare Settings.',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              ...corsHeaders,
            },
          }
        );
      }

      try {
        // Resolve filename
        let filename = request.headers.get('x-filename');
        if (filename) {
          try {
            filename = decodeURIComponent(filename);
          } catch (e) {
            // Keep original if decoding fails
          }
        } else {
          filename = url.searchParams.get('filename');
        }

        // Default filename if not specified
        if (!filename) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          filename = `recording_${timestamp}.zip`;
        }

        // Clean filename (remove unsafe path traversal)
        filename = filename.replace(/^.*[\\\/]/, '');

        // Speaker metadata if provided
        const speaker = request.headers.get('x-speaker') || 'unknown';

        // Stream request body directly into R2
        const uploadedObject = await env.RECORDINGS_BUCKET.put(filename, request.body, {
          httpMetadata: {
            contentType: request.headers.get('content-type') || 'application/zip',
          },
          customMetadata: {
            uploadedAt: new Date().toISOString(),
            speaker: decodeURIComponent(speaker),
          },
        });

        return new Response(
          JSON.stringify({
            success: true,
            key: uploadedObject.key,
            size: uploadedObject.size,
            etag: uploadedObject.etag,
            uploadedAt: new Date().toISOString(),
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              ...corsHeaders,
            },
          }
        );
      } catch (err) {
        console.error('R2 upload error:', err);
        return new Response(
          JSON.stringify({
            error: 'UPLOAD_FAILED',
            message: err.message || 'Internal server error while saving to R2',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              ...corsHeaders,
            },
          }
        );
      }
    }

    // Method not allowed
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...corsHeaders,
      },
    });
  },
};
