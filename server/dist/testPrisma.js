"use strict";
// Just for Testing
// This file will be DELETED later
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getUsers() {
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.listing.findMany();
    console.log(allUsers);
}
getUsers()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
