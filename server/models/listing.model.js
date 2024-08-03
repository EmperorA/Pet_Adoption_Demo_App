const { prisma } = require("../prisma/prismaClient");

async function newListing(listing) {
  //Check required properties

  if (
    !listing.petName ||
    !listing.petPhoto ||
    !listing.petType ||
    !listing.petAge ||
    !listing.location ||
    !listing.userId
  ) {
    return {
      error: "Missing required properties.",
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: listing.userId,
      },
    });

    if (user.role === "admin") {
      const newListing = await prisma.listing.create({
        data: {
          id: listing.id,
          petName: listing.petName,
          petPhoto: listing.petPhoto,
          petType: listing.petType.toLowerCase(),
          petBreed: listing.petBreed,
          petAge: listing.petAge,
          location: listing.location,
          description: listing.description,
          tags: listing.tags,
          userId: listing.userId,
          published: listing.published,
        },
      });
      return {
        message: "New listing has been created with id: " + newListing.id,
      };
    } else {
      return { error: "You are not allowed to publish a listing." };
    }
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

async function findListingById(id) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: id,
      },
    });
    return listing;
  } catch (err) {
    return { error: err.message };
  }
}

async function searchListing(query) {
  try {
    const search = await prisma.listing.findMany({
      skip: query.page
        ? Number(query.page - 1) * query.pageSize
        : query.PageSize,
      take: query.pageSize ? Number(query.pageSize) : 5,
      where: {
        petType: query.type ? query.type.toLowerCase() : { not: "" },
        petAge: query.minAge ? { gte: Number(query.minAge) } : { gte: 0 },
        petAge: query.maxAge ? { lte: Number(query.maxAge) } : { gte: 0 },
        //We always return only published listings in the search
        published: true,
      },
    });
    //Used for pagination totalItems
    const results = await prisma.listing.count({
      where: {
        petType: query.type ? query.type.toLowerCase() : { not: "" },
        petAge: query.minAge ? { gte: Number(query.minAge) } : { gte: 0 },
        petAge: query.maxAge ? { lte: Number(query.maxAge) } : { gte: 0 },
        //We always return only published listings in the search
        published: true,
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

async function updateListing(id, query) {
  console.log(id);
  try {
    const updateListing = await prisma.listing.update({
      where: {
        id: id,
      },
      data: {
        petName: query.petName,
        petPhoto: query.petPhoto,
        petType: query.petType?.toLowerCase(),
        petBreed: query.petBreed,
        petAge: query.petAge,
        location: query.location,
        description: query.description,
        tags: query.tags,
        userId: query.userId,
        published: query.published,
        lastUpdateTimestamp: new Date().toISOString(),
      },
    });
    return updateListing;
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = {
  newListing,
  findListingById,
  searchListing,
  updateListing,
};
