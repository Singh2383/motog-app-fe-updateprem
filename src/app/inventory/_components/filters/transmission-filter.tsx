'use client';
import FilterSection from './filter-section';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const TRANSMISSIONS = ['Manual', 'Automatic'];

export default function TransmissionFilter({
  transmission,
  setTransmission,
}: {
  transmission?: string;
  setTransmission: (v?: string) => void;
}) {
  return (
    <FilterSection title="Transmission">
      <RadioGroup
        value={transmission ?? ''}
        onValueChange={(v) => setTransmission(v || undefined)}
        className="space-y-2"
      >
        {TRANSMISSIONS.map((t) => (
          <div key={t} className="flex items-center space-x-2">
            <RadioGroupItem value={t} id={`trans-${t}`} />
            <label htmlFor={`trans-${t}`} className="text-sm leading-none">
              {t}
            </label>
          </div>
        ))}
      </RadioGroup>
      {transmission && (
        <button
          type="button"
          onClick={() => setTransmission(undefined)}
          className="mt-2 text-xs text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </FilterSection>
  );
}