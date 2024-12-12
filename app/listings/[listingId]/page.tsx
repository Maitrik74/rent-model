// import getCurrentUser from "@/app/actions/getCurrentUser";
// import getListingById from "@/app/actions/getListingById";

// import ClientOnly from "@/app/components/ClientOnly";
// import EmptyState from "@/app/components/EmptyState";

// import ListingClient from "./ListingClient";
// import getReservations from "@/app/actions/getReservations";

// interface IParams {
//     listingId?: string;
// }

// const ListingPage = async ({ params }: { params: { listingId: string } }) => {
//     // Await params before destructuring
//     const { listingId } = params;
//     const reservations = await getReservations(params);

//     const listing = await getListingById({ listingId });
//     const currentUser = await getCurrentUser();

//     if (!listing) {
//         return (
//             <ClientOnly>
//                 <EmptyState />
//             </ClientOnly>
//         );
//     }

//     return (
//         <ClientOnly>
//             <ListingClient 
//               listing={listing} 
//               currentUser={currentUser}
//               reservations={reservations}
//               />
//         </ClientOnly>
//     );
// };

// export default ListingPage;


import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
    const resolvedParams = await params; // Resolve the Promise
    const { listingId } = resolvedParams;

    const listing = await getListingById({ listingId });
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default ListingPage;



// import getCurrentUser from "@/app/actions/getCurrentUser";
// import getListingById from "@/app/actions/getListingById";

// import ClientOnly from "@/app/components/ClientOnly";
// import EmptyState from "@/app/components/EmptyState";

// import ListingClient from "./ListingClient";

// interface IParams {
//     listingId?: string;
// }

// const ListingPage = async ({ params }: { params: IParams }) => {
//     const { listingId } = params;

//     const listing = await getListingById({listingId});
//     const currentUser = await getCurrentUser();

//         if (!listing) {
//             return (
//                 <ClientOnly>
//                     <EmptyState />
//                 </ClientOnly>
//             )
//         }
    
//     return (
//         <ClientOnly>
//           <ListingClient
//           listing={listing}
//           currentUser={currentUser}
//           />
//         </ClientOnly>
//     );
// }

// export default ListingPage;