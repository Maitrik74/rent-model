import prisma from "@/app/libs/prismadb";
import { Reservation, Listing } from "@prisma/client"; // Import the Reservation and Listing types
import { Prisma } from "@prisma/client";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;

        // Use the ReservationWhereInput type for the query
        const query: Prisma.ReservationWhereInput = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId }; // Corrected from `userId` to `authorId`
        }

        // Fetch reservations from the database
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true, // Include the related listing
            },
            orderBy: {
                createdAt: 'desc', // Sort by creation date
            },
        });

        // Explicitly type the result as `Reservation & { listing: Listing }`
        const safeReservations = reservations.map((reservation: Reservation & { listing: Listing }) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing, // Ensure that `listing` exists here
                createdAt: reservation.listing.createdAt.toISOString(),
            },
        }));

        return safeReservations;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch reservations");
    }
}









// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId?: string;
//     userId?: string;
//     authorId?: string;
// }

// export default async function getReservations(
//     params: IParams
// ) {
//     try {
//     const { listingId, userId, authorId } = params;

//     const query = {};

//     if (listingId) {
//         query.listingId = listingId;
//     }

//     if (userId) {
//         query.userId = userId;
//     }

//     if (authorId) {
//         query.listing = { authorId: userId }
//     }

//     const reservations = await prisma.reservation.findMany({
//         where: query,
//         include: {
//             listing: true,
//         }, 
//         orderBy: {
//             createdAt: 'desc'
//         }
//     });


//     const safeReservations = reservations.map(
//         (reservation) => ({
//             ...reservation,
//             createdAt: reservation.createdAt.toISOString(),
//             startDate: reservation.startDate.toISOString(),
//             endDate: reservation.endDate.toISOString(),
//             listing: {
//                 ...reservation.listing,
//                 createdAt: reservation.listing.createdAt.toISOString()
//             }
//         })
//     );

//     return safeReservations;
//     } catch {
//         throw new Error;
//     }
// }