export const swaggerDocument = {
  openapi: "3.0.4",
  info: {
    title: "ExpressJS API Nodejs 55",
    description:
      "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    version: "0.1.1",
  },
  servers: [
    {
      url: "http://localhost:3069/api",
      description: "Local dev server",
    },
    {
      url: "http://staging-api.example.com",
      description:
        "Optional server description, e.g. Internal staging server for testing",
    },
    {
      url: "http://staging-api.example.com",
      description:
        "Optional server description, e.g. Internal staging server for testing",
    },
  ],
  paths: {
    "/article": {
      get: {
        tags: ["Article"],
        //cho biết đây là api để làm gì
        summary: "Returns a list of articles.",
        description: "Optional extended description in CommonMark or HTML.",
        responses: {
          200: {
            description: "A JSON array of article titles",
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
  },
};
