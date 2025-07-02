'use client';
import FilterSection from './filter-section';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const YEARS = Array.from({ length: 15 }, (_, i) => String(2025 - i));

export default function YearFilter({
  year,
  setYear,
}: {
  year?: string;
  setYear: (v?: string) => void;
}) {
  return (
    <FilterSection title="Year">
      <Select
        value={year ?? ''}
        onValueChange={(v) => setYear(v || undefined)}
      >
        <SelectTrigger className="w-full h-9">
          <SelectValue placeholder="Any year" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {year && (
        <button
          type="button"
          onClick={() => setYear(undefined)}
          className="mt-2 text-xs text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </FilterSection>
  );
}
