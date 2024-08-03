const { application } = require("express");
const { prisma } = require("../prisma/prismaClient");

async function newApplication(application) {
  //Check required properties

  if (
    !application.listingId ||
    !application.form ||
    !application.userId ||
    application.hasDocuments === undefined ||
    !application.status
  ) {
    return {
      error: "Missing required properties.",
    };
  }
  try {
    const newApplication = await prisma.application.create({
      data: {
        id: application.id,
        listingId: application.listingId,
        form: application.form,
        userId: application.userId,
        hasDocuments: application.hasDocuments,
        status: application.status,
      },
    });
    return {
      message: "New application has been created with id: " + newApplication.id,
    };
  } catch (err) {
    if (err.name === "PrismaClientValidationError") {
      return {
        error:
          "Provided input parameters or type of input parameters is invalid.",
      };
    }
    return { error: err.message };
  }
}

async function findApplicationById(id) {
  try {
    const application = await prisma.application.findUnique({
      where: {
        id: id,
      },
    });
    return application;
  } catch (err) {
    return { error: err.message };
  }
}

async function searchApplication(query) {
  try {
    const search = await prisma.application.findMany({
      skip: query.page
        ? Number(query.page - 1) * query.pageSize
        : query.PageSize,
      take: query.pageSize ? Number(query.pageSize) : 5,
      where: {
        status: query.status ? query.status.toLowerCase() : { not: "" },
        userId: query.userId ? query.userId.toLowerCase() : { not: "" },
        listingId: query.listingId
          ? query.listingId.toLowerCase()
          : { not: "" },
      },
    });
    //Used for pagination totalItems
    const results = await prisma.application.count({
      where: {
        status: query.status ? query.status.toLowerCase() : { not: "" },
        userId: query.userId ? query.userId.toLowerCase() : { not: "" },
        listingId: query.listingId
          ? query.listingId.toLowerCase()
          : { not: "" },
      },
    });
    console.log(results);
    return {
      totalItems: results,
      pageSize: query.pageSize ? query.pageSize : 5,
      currentPage: query.page ? query.page : query.pageSize,
      items: search,
    };
  } catch (err) {
    return { error: err.message };
  }
}

async function updateApplication(id, application) {
  console.log(id);
  try {
    const updateApplication = await prisma.application.update({
      where: {
        id: id,
      },
      data: {
        id: application.id,
        listingId: application.listingId,
        form: application.form,
        userId: application.userId,
        hasDocuments: application.hasDocuments,
        status: application.status,
      },
    });
    return updateApplication;
  } catch (err) {
    return { error: err.message };
  }
}

async function deleteApplication(id) {
  console.log(id);
  try {
    const deleteApplication = await prisma.application.delete({
      where: {
        id: id,
      },
    });
    return deleteApplication;
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = {
  newApplication,
  findApplicationById,
  searchApplication,
  updateApplication,
  deleteApplication,
};
