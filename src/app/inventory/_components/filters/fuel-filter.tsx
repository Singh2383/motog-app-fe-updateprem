'use client';
import FilterSection from './filter-section';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FUELS = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];

export default function FuelFilter({
  fuel,
  setFuel,
}: {
  fuel?: string;
  setFuel: (v?: string) => void;
}) {
  return (
    <FilterSection title="Fuel">
      <RadioGroup
        value={fuel ?? ''}
        onValueChange={(v) => setFuel(v || undefined)}
        className="space-y-2"
      >
        {FUELS.map((f) => (
          <div key={f} className="flex items-center space-x-2">
            <RadioGroupItem value={f} id={`fuel-${f}`} />
            <label htmlFor={`fuel-${f}`} className="text-sm leading-none">
              {f}
            </label>
          </div>
        ))}
      </RadioGroup>
      {fuel && (
        <button
          type="button"
          onClick={() => setFuel(undefined)}
          className="mt-2 text-xs text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </FilterSection>
  );
}