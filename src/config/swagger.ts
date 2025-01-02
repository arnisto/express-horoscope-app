const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Horoscope API",
      version: "1.0.0",
      description: "API for retrieving zodiac signs based on birthdate.",
      contact: {
        name: "LGA",
        email: "lga@softgen.fr",
      },
    },
    servers: [
      {
        url: "https://express-horoscope-app.onrender.com",
        description: "Local Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc({
  definition: options.definition,
  apis: options.apis,
  failOnErrors: false,
  encoding: "utf8",
  verbose: false,
  format: "yaml",
  swaggerDefinition: options.definition,
});

export default swaggerSpec;
