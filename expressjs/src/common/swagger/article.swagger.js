export const articleSwagger = {
  "/article": {
    get: {
      tags: ["Article"],
      //cho biết đây là api để làm gì
      summary: "Returns a list of articles.",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          in: "query",
          name: "pageSize",
          schema: {
            type: "integer",
            example: 10,
          },
        },
      ],
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
  "/article/{id}": {
    get: {
      tags: ["Article"],
      //cho biết đây là api để làm gì
      summary: "Returns details of a specific article.",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],
      responses: {
        200: {
          description: "Details of a specific article",
        },
      },
    },
  },
};
