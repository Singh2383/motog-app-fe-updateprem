"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, startTransition, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";

const steps = [
    "Car Details",
    "Price & Features",
    "Contact Information"
];

interface ISellForm {
    vehicle_type: string;
    reg_no: string;
    kilometers_driven: number;
    price: number;
    city: string;
    seller_phone: string;
    description: string;
}

export default function DetailForm({ reg_no, setShowDetailForm }: { reg_no: string; setShowDetailForm: Dispatch<SetStateAction<boolean>> }) {
    const token = useAuth(state => state.token);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<ISellForm>({
        vehicle_type: "car",
        reg_no,
        kilometers_driven: 0,
        price: 0,
        city: "New Delhi",
        seller_phone: "",
        description: "",
    });
    const [photoUploads, setPhotoUploads] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            console.log("formData:", formData);
            try {
                // const res = await axios.post(
                //     `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`,
                //     formData,
                //     { headers: { Authorization: `Bearer ${token}` } }
                // );
                toast.success("Listing Successfull");
                //console.log("listing res:", res);
                setPhotoUploads(true);
            } catch (e) {
                console.error("error listing: ", e);
                toast.error("Something went wrong!");
            }
        });
    }

    const uploadImages = ()=>{
        startTransition(async () => {
            console.log("formData:", formData);
            try {
                // const res = await axios.post(
                //     `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`,
                //     formData,
                //     { headers: { Authorization: `Bearer ${token}` } }
                // );
                toast.success("Listing Successfull");
                //console.log("listing res:", res);
                setPhotoUploads(true);
            } catch (e) {
                console.error("error listing: ", e);
                toast.error("Something went wrong!");
            }
        });
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl'>
                <div className='flex flex-col sm:flex-row w-full shadow-lg rounded-xl bg-green-400'>
                    <Card id='listing-car-detail' className="w-full outline-none border-none shadow-none relative">
                        <IoCloseCircleOutline className="absolute -top-1 -right-8 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={() => setShowDetailForm(false)} />
                        <CardHeader>
                            <div className="flex space-x-2">
                                {!photoUploads && steps.map((step, index) => (
                                    <Badge key={`form-${index}`} variant={currentStep === index ? "default" : "outline"}
                                        onClick={() => index < currentStep && setCurrentStep(index)}
                                        className={cn("", index < currentStep && "hover:bg-neutral-50 hover:cursor-pointer")}
                                    >
                                        {step}
                                    </Badge>
                                ))}
                                {photoUploads && <Badge>Upload Photos</Badge>}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {!photoUploads &&
                                <form id="sell-car-detail" onSubmit={onFormSubmit}>
                                    <CarDetail currentStep={currentStep} setFormData={setFormData} />
                                    <PriceNFeature currentStep={currentStep} setFormData={setFormData} />
                                    <Contacts currentStep={currentStep} setFormData={setFormData} />
                                </form>
                            }
                            {photoUploads &&
                                <PhotoUploads images={images} setImages={setImages} />
                            }
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            {!photoUploads && currentStep < steps.length - 1 &&
                                <Button className="w-full" onClick={() => setCurrentStep(prev => prev + 1)}>
                                    Next
                                </Button>
                            }
                            {!photoUploads && currentStep === steps.length - 1 &&
                                <Button type="submit" form="sell-car-detail" className="w-full">
                                    Submit
                                </Button>
                            }
                            {photoUploads &&
                                <Button className="w-full" disabled={!!images.length} onClick={uploadImages}>
                                    Submit
                                </Button>
                            }
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const CarDetail = ({ currentStep, setFormData }: { currentStep: number, setFormData: Dispatch<SetStateAction<ISellForm>> }) => {
    if (steps[currentStep] !== "Car Details") return null;
    return (
        <div className="flex flex-col gap-6">
            <div className="gap-2 sm:flex sm:space-x-4">
                <Label htmlFor="vtype">Vehicle Type:</Label>
                <RadioGroup id="vtype" defaultValue="car" className="flex"
                    onValueChange={(val) => setFormData(prev => ({ ...prev, vehicle_type: val }))}
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="car" id="r1" />
                        <Label htmlFor="r1">Car</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="bike" id="r2" />
                        <Label htmlFor="r2">Bike</Label>
                    </div>
                </RadioGroup>

            </div>
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="km-driven">Kilometers Driven</Label>
                </div>
                <Input id="km-driven"
                    onChange={(e) => setFormData(prev => ({ ...prev, kilometers_driven: parseInt(e.target.value) }))}
                    required
                />
            </div>
        </div>
    )
}

const PriceNFeature = ({ currentStep, setFormData }: { currentStep: number, setFormData: Dispatch<SetStateAction<ISellForm>> }) => {
    if (steps[currentStep] !== "Price & Features") return null;
    return (
        <div className="flex flex-col gap-6">
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="price">Price</Label>
                </div>
                <Input id="price"
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    required
                />

            </div>
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="desc">Description</Label>
                </div>
                <Textarea id="desc"
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
            </div>
        </div>
    )
}

const Contacts = ({ currentStep, setFormData }: { currentStep: number, setFormData: Dispatch<SetStateAction<ISellForm>> }) => {
    if (steps[currentStep] !== "Contact Information") return null;
    return (
        <div className="flex flex-col gap-6">
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="city">City</Label>
                </div>
                <Input id="city"
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    required
                />
            </div>
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="phone">Phone</Label>
                </div>
                <Input id="phone"
                    onChange={(e) => setFormData(prev => ({ ...prev, seller_phone: e.target.value }))}
                    required
                />
            </div>
        </div>
    )
}


type PhotoUploadProps = {
    images: string[];
    setImages: Dispatch<SetStateAction<string[]>>;
    maxImages?: number;
    onImagesChange?: (images: string[]) => void;
};

const PhotoUploads = ({ images, setImages, maxImages = 5 }: PhotoUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className="">
            <div className="flex flex-wrap gap-3">
                {/* Display uploaded thumbnails */}
                {images.map((img, index) => (
                    <div key={index} className="relative w-30 h-30 rounded-md overflow-hidden">
                        <img
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
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
            />
        </div>
    );
}
