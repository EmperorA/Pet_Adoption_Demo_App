
// Just for Testing
// This file will be DELETED later

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getUsers() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.listing.findMany()
  console.log(allUsers)
}


getUsers()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })