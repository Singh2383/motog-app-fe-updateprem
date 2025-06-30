'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from './use-auth';

// lib/api.ts
export interface FetchCarsParams {
    skip?: number;              // Default: 0
    limit?: number;             // Default: 10
    city?: string | null;
    vehicle_type?: 'car' | 'bike' | null;
    min_price?: number | null;
    max_price?: number | null;
    min_year?: number | null;
    max_year?: number | null;
    min_km_driven?: number | null;
    max_km_driven?: number | null;
}

export type CarDto = {
    vehicle_type: string;
    reg_no: string;
    kilometers_driven: number;
    price: number;
    usr_inp_city: string;
    city: string;
    seller_phone: string;
    description: string;
    id: number;
    user_id: number;
    is_active: boolean;
    created_at: string;
    owner_email: string;
    rc_details: RcDetails;
    images: ImageData[];
};

type RcDetails = {
    type: string;
    class: string;
    model: string;
    owner: string;
    engine: string;
    reg_no: string;
    status: string;
    chassis: string;
    reg_date: string;
    body_type: string;
    pucc_upto: string;
    rc_status: string;
    wheelbase: string;
    non_use_to: string | null;
    norms_type: string;
    noc_details: string | null;
    owner_count: string;
    permit_type: string | null;
    pucc_number: string;
    rc_financer: string;
    non_use_from: string | null;
    reference_id: number;
    status_as_on: string;
    is_commercial: boolean;
    mobile_number: string | null;
    permit_number: string | null;
    reg_authority: string;
    non_use_status: string | null;
    rc_expiry_date: string;
    unladen_weight: string;
    vehicle_colour: string;
    vehicle_number: string;
    challan_details: string | null;
    present_address: string;
    rc_standard_cap: string;
    verification_id: string;
    blacklist_status: string;
    vehicle_category: string;
    vehicle_tax_upto: string | null;
    blacklist_details: string | null;
    owner_father_name: string;
    permanent_address: string;
    permit_issue_date: string | null;
    permit_valid_from: string | null;
    permit_valid_upto: string | null;
    gross_vehicle_weight: string;
    national_permit_upto: string | null;
    vehicle_cylinders_no: string;
    split_present_address: SplitAddress;
    vehicle_seat_capacity: string;
    national_permit_number: string | null;
    vehicle_cubic_capacity: string;
    vehicle_insurance_upto: string;
    split_permanent_address: SplitAddress;
    vehicle_sleeper_capacity: string;
    national_permit_issued_by: string | null;
    vehicle_manufacturer_name: string;
    vehicle_standing_capacity: string;
    vehicle_insurance_company_name: string;
    vehicle_insurance_policy_number: string;
    vehicle_manufacturing_month_year: string;
};

type SplitAddress = {
    city: string[];
    state: [string, string][];
    country: string[];
    pincode: string;
    district: string[];
    address_line: string;
};

type ImageData = {
    id: number;
    url: string;
    is_primary: boolean;
};

export interface CarsResponse {
    total: number;
    cars: CarDto[];
}

async function fetchCars(params: FetchCarsParams, token: string): Promise<CarDto[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') url.searchParams.append(k, String(v));
    });
    const res = await fetch(url.toString(), { next: { revalidate: 60 }, headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
}

export function useCars(params: FetchCarsParams) {
    const token = useAuth(state => state.token);
    return useQuery({
        queryKey: ['cars', params],
        queryFn: () => fetchCars(params, token)
    });
}
