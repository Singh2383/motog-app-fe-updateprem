import { getReverseGeocode } from "@/app/actions/getReverseGeocode";
import { useEffect, useState } from "react";
import useLocation from "./use-location";
import { toast } from "sonner";

const useDetectLocation = () => {
    const [deniedPermission, setDeniedPermission] = useState(false);
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
                setGeocode({ lat: latitude, long: longitude });

                const result = await getReverseGeocode(latitude, longitude);
                if (result?.placeId) {
                    setLocality({ placeId: result.placeId, structuredFormat: result.structuredFormat });
                }
            },
            error => {
                console.warn("Location permission denied or failed:", error);
                setDeniedPermission(true);
                toast.warning("Please allow location access for better experience.");
            },
            { timeout: 5000 }
        );
    }, [setGeocode, setLocality, deniedPermission]);
}

export default useDetectLocation;
