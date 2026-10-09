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
          summary: "List sermons catalogue with pagination and filters",
          operationId: "getMessages",
          parameters: [
            { name: "language", in: "query", schema: { type: "string", default: "en", example: "nya" } },
            { name: "year", in: "query", schema: { type: "string", example: "1965" } },
            { name: "date", in: "query", schema: { type: "string", example: "1965-07-18" } },
            { name: "limit", in: "query", schema: { type: "integer", default: 50 } },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } }
          ],
          responses: {
            "200": { description: "List of sermon summary records" }
          }
        }
      },
      "/api/search": {
        get: {
          summary: "Full-text phrase and date search across sermons",
          operationId: "searchSermons",
          parameters: [
            { name: "q", in: "query", schema: { type: "string", example: "seven seals" } },
            { name: "date", in: "query", schema: { type: "string", example: "1965-07-18" } },
            { name: "year", in: "query", schema: { type: "string", example: "1965" } },
            { name: "language", in: "query", schema: { type: "string", example: "nya" } },
            { name: "limit", in: "query", schema: { type: "integer", default: 50 } },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } }
          ],
          responses: {
            "200": { description: "Search results with relevance scoring and match snippets" }
          }
        }
      },
      "/api/messages/{id}/text": {
        get: {
          summary: "Get full paragraph transcript for a sermon",
          operationId: "getSermonText",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string", example: "65-0718M" } },
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
