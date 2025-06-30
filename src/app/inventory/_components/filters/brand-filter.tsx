'use client';
import FilterSection from './filter-section';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const BRANDS = [
  'Maruti',
  'Hyundai',
  'Honda',
  'Tata',
  'Toyota',
  'Mahindra',
  'Kia',
  'Renault',
];

export default function BrandFilter({
  brand,
  setBrand,
}: {
  brand?: string;
  setBrand: (v?: string) => void;
}) {
  return (
    <FilterSection title="Brand">
      <RadioGroup
        value={brand ?? ''}
        onValueChange={(v) => setBrand(v || undefined)}
        className="space-y-2"
      >
        {BRANDS.map((b) => (
          <div key={b} className="flex items-center space-x-2">
            <RadioGroupItem value={b} id={`brand-${b}`} />
            <label htmlFor={`brand-${b}`} className="text-sm leading-none">
              {b}
            </label>
          </div>
        ))}
      </RadioGroup>
      {brand && (
        <button
          type="button"
          onClick={() => setBrand(undefined)}
          className="mt-2 text-xs text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </FilterSection>
  );
}
