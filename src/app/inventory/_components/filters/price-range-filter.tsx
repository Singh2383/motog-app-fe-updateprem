'use client';
import FilterSection from './filter-section';
import { Slider } from '@/components/ui/slider';

export default function PriceRangeFilter({
  priceRange,
  setPriceRange,
}: {
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
}) {
  return (
    <FilterSection title="Price (₹L)">
      <div className="px-2">
        <Slider
          value={priceRange}
          onValueChange={(v) =>
            setPriceRange([v[0] as number, v[1] as number] as [number, number])
          }
          min={1}
          max={20}
          step={0.5}
        />
        <div className="mt-2 text-sm text-gray-600 flex justify-between">
          <span>{priceRange[0]}L</span>
          <span>{priceRange[1]}L</span>
        </div>
      </div>
    </FilterSection>
  );
}
