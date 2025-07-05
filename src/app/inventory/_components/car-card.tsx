import React from "react";
import { GiPathDistance } from "react-icons/gi";

import { CarDto } from "@/hooks/use-cars";
import Link from "next/link";

function toOrdinal(num: string | number): string {
    const n = typeof num === "number" ? num : parseInt(num);
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    const suffix =
        suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    return `${n}${suffix}`;
}

function extractYear(dateString: string): number {
    return new Date(dateString).getFullYear();
}

const CarCard: React.FC<{ car: CarDto }> = ({ car }) => {
    const getFuelIcon = (fuel: string) => {
        switch (fuel.toLowerCase()) {
            case "petrol": return "⛽";
            case "diesel": return "⛽";
            case "cng": return "🔥";
            case "electric": return "⚡";
            default: return "";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
                <img
                    src={car.images.find(image => image.is_primary)?.url}
                    alt={`car image - ${car.images.find(image => image.is_primary)?.url}`}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    &#8377; {car.price.toLocaleString('en-IN')}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{car.rc_details.model}</h3>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center">
                        <span>{getFuelIcon(car.rc_details?.type)}</span>
                        {car?.rc_details.type}
                    </div>
                    <div className="flex items-center space-x-1">
                        <GiPathDistance />
                        <span>{`${car?.kilometers_driven} km`}</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {extractYear(car?.rc_details?.reg_date)}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {car?.rc_details?.owner_count ? `${toOrdinal(car.rc_details.owner_count)} Owner` : 'Unknown'}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {car.usr_inp_city}
                    </div>
                </div>

                <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                    <Link href={`/inventory/${car.id}`}>View Details</Link>
                </button>
            </div>
        </div >
    );
};

export default CarCard;