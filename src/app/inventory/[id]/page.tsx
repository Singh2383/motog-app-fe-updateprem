"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import { extractYear } from "../_components/car-card";
import { toOrdinal } from "@/lib/my-utils";
import { useAuthStore } from "../../../components/stores/auth-store";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { CarDto } from "@/hooks/use-cars";

const CarDetailsPage: FC = () => {
    const { id } = useParams() as { id?: string };
    const token = useAuthStore((s) => s.token);

    const [car, setCar] = useState<CarDto | null>(null);
    const [showContact, setShowContact] = useState(false);


    useEffect(() => {
        if (!id || !token?.access_token) return;

        fetchWithAuth<CarDto>(`/listings/${id}`)
            .then((res) => setCar(res.data))
            .catch((err) => console.error("Fetching car details failed:", err));
    }, [id, token?.access_token]);

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <span>No data found for this vehicle.</span>
            </div>
        );
    }

    const rc = car.rc_details ?? {};
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-white pt-32 md:pt-36 lg:pt-40 pb-16 sm:px-8 md:px-20">
            <div className="mx-auto max-w-screen-lg space-y-6">
                {/* ── Title & Price ───────────────────────────────────────── */}
                <header className="px-4 md:px-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {rc.vehicle_manufacturer_name ?? "Car"} {rc.model ?? ""}
                    </h1>

                    <div className="mt-1 flex items-center gap-4 text-gray-700">
                        <span className="text-lg font-bold">
                            ₹{car.price.toLocaleString("en-IN")}
                        </span>
                    </div>
                </header>

                {/* ── Image carousel ─────────────────────────────────────── */}
                <Carousel className="w-full">
                    <CarouselContent>
                        {car.images.map(({ url }, idx) => (
                            <CarouselItem key={idx}>
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md shadow">
                                    <Image
                                        src={url}
                                        alt={`Image ${idx + 1}`}
                                        className="object-cover"
                                        fill
                                        sizes="100vw"
                                        priority={idx === 0}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Desktop arrows */}
                    <CarouselPrevious className="hidden md:inline-flex" />
                    <CarouselNext className="hidden md:inline-flex" />

                    {/* Mobile arrows, on‑image */}
                    <CarouselPrevious className="absolute left-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 shadow hover:bg-white md:hidden" />
                    <CarouselNext className="absolute right-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 shadow hover:bg-white md:hidden" />
                </Carousel>

                {/* ── Quick facts grid ───────────────────────────────────── */}
                <section className="grid grid-cols-2 gap-x-4 gap-y-4 px-4 text-sm text-gray-700 sm:grid-cols-3 md:px-0">
                    <Detail label="Year" value={extractYear(rc.reg_date)} />
                    <Detail label="Fuel" value={rc.type ?? "—"} />
                    <Detail
                        label="Owner"
                        value={
                            rc.owner_count ? (
                                <>
                                    {rc.owner_count}
                                    <sup>{toOrdinal(rc.owner_count)}</sup>
                                </>
                            ) : (
                                "—"
                            )
                        }
                    />
                    <Detail
                        label="KMs Driven"
                        value={`${car.kilometers_driven.toLocaleString()} km`}
                    />
                    <Detail label="Manufacturer" value={rc.vehicle_manufacturer_name} />
                    <Detail label="Norms Type" value={rc.norms_type} />
                    <Detail label="Seat Capacity" value={rc.vehicle_seat_capacity} />
                    <Detail label="Original Colour" value={rc.vehicle_colour} />
                    <Detail label="Location" value={car.usr_inp_city} />
                </section>

                {/* ── Description ────────────────────────────────────────── */}
                {car.description && (
                    <section className="px-4 md:px-0">
                        <h2 className="mb-2 text-base font-semibold">Description</h2>
                        <p className="text-sm leading-relaxed text-gray-800">
                            {car.description}
                        </p>
                    </section>
                )}

                {/* ── Contact seller ─────────────────────────────────────── */}
                {!showContact ? (
                    <div className="px-4 pt-4 md:px-0">
                        <button
                            type="button"
                            onClick={() => setShowContact(true)}
                            className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
                        >
                            Contact Seller
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2 rounded-md border bg-gray-50 p-4 shadow-sm">
                        <h2 className="text-base font-semibold sm:text-lg">
                            Seller Contact
                        </h2>
                        <ContactRow icon={Phone} value={car.seller_phone} />
                        <ContactRow icon={Mail} value={car.owner_email} />
                        <ContactRow icon={MapPin} value={car.usr_inp_city} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarDetailsPage;

/** ----------------------------------------------------------------
 *  Tiny helpers
 *  ---------------------------------------------------------------- */
function Detail({
    label,
    value,
}: {
    label: string;
    value: string | number | ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value || "—"}</span>
        </div>
    );
}

function ContactRow({
    icon: Icon,
    value,
}: {
    icon: typeof Phone;
    value: ReactNode;
}) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Icon size={16} />
            {value}
        </div>
    );
}
