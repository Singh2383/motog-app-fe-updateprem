'use server'

const GEOCODING_API = 'https://maps.googleapis.com/maps/api/geocode/json';
const apiKey = process.env.GOOGLE_MAP_API_KEY;

interface IAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export interface IReverseGeoCoding {
    results: {
        address_components: IAddressComponent[];
        formatted_address: string;
        place_id: string;
    }[];
    status: string;
    error?: {
        status: string;
        code: number;
    };
}

export async function getReverseGeocode(latitude: number, longitude: number) {
    try {
        const res = await fetch(`${GEOCODING_API}?latlng=${latitude},${longitude}&key=${apiKey}`);
        const data: IReverseGeoCoding = await res.json();

        if (!data.results || data.results.length === 0) return { error: data.error };

        const topResult = data.results[0]; // First result is usually the most accurate
        //const [mainText, ...rest] = topResult.formatted_address.split(', ');
        // const secondaryText = rest.join(', ');

        const city = topResult.address_components.find(c =>
            c.types.includes('locality') || c.types.includes('administrative_area_level_3')
        )?.long_name;

        const state = topResult.address_components.find(c =>
            c.types.includes('administrative_area_level_1')
        )?.long_name;

        const country = topResult.address_components.find(c =>
            c.types.includes('country')
        )?.long_name;

        return {
            placeId: topResult.place_id,
            structuredFormat: {
                mainText: { text: city || state || 'Unknown' },
                secondaryText: { text: [state, country].filter(Boolean).join(', ') }
            }
        }
    } catch (err) {
        console.error("failed reverse geocoding", err);
        return ({ error: { status: err instanceof Error ? err.message : "Failed reverse geocode", code: 500 } });
    }
}

