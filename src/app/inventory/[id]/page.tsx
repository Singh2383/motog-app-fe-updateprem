"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCarDetails } from '@/hooks/use-car-details';
import { useState } from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function CarDetailsPage() {
    const { id } = useParams() as { id: string };
    const { data: car, isLoading, isError } = useCarDetails(id);
    const [showContact, setShowContact] = useState(false);

    if (isLoading) return <p>Loading car details...</p>;
    if (isError || !car) return <p>Car not found.</p>;

    return (
        <div className="min-h-screen w-full sm:max-w-5/6 mx-auto bg-white pt-32 pb-16">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Title & Price */}
                <div>
                    <h1 className="text-2xl font-bold">{"CAR NAME"}</h1>
                    <div className="mt-1 flex items-center gap-4 text-gray-700">
                        <span className="text-lg font-semibold">₹{car.price.toLocaleString()}</span>
                        {/* {car.verified && (
                            <Badge variant="default" className="flex items-center gap-1">
                                <CheckCircle2 size={14} /> Verified
                            </Badge>
                        )} */}
                    </div>
                </div>


                {/* images */}
                <Carousel className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {car.images.map(({ url, is_primary }, index: number) => (
                            <CarouselItem key={index}>
                                <div className="relative h-64 sm:h-80 md:h-[24rem] rounded-md overflow-hidden shadow">
                                    <Image
                                        src={url}
                                        alt={`image at ${url} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>


                {/* Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm text-gray-700">
                    <Detail label="Year" value={car.rc_details?.vehicle_manufacturing_month_year.split("/")[1]} />
                    <Detail label="Fuel" value={car?.rc_details?.type} />
                    <Detail label="Transmission" value={"TRANSMISSION"} />
                    <Detail label="Owner" value={car?.rc_details?.owner_count} />
                    <Detail label="KMs Driven" value={`${car.kilometers_driven.toLocaleString()} km`} />
                    <Detail label="Location" value={car.city} />
                </div>

                {/* Description */}
                {car.description && (
                    <div className="text-sm text-gray-800 leading-relaxed">
                        <h2 className="font-semibold text-base mb-1">Description</h2>
                        <p>{car.description}</p>
                    </div>
                )}

                {/* Contact Seller CTA */}
                {!showContact ? (
                    <Button size="lg" onClick={() => setShowContact(true)}>
                        Contact Seller
                    </Button>
                ) : (
                    <div className="rounded-md border p-4 shadow-sm bg-gray-50 space-y-2">
                        <h2 className="text-lg font-semibold">Seller Contact</h2>
                        <div className="flex items-center gap-2 text-sm">
                            <Phone size={16} /> {car.seller_phone}
                        </div>
                        {/* {car && (
                            <div className="flex items-center gap-2 text-sm">
                                <Mail size={16} /> {car.seller.email}
                            </div>
                        )} */}
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={16} /> {car.city}
                        </div>
                        {/* <div className="text-sm text-gray-600">
                            Name: <span className="font-medium">{car.seller.name}</span>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}

function Detail({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex flex-col">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
