"use client";

import { useEffect } from "react";
import useLocation from "./use-location";
import { toast } from "sonner";
import { postWithoutAuth } from "@/lib/post-without-auth";

type GeoCode = {
    lat: string;
    lng: string;
}

type Location = {
    mainText: string;
    state: string;
    country: string;
}

const useDetectLocation = () => {
    const setGeocode = useLocation(state => state.setGeocode);
    const setLocality = useLocation(state => state.setLocality);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            console.warn("Geolocation not supported!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setGeocode({ lat: latitude, lng: longitude });
                const { data } = await postWithoutAuth<GeoCode, Location>("get-location",
                    { lat: `${latitude}`, lng: `${longitude}` });
                setLocality({ mainText: data.mainText, secondaryText: data.state, country: data.country });
            },
            error => {
                console.warn("Location permission denied or failed:", error);
                toast.warning("Please allow location access for better experience.");
            },
            { timeout: 5000 }
        );
    }, [setGeocode, setLocality]);
}

export default useDetectLocation;
