'use client';  // <-- Add this directive

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { Range } from "react-date-range";
import qs from "query-string";
import { formatISO } from "date-fns";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import Heading from "../Heading";
import CountrtySelect, { CountrtySelectValue } from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import dynamic from "next/dynamic";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const SearchModal = useSearchModal();

    const [location, setLocation] = useState<CountrtySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        // Ensure the updatedQuery object has the correct shape
        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
            ...(dateRange.startDate && { startDate: formatISO(dateRange.startDate) }),
            ...(dateRange.endDate && { endDate: formatISO(dateRange.endDate) }),
        };

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        SearchModal.onClose();

        router.push(url);
    },
    [
        step,
        SearchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
              title="Where do you wanna go?"
              subtitle="Find the perfect location!"
            />
            <CountrtySelect 
              value={location}
              onChange={(value) => setLocation(value as CountrtySelectValue)}
            />
            <hr />
            <Map center={location?.latlng}/>
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                  title="When do you plan to go?"
                  subtitle="Make sure everyone is free!"
                />
                <Calendar 
                  value={dateRange}
                  onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                  title="More information"
                  subtitle="Find your perfect place!"
                />
                <Counter 
                  title="Guests"
                  subtitle="How many guests are coming?"
                  value={guestCount}
                  onChange={(value) => setGuestCount(value)}
                />
                <Counter 
                  title="Rooms"
                  subtitle="How many rooms do you need?"
                  value={roomCount}
                  onChange={(value) => setRoomCount(value)}
                />
                <Counter 
                  title="Bathrooms"
                  subtitle="How many bathrooms do you need?"
                  value={bathroomCount}
                  onChange={(value) => setBathroomCount(value)}
                />
            </div>
        );
    }

    return (
        <Modal 
          isOpen={SearchModal.isOpen}
          onClose={SearchModal.onClose}
          onSubmit={onSubmit}
          title="Filters"
          actionLabel={actionLabel}
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
          body={bodyContent}
        />
    );
};

export default SearchModal;



// 'use client';

// import useSearchModal from "@/app/hooks/useSearchModal";
// import qs from "query-string";

// import Modal from "./Modal";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useState, useMemo, useCallback } from "react";
// import { Range } from "react-date-range";

// import dynamic from "next/dynamic";
// import CountrtySelect, { CountrtySelectValue } from "../inputs/CountrySelect";
// import { formatISO } from "date-fns";
// import Heading from "../Heading";
// import Calendar from "../inputs/Calendar";
// import Counter from "../inputs/Counter";


// enum STEPS {
//     LOCATION = 0,
//     DATE = 1,
//     INFO = 2
// }


// const SearchModal = () => {
//     const router = useRouter();
//     const params = useSearchParams();
//     const SearchModal = useSearchModal();

//     const [location, setLocation] = useState<CountrtySelectValue>()
//     const [step, setStep] = useState(STEPS.LOCATION);
//     const [guestCount, setGuestCount] = useState(1);
//     const [roomCount, setRoomCount] = useState(1);
//     const [bathroomCount, setBathroomCount] = useState(1);
//     const [dateRange, setDateRange] = useState<Range>({
//         startDate: new Date(),
//         endDate: new Date(),
//         key: 'selection'
//     });

//     const Map = useMemo(() => dynamic(() => import('../Map'), {
//         ssr: false,
//     }), [location]);

//     const onBack = useCallback(() => {
//         setStep((value) => value - 1);
//     }, []);

//     const onNext = useCallback(() => {
//         setStep((value) => value + 1);
//     }, []);

//     const onSubmit = useCallback(async () =>  {
//         if (step !== STEPS.INFO) {
//             return onNext();
//         }

//         let currentQuery = {};

//         if (params) {
//             currentQuery = qs.parse(params.toString());
//         }

//         const updatedQuery = {
//             ...currentQuery,
//             locationValue: location?.value,
//             guestCount,
//             roomCount,
//             bathroomCount
//         };

//         if (dateRange.startDate) {
//             updatedQuery.startDate = formatISO(dateRange.startDate);
//         }

//         if (dateRange.endDate) {
//             updatedQuery.endDate = formatISO(dateRange.endDate);
//         }

//         const url = qs.stringifyUrl({
//             url: '/',
//             query: updatedQuery
//         }, { skipNull: true });

//         setStep(STEPS.LOCATION);
//         SearchModal.onClose();

//         router.push(url);
//     }, 
//     [
//         step,
//         SearchModal,
//         location,
//         router,
//         guestCount,
//         roomCount,
//         bathroomCount,
//         dateRange,
//         onNext,
//         params
//     ]);

//     const actionLabel = useMemo(() => {
//         if (step === STEPS.INFO) {
//             return 'Search';
//         }

//         return 'Next';
//     }, [step]);

//     const secondaryActionLabel = useMemo(() => {
//         if (step === STEPS.LOCATION) {
//             return undefined;
//         }

//         return 'Back';
//     }, [step]);

//     let bodyContent = (
//         <div className="flex flex-col gap-8">
//             <Heading 
//               title="Where do you wanna go?"
//               subtitle="Find the perfect location!"
//             />
//             <CountrtySelect 
//               value={location}
//               onChange={(value) =>
//                 setLocation(value as CountrtySelectValue)
//               }
//             />
//             <hr />
//             <Map center={location?.latlng}/>
//         </div>
//     )

//     if (step === STEPS.DATE) {
//         bodyContent = (
//             <div className="flex flex-col gap-8">
//                 <Heading 
//                   title="When do you plan to go?"
//                   subtitle="Make sure everyone is free!"
//                 />
//                 <Calendar 
//                   value={dateRange}
//                   onChange={(value) => setDateRange(value.selection)}
//                 />
//             </div>
//         )
//     }

//     if (step === STEPS.INFO) {
//         bodyContent = (
//             <div className="flex flex-col gap-8">
//                 <Heading 
//                   title="More information"
//                   subtitle="Find your perfect place!"
//                 />
//                 <Counter 
//                   title="Guests"
//                   subtitle="How many guests are coming?"
//                   value={guestCount}
//                   onChange={(value) => setGuestCount(value)}
//                 />
//                 <Counter 
//                   title="Rooms"
//                   subtitle="How many rooms do you need?"
//                   value={roomCount}
//                   onChange={(value) => setRoomCount(value)}
//                 />
//                 <Counter 
//                   title="Bathrooms"
//                   subtitle="How many bathrooms do you need?"
//                   value={bathroomCount}
//                   onChange={(value) => setBathroomCount(value)}
//                 />
//             </div>
//         )
//     }

//     return (
//         <Modal 
//           isOpen={SearchModal.isOpen}
//           onClose={SearchModal.onClose}
//           onSubmit={onSubmit}
//           title="Filters"
//           actionLabel={actionLabel}
//           secondaryActionLabel={secondaryActionLabel}
//           secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
//           body={bodyContent}
//         />
//     );
// }

// export default SearchModal;