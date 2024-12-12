import prisma from "@/app/libs/prismadb";
import { Prisma, Listing } from "@prisma/client";  // Import Listing type from Prisma

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    // Use Prisma's ListingWhereInput type for the query
    const query: Prisma.ListingWhereInput = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    // Fetch listings from the database
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert `createdAt` to ISO string for all listings
    const safeListings = listings.map((listing: Listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch listings");
  }
}



// import prisma from "@/app/libs/prismadb";
// import { Prisma } from "@prisma/client";

// export interface IListingsParams {
//   userId?: string;
//   guestCount?: number;
//   roomCount?: number;
//   bathroomCount?: number;
//   startDate?: string;
//   endDate?: string;
//   locationValue?: string;
//   category?: string;
// }

// export default async function getListings(params: IListingsParams) {
//   try {
//     const {
//       userId,
//       roomCount,
//       guestCount,
//       bathroomCount,
//       locationValue,
//       startDate,
//       endDate,
//       category,
//     } = params;

//     // Use Prisma's ListingWhereInput type for the query
//     const query: Prisma.ListingWhereInput = {};

//     if (userId) {
//       query.userId = userId;
//     }

//     if (category) {
//       query.category = category;
//     }

//     if (roomCount) {
//       query.roomCount = {
//         gte: +roomCount,
//       };
//     }

//     if (guestCount) {
//       query.guestCount = {
//         gte: +guestCount,
//       };
//     }

//     if (bathroomCount) {
//       query.bathroomCount = {
//         gte: +bathroomCount,
//       };
//     }

//     if (locationValue) {
//       query.locationValue = locationValue;
//     }

//     if (startDate && endDate) {
//       query.NOT = {
//         reservations: {
//           some: {
//             OR: [
//               {
//                 endDate: { gte: startDate },
//                 startDate: { lte: startDate },
//               },
//               {
//                 startDate: { lte: endDate },
//                 endDate: { gte: endDate },
//               },
//             ],
//           },
//         },
//       };
//     }

//     // Fetch listings from the database
//     const listings = await prisma.listing.findMany({
//       where: query,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     // Convert `createdAt` to ISO string for all listings
//     const safeListings = listings.map((listing: any) => ({
//       ...listing,
//       createdAt: listing.createdAt.toISOString(),
//     }));

//     return safeListings;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to fetch listings");
//   }
// }


// import prisma from "@/app/libs/prismadb";

// export interface IListingsParams {
//     userId?: string;
//     guestCount?: number;
//     roomCount?: number;
//     bathroomCount?: number;
//     startDate?: string;
//     endDate?: string;
//     locationValue?: string;
//     category?: string;
// }

// export default async function getListings(
//     params: IListingsParams
// ) {
//     try {
//         const {
//             userId,
//             roomCount,
//             guestCount,
//             bathroomCount,
//             locationValue,
//             startDate,
//             endDate,
//             category
//         } = params;

//         const query: Record<string, any> = {};
//         // const query = {};

//         if (userId) {
//             query.userId = userId;
//         }

//         if (category) {
//             query.category = category;
//         }

//         if (roomCount) {
//             query.roomCount = {
//                 gte: +roomCount
//             }
//         }

//         if (guestCount) {
//             query.guestCount = {
//                 gte: +guestCount
//             }
//         }

//         if (bathroomCount) {
//             query.bathroomCount = {
//                 gte: +bathroomCount
//             }
//         }

//         if (locationValue) {
//             query.locationValue = locationValue;
//         }

//         if (startDate && endDate) {
//             query.NOT = {
//                 reservations: {
//                     some: {
//                         OR: [
//                             {
//                                 endDate: { gte: startDate },
//                                 startDate: { lte: startDate },
//                             },
//                             {
//                                 startDate: { lte: endDate },
//                                 endDate: { gte: endDate }
//                             }
//                         ]
//                     }
//                 }
//             }
//         }

//         const listings = await prisma.listing.findMany({
//             where: query,
//             orderBy: {
//                 createdAt: 'desc'
//             }
//         });

//     const safeListings = listings.map((listing: any) => ({
//         ... listing,
//         createdAt: listing.createdAt.toISOString(),
//     }));    
//     return safeListings;
//     } catch {
//         throw new Error;
//     }
// }