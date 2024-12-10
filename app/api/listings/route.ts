// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";
// console.log(prisma);
// import getCurrentUser from "@/app/actions/getCurrentUser";

// export async function POST(request: Request) {
//     try {
//         const currentUser = await getCurrentUser();
//         if (!currentUser) {
//             console.error("User not authenticated");
//             return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
//         }

//         const body = await request.json();
//         const {
//             title,
//             description,
//             imageSrc,
//             category,
//             roomCount,
//             bathroomCount,
//             guestCount,
//             location,
//             price
//         } = body;

//         const listing = await prisma.listing.create({
//             data: {
//                 title,
//                 description,
//                 imageSrc,
//                 category,
//                 roomCount,
//                 bathroomCount,
//                 guestCount,
//                 locationValue: location.value,
//                 price: parseInt(price, 10),
//                 userId: currentUser.id
//             }
//         });

//         console.log("Created Listing:", listing);
//         return NextResponse.json(listing); // Return the created listing data as JSON

//     } catch (error) {
//         console.error("Error in API route:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }


import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    console.log("Current user:", currentUser);

    if (!currentUser) {
        console.error("User not authenticated");
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}