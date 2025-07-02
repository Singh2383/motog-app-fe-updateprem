'use client';
import FilterSection from './filter-section';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const OWNERS = [
  '1st Owner',
  '2nd Owner',
  '3rd Owner',
  '4th+ Owner',
];

export default function OwnerFilter({
  owner,
  setOwner,
}: {
  owner?: string;
  setOwner: (v?: string) => void;
}) {
  return (
    <FilterSection title="Ownership">
      <RadioGroup
        value={owner ?? ''}
        onValueChange={(v) => setOwner(v || undefined)}
        className="space-y-2"
      >
        {OWNERS.map((o) => (
          <div key={o} className="flex items-center space-x-2">
            <RadioGroupItem value={o} id={`owner-${o}`} />
            <label htmlFor={`owner-${o}`} className="text-sm leading-none">
              {o}
            </label>
          </div>
        ))}
      </RadioGroup>
      {owner && (
        <button
          type="button"
          onClick={() => setOwner(undefined)}
          className="mt-2 text-xs text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </FilterSection>
  );
}
