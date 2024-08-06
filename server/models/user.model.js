const { prisma } = require("../prisma/prismaClient");
const bcrypt = require("bcrypt");

async function createUser(username, email, password, role) {
  if (!username || !email || !password || !role) {
    return {
      error: "Missing required properties.",
    };
  }

  const hash = bcrypt.hashSync(password, 10);
  if (hash) {
    try {
      const userRegistration = await prisma.user.create({
        data: {
          username: username,
          email: email,
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
        return { error: "username or email already exists." };
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
      username: true,
      email: true,
      id: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("Incorrect email or password.");
  }

  const hashCompare = bcrypt.compareSync(password, user.password);
  if (hashCompare) {
    return user;
  } else {
    throw new Error("Incorrect email or password.");
  }
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      role: true,
    },
  });
}

async function findUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
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
      email: query.email ? query.email : { not: "" },
      id: query.id ? query.id : { not: "" },
      role: query.role ? query.role : { not: "" },
    },
    select: {
      id: true,
      username: true,
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
