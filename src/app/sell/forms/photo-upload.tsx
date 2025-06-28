"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useListingForms } from "@/hooks/use-listing-forms";
import axios, { AxiosError } from "axios";
import { Badge } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, startTransition, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";

type PhotoUploadProps = {
    maxImages?: number;
};

const PhotoUploads = ({ maxImages = 5 }: PhotoUploadProps) => {
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const listingId = useListingForms(state => state.listingId);
    const showImageUpload = useListingForms(state => state.showImageUpload);
    const setShowImageUpload = useListingForms(state => state.setShowImageUpload);
    const token = useAuth(state => state.token);

    if (!showImageUpload) return null;

    const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        // Check if total images would exceed max
        if (images.length + files.length > maxImages) {
            toast.warning(`You can only upload up to ${maxImages} images!`);
            return;
        }

        // Convert images to data URLs for preview
        const newImages: string[] = [];
        let loadedCount = 0;

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    newImages.push(event.target.result as string);
                    loadedCount++;

                    if (loadedCount === files.length) {
                        const updatedImages = [...images, ...newImages];
                        setImages(updatedImages);
                    }
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset file input
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const uploadImages = () => {
        startTransition(async () => {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/${listingId}/images`,
                    images,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Image upload Succeeded.");
                console.log("image upload res:", res);
                setTimeout(() => setShowImageUpload(false, ""), 500);
            } catch (err) {
                const e = err as AxiosError;
                console.error("error image upload:", e);
                if (e.response && e.response.status === 401)
                    toast.error("Authentication Failed! Please try logging in again.");
                else if (e.response && e.response.status >= 400)
                    toast.error("Bad Request! Please try again.");
                else if (e.response && e.response?.status >= 500) toast.error("Something Went Wrong!");
            }
        });
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl'>
                <div className='flex flex-col sm:flex-row w-full shadow-lg rounded-xl bg-green-400'>
                    <Card id='listing-car-detail' className="w-full outline-none border-none shadow-none relative">
                        <IoCloseCircleOutline className="absolute -top-1 -right-8 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={() => setShowImageUpload(false, "")} />
                        <CardHeader>
                            <div className="flex space-x-2">
                                <Badge>Upload Photos</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="">
                                <div className="flex flex-wrap gap-3">
                                    {/* Display uploaded thumbnails */}
                                    {images.map((img, index) => (
                                        <div key={index} className="relative w-30 h-30 rounded-md overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={`Uploaded ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-opacity-70 transition"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}

                                    {/* Display placeholder if we haven't reached max */}
                                    {images.length < maxImages && (
                                        <div
                                            className="w-30 h-30 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition"
                                            onClick={triggerFileInput}
                                        >
                                            <div className="text-2xl text-gray-500">+</div>
                                            <div className="text-xs text-gray-500 mt-1">Add Image</div>
                                        </div>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageSelection}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button className="w-full" disabled={!!images.length} onClick={uploadImages}>
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default PhotoUploads;
