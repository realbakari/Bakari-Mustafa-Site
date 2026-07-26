const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8'
};

exports.handler = async (event, context) => {
  const spec = {
    openapi: "3.0.3",
    info: {
      title: "The Message Sermon Archive REST API",
      description: "Public machine-readable JSON REST API for William Branham sermons across 72 global languages.",
      version: "1.0.0",
      contact: {
        name: "Bakari Mustafa",
        url: "https://bakarimustafa.com/api-docs/"
      }
    },
    servers: [
      {
        url: "https://bakarimustafa.com",
        description: "Live Production API Server"
      }
    ],
    paths: {
      "/api/stats": {
        get: {
          summary: "Get database metrics and language statistics",
          operationId: "getStats",
          responses: {
            "200": { description: "Database metrics object" }
          }
        }
      },
      "/api/languages": {
        get: {
          summary: "List all 72 global languages",
          operationId: "getLanguages",
          responses: {
            "200": { description: "List of supported global languages" }
          }
        }
      },
      "/api/messages": {
        get: {
          summary: "List and search sermons catalogue",
          operationId: "getMessages",
          parameters: [
            { name: "language", in: "query", schema: { type: "string", default: "en" } },
            { name: "year", in: "query", schema: { type: "string" } },
            { name: "limit", in: "query", schema: { type: "integer", default: 50 } }
          ],
          responses: {
            "200": { description: "List of sermon records" }
          }
        }
      },
      "/api/messages/{id}/text": {
        get: {
          summary: "Get full paragraph transcript for a sermon",
          operationId: "getSermonText",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string", example: "64-0112" } },
            { name: "language", in: "query", schema: { type: "string", default: "en" } }
          ],
          responses: {
            "200": { description: "Full paragraph blocks transcript" }
          }
        }
      }
    }
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(spec, null, 2)
  };
};
