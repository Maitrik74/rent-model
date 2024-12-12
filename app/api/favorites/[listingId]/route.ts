import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: Promise<IParams> } // Wrap params in a Promise
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const resolvedParams = await params; // Resolve the Promise
    const { listingId } = resolvedParams;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID");
    }

    const favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}



export async function DELETE(
    request: Request,
    { params }: { params: Promise<IParams> } // Accept params as a Promise
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const resolvedParams = await params; // Resolve the Promise
    const { listingId } = resolvedParams;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}




// export async function POST (
//     request: Request,
//     { params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const {listingId } = params;

//     if (!listingId || typeof listingId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     const favoriteIds = [...(currentUser.favoriteIds || [])];

//     favoriteIds.push(listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favoriteIds
//         }
//     });

//     return NextResponse.json(user);
// }

// export async function DELETE(
//     request: Request,
//     { params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = params;

//     if (!listingId || typeof listingId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     let favoriteIds = [...(currentUser.favoriteIds || [])];

//     favoriteIds = favoriteIds.filter((id) => id !== listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favoriteIds
//         }
//     });

//     return NextResponse.json(user);
// }