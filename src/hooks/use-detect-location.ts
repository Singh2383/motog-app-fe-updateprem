import { useEffect, useState } from "react";

type locationStateType = { latitude: null | Number, longitude: null | Number, city: String };

const GEOCODING_API = 'https://maps.googleapis.com/maps/api/geocode/json';

const useDetectLocation = (apiKey: string) => {
    const [location, setLocation] = useState<locationStateType>({ latitude: null, longitude: null, city: 'New Delhi' });
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
                    const data = await res.json();
                    console.log("reverse geocode data:", data);
                    if (data.status === 'OK' && data.results.length > 0) {
                        const components = data.results[0].address_components;
                        const city = components.find((c: any) => c.types.includes('locality'))?.long_name
                            || components.find((c: any) => c.types.includes('administrative_area_level_2'))?.long_name
                            || 'New Delhi';

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
    }, []);

    return { location, permissionDenied };
}

export default useDetectLocation;
