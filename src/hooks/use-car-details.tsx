'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CarDto } from './use-cars';

export function useCarDetails(listingId: string) {
    return useQuery({
        queryKey: ['listing', listingId],
        queryFn: async () => (await axios.get<CarDto>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/${listingId}`)).data,
        enabled: !!listingId, // Only fetch if carId is truthy
        staleTime: 1000 * 60 * 5, // Optional: cache for 5 minutes
    });
}
