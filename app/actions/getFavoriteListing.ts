import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { Listing } from "@prisma/client";  // Import the Listing type

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    // Map over favorites and convert `createdAt` to ISO string
    const safeFavorites = favorites.map((favorite: Listing) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch favorite listings");
  }
}


// import prisma from "@/app/libs/prismadb";

// import getCurrentUser from "./getCurrentUser";

// export default async function getFavoriteListings() {
//     try {
//         const currentUser = await getCurrentUser();

//         if (!currentUser) {
//             return [];
//         }

//         const favorites = await prisma.listing.findMany({
//             where: {
//                 id: {
//                     in: [...(currentUser.favoriteIds || [])]
//                 }
//             }
//         });

//         const safeFavorites = favorites.map((favorite: any) => ({
//             ...favorite,
//             createdAt: favorite.createdAt.toISOString()
//         }));

//         return safeFavorites;
//     } catch {
//         throw new Error;
//     }
// }