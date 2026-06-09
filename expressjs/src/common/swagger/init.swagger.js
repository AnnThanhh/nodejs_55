import { articleSwagger } from "./article.swagger.js";
import { authSwagger } from "./auth.swagger.js";
import { userSwagger } from "./user.swagger.js";

export const swaggerDocument = {
  openapi: "3.0.4",
  info: {
    title: "ExpressJS API Nodejs 55",
    description:
      "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    version: "0.1.1",
  },
  //dành cho dự án có authen từ header
  // components: {
  //   securitySchemes: {
  //     bearerAuth: {
  //       type: "http",
  //       scheme: "bearer",
  //       bearerFormat: "JWT",
  //     },
  //   },
  // },
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
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
    ...articleSwagger,
    ...authSwagger,
    ...userSwagger,
  },
};
