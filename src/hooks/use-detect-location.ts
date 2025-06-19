import { useEffect, useState } from "react";

const GEOCODING_API = 'https://maps.googleapis.com/maps/api/geocode/json';

type LocationStateType = { latitude: null | number, longitude: null | number, city: string };

interface IAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

interface IReverseGeoCoding {
    results: {
        address_components: IAddressComponent[];
    }[];
    status: string;
}

const useDetectLocation = (apiKey: string) => {
    const [location, setLocation] = useState<LocationStateType>({ latitude: null, longitude: null, city: 'Select City' });
    const [permissionDenied, setPermissionDenied] = useState(false);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            console.warn("Geolocation not supported!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(`${GEOCODING_API}?latlng=${latitude},${longitude}&key=${apiKey}`);
                    const data: IReverseGeoCoding = await res.json();
                    console.log("reverse geocode data:", data);
                    if (data.status === 'OK' && data.results.length > 0) {
                        const components = data.results[0].address_components;
                        const city = components.find((c) => c.types.includes('locality'))?.long_name
                            || components.find((c) => c.types.includes('administrative_area_level_2'))?.long_name
                            || 'Select City';

                        setLocation({ city, latitude, longitude });
                    } else throw new Error(data.status);
                } catch (err) {
                    console.warn('Reverse geocoding failed:', err);
                    setLocation({
                        city: 'New Delhi',
                        latitude,
                        longitude,
                    });
                }
            },
            error => {
                console.warn("Location permission denied or failed:", error);
                setPermissionDenied(true);
            },
            { timeout: 5000 }
        );
    }, [apiKey]);

    return { location, permissionDenied };
}

export default useDetectLocation;
