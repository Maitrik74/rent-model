import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(params: IParams) {
    try {
        // Ensure params is not undefined and destructure it
        const { listingId } = params;

        if (!listingId) {
            throw new Error("listingId is required");
        }

        // Query the database
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if (!listing) {
            return null;
        }

        // Return a sanitized response
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toDateString(),
                emailVerified:
                    listing.user.emailVerified?.toDateString() || null,
            },
        };
    } catch {
        throw new Error;
    }
}


// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId?: string;
// }

// export default async function getListingById(
//     params: IParams
// ) {
//     try {
//         const { listingId } = params;

//         const listing = await prisma.listing.findUnique({
//             where: {
//                 id: listingId
//             },
//             include: {
//                 user: true
//             }
//         });

//         if (!listing) {
//             return null;
//         }

//         return {
//             ...listing,
//             createdAt: listing.createdAt.toISOString(),
//             user: {
//                 ...listing.user,
//                 createdAt: listing.user.createdAt.toISOString(),
//                 updatedAt: listing.user.updatedAt.toISOString(),
//                 emailVerified:
//                 listing.user.emailVerified?.toISOString() || null,
//             }
//         }; 
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }