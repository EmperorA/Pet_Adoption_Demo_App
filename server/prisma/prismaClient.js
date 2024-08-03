//ORM connexion
//Initialize ORM instance
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["warn", "error"],
  errorFormat: "minimal",
});

module.exports = {
  prisma,
};
