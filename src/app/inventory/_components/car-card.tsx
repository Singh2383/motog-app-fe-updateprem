import React from "react";

import { CarDto } from "@/hooks/use-cars";
import Link from "next/link";

const CarCard: React.FC<{ car: CarDto }> = ({ car }) => {
    const getFuelIcon = (fuel: string) => {
        switch (fuel) {
            case "Petrol": return "⛽";
            case "Diesel": return "⛽";
            case "CNG": return "🔥";
            case "Electric": return "⚡";
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
                {/* {car.verified && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                    </div>
                )} */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    {car.price}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">CAR NAME (e.g. Maruti Suzuki 800)</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{car?.rc_details?.vehicle_manufacturing_month_year?.split("/")[1]}</span>
                    <span className="mx-2">•</span>
                    <span>{car.kilometers_driven} K km</span>
                    <span className="mx-2">•</span>
                    <span>{getFuelIcon(car.rc_details?.type)} {car.rc_details?.type}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {car?.rc_details?.vehicle_manufacturing_month_year?.split("/")[1]}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {"VEHICLE TRANSMISSION TYPE"}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {car?.rc_details?.owner_count === "3" ? "3rd+" : car?.rc_details?.owner} Owner
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {car.city}
                    </div>
                </div>

                <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                    <Link href={`/inventory/${car.id}`}>View Details</Link>
                </button>
            </div>
        </div>
    );
};

export default CarCard;