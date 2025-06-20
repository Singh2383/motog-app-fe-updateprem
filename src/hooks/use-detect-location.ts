import { getReverseGeocode } from "@/app/actions/getReverseGeocode";
import { useEffect, useState } from "react";
import useLocation from "./use-location";

//type LocationStateType = { latitude: null | number, longitude: null | number, location:  };

const useDetectLocation = () => {
    //const [location, setLocation] = useState<LocationStateType>({ latitude: null, longitude: null, location: 'Select City' });
    const [permissionDenied, setPermissionDenied] = useState(false);
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
                console.log("reverse geocode data:", result);
                if (result?.placeId) {
                    console.log("setting locality");
                    setLocality({ placeId: result.placeId, structuredFormat: result.structuredFormat });
                }
            },
            error => {
                console.warn("Location permission denied or failed:", error);
                setPermissionDenied(true);
            },
            { timeout: 5000 }
        );
    }, []);

    return { permissionDenied };
}

export default useDetectLocation;
