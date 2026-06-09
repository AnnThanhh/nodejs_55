export const userSwagger = {
  "/user/avatar-local": {
    post: {
      tags: ["User"],
      //cho biết đây là api để làm gì
      summary: "Upload user avatar.",
      description: "Optional extended description in CommonMark or HTML.",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Avatar upload successful",
        },
        400: {
          description: "Bad request",
        },
      },
    },
  },
};
