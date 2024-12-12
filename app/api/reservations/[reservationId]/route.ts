import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string; // Reservation ID is optional in the type
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<IParams> } // Change params to a Promise
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const resolvedParams = await params; // Resolve the params Promise
    const { reservationId } = resolvedParams;

    // Validate the reservationId
    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID");
    }

    try {
        // Delete the reservation
        const reservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [
                    { userId: currentUser.id },
                    { listing: { userId: currentUser.id } }, // Check ownership
                ],
            },
        });

        // Return the deleted reservation(s)
        return NextResponse.json(reservation);
    } catch (error) {
        // Handle any errors
        console.error(error);
        return NextResponse.json(
            { message: "Failed to delete reservation" },
            { status: 500 }
        );
    }
}


// import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     reservationId?: string;
// };

// export async function DELETE(
//     request: Request,
//     { params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { reservationId } = params;

//     if (!reservationId || typeof reservationId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     const reservation = await prisma.reservation.deleteMany({
//         where: {
//             id: reservationId,
//             OR: [
//                 { userId: currentUser.id },
//                 { listing: { userId: currentUser.id } }
//             ]
//         }
//     });

//     return NextResponse.json(reservation)
// }