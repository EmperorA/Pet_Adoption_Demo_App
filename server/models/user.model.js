const { prisma } = require("../prisma/prismaClient");
const bcrypt = require("bcrypt");

async function createUser(username, password, role) {
  if (!username || !password || !role) {
    return {
      error: "Missing required properties.",
    };
  }

  const hash = bcrypt.hashSync(password, 10);
  if (hash) {
    try {
      console.log("...............");
      const userRegistration = await prisma.user.create({
        data: {
          email: username,
          password: hash,
          role: role,
        },
      });
      return {
        message: "Registration successful. User has been created",
        user: userRegistration,
      };
    } catch (err) {
      if (err.name === "PrismaClientValidationError") {
        return {
          error:
            "Provided input parameters or type of input parameters is invalid.",
        };
      } else if (err.code === "P2002") {
        return { error: "Username already exists." };
      }
      return { error: err.message };
    }
  }
}

async function verifyPassword(email, password) {
  if (!email || !password) {
    throw new Error("Missing required properties.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      password: true,
      email: true,
      id: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("Incorrect username or password.");
  }

  const hashCompare = bcrypt.compareSync(password, user.password);
  if (hashCompare) {
    return user;
  } else {
    throw new Error("Incorrect username or password.");
  }
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
    select: { id: true, email: true, password: true, role: true },
  });
}

async function findUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

async function searchUser(query) {
  const allUsers = await prisma.user.findMany({
    where: {
      email: query.username ? query.username : { not: "" },
      id: query.id ? query.id : { not: "" },
      role: query.role ? query.role : { not: "" },
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
  return allUsers;
}

module.exports = {
  createUser,
  verifyPassword,
  findUserById,
  findUserByEmail,
  searchUser,
};
