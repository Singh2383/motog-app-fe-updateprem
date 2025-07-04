'use client';
import BrandFilter from './brand-filter';
import FuelFilter from './fuel-filter';
import YearFilter from './year-filter';
import TransmissionFilter from './transmission-filter';
import OwnerFilter from './owner-filter';
import PriceRangeFilter from './price-range-filter';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface FiltersSidebarProps {
    brand?: string;
    setBrand: (v?: string) => void;
    fuel?: string;
    setFuel: (v?: string) => void;
    year?: string;
    setYear: (v?: string) => void;
    transmission?: string;
    setTransmission: (v?: string) => void;
    owner?: string;
    setOwner: (v?: string) => void;
    priceRange: [number, number];
    setPriceRange: (v: [number, number]) => void;
    verifiedOnly: boolean;
    setVerifiedOnly: (v: boolean) => void;
    onFilterChange: () => void;
    onReset: () => void;
}

export default function FiltersSidebar({
    brand,
    setBrand,
    fuel,
    setFuel,
    year,
    setYear,
    transmission,
    setTransmission,
    owner,
    setOwner,
    priceRange,
    setPriceRange,
    verifiedOnly,
    setVerifiedOnly,
    onFilterChange,
    onReset,
}: FiltersSidebarProps) {
    return (
        <div className="p-4 space-y-4 w-full max-w-xs overflow-y-auto border-1 rounded-xl shadow-xl">
            <BrandFilter brand={brand} setBrand={setBrand} />
            <FuelFilter fuel={fuel} setFuel={setFuel} />
            <YearFilter year={year} setYear={setYear} />
            <TransmissionFilter
                transmission={transmission}
                setTransmission={setTransmission}
            />
            <OwnerFilter owner={owner} setOwner={setOwner} />
            <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />

            {/* Verified Toggle */}
            <div className="flex items-center gap-2 mt-4">
                <Switch
                    id="verified"
                    checked={verifiedOnly}
                    onCheckedChange={setVerifiedOnly}
                />
                <Label htmlFor="verified" className="text-sm">
                    Only Verified Cars
                </Label>
            </div>

            <div className="pt-4 flex justify-between text-sm">
                <button
                    onClick={onReset}
                    className="text-gray-500 hover:underline rounded-md px-2 py-1"
                >
                    Reset
                </button>
                <button
                    onClick={onFilterChange}
                    className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}
