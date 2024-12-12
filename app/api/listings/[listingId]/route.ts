import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
  listingId: string; // Ensure listingId is required and of type string
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IParams> } // Mark params as a Promise
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const resolvedParams = await params; // Resolve the Promise
  const { listingId } = resolvedParams;

  // Validate the listingId
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json(
      { message: "Invalid listing ID" },
      { status: 400 }
    );
  }

  try {
    // Attempt to delete the listing
    const listing = await prisma.listing.delete({
      where: {
        id: listingId,
        userId: currentUser.id, // Ensure the listing belongs to the current user
      },
    });

    // If the listing was not found, return a 404 response
    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found or you do not have permission" },
        { status: 404 }
      );
    }

    // Return the deleted listing's data
    return NextResponse.json(listing);
  } catch (error) {
    // Handle any errors during the deletion process
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting listing" },
      { status: 500 }
    );
  }
}



// // Define IParams to make listingId a required string
// interface IParams {
//   listingId?: string;  // Make listingId required since we use it later
// }

// // Make the DELETE function asynchronous and ensure proper handling of `params`
// export async function DELETE(
//   request: Request,
//   { params }: { params: IParams }
// ) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { listingId } = params;

//   // Validate the listingId
//   if (typeof listingId !== 'string' || !listingId) {
//     return NextResponse.json({ message: 'Invalid listing ID' }, { status: 400 });
//   }

//   try {
//     // Attempt to delete the listing
//     const listing = await prisma.listing.delete({
//       where: {
//         id: listingId,
//         userId: currentUser.id // Ensure the listing belongs to the current user
//       }
//     });

//     // If the listing was not found, return a 404 response
//     if (!listing) {
//       return NextResponse.json({ message: 'Listing not found or you do not have permission' }, { status: 404 });
//     }

//     // Return the deleted listing's data
//     return NextResponse.json(listing);
//   } catch (error) {
//     // Handle any errors during the deletion process
//     console.error(error);
//     return NextResponse.json({ message: 'Error deleting listing' }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId?: string;
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

//     const listing = await prisma.listing.deleteMany({
//         where: {
//             id: listingId,
//             userId: currentUser.id
//         }
//    });

//    return NextResponse.json(listing);
// }