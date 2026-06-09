export const authSwagger = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      //cho biết đây là api để làm gì
      summary: "Login to the application.",
      description: "Optional extended description in CommonMark or HTML.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "example@gmail.com",
                },
                password: {
                  type: "string",
                  example: "Example@123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
        },
        400: {
          description: "Bad request",
        },
      },
    },
  },
  "/auth/get-info": {
    get: {
      tags: ["Auth"],
      //cho biết đây là api để làm gì
      summary: "Returns details of a specific user.",
      description: "Optional extended description in CommonMark or HTML.",
      responses: {
        200: {
          description: "Details of a specific user",
        },
      },
    },
  },
};
