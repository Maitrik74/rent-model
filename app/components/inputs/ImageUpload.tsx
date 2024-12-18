'use client';

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: CloudinaryUploadWidgetResults) => {
        if (result?.info && typeof result.info !== 'string') {
            onChange(result.info.secure_url);
        } else {
            console.error("Invalid result format:", result);
        }
    }, [onChange]);

    return (
        <CldUploadWidget 
            onSuccess={handleUpload}
            uploadPreset="Michael"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <div
                    onClick={() => open?.()}
                    className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                >
                    <TbPhotoPlus size={50}/>
                    <div className="font-semibold text-lg">
                        Click to upload
                    </div>
                    {value && (
                        <div className="absolute inset-0 w-full h-full">
                            <Image 
                                alt="Upload"
                                fill
                                style={{objectFit: 'cover'}}
                                src={value}
                                sizes="(max-width: 768px) 100vw, 
                                       (max-width: 1200px) 50vw, 
                                       33vw"
                            />
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    );
}

export default ImageUpload;






// 'use client';

// import { CldUploadWidget } from "next-cloudinary";
// import Image from "next/image";
// import { useCallback } from "react";
// import { TbPhotoPlus } from "react-icons/tb";

// declare global {
//     let cloudinary;
// }

// interface ImageUploadProps {
//     onChange: (value: string) => void;
//     value: string;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//     onChange,
//     value
// }) => {
//     const handleUpload = useCallback((result) => {
//         onChange(result.info.secure_url);
//     }, [onChange])

//     return (
//         <CldUploadWidget 
//         onSuccess={handleUpload}
//         uploadPreset="Michael"
//         options={{
//             maxFiles: 1
//         }}
//         >
//             {({ open}) => {
//                 return (
//                     <div
//                     onClick={() => open?.()}
//                     className="
//                     relative
//                     cursor-pointer
//                     hover:opacity-70
//                     transition
//                     border-dashed
//                     border-2
//                     p-20
//                     border-neutral-300
//                     flex
//                     flex-col
//                     justify-center
//                     items-center
//                     gap-4
//                     text-neutral-600
//                     "
//                     >
//                         <TbPhotoPlus size={50}/>
//                         <div className="font-semibold text-lg">
//                            Click to upload
//                         </div>
//                         {value && (
//                             <div
//                             className="absolute inset-0 w-full h-full"
//                             >
//                                 <Image 
//                                 alt="Upload"
//                                 fill
//                                 style={{objectFit: 'cover'}}
//                                 src={value}
//                                 sizes="(max-width: 768px) 100vw, 
//                                        (max-width: 1200px) 50vw, 
//                                        33vw"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 )
//             }}
//         </CldUploadWidget>
        
//     );
// }

// export default ImageUpload;
