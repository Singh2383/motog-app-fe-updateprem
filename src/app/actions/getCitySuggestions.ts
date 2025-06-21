'use server'

export async function getCitySuggestions(input: string) {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const endpoint = 'https://places.googleapis.com/v1/places:autocomplete';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey!,
                'X-Goog-FieldMask': 'suggestions.placePrediction.structuredFormat,suggestions.placePrediction.placeId',
            },
            body: JSON.stringify({
                input,
                includedPrimaryTypes: 'locality',
                languageCode: 'en',
                includedRegionCodes: ['in'],
            }),
        });

        const data = await response.json();
        console.log("printing data:");
        return ({ data: data });
    } catch (err) {
        console.log("error fetching locality suggestions", err);
        return ({ error: err instanceof Error ? err.message : "Failed autocomplete suggestion." });
    }
}

