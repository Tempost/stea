'use client';
import { Column } from '@tanstack/react-table';

interface ShowYearFilterProps<TData> {
  column?: Column<TData>;
}

const years = Array.from({ length: 10 }, (_, i) => i + 2023);

function ShowYearFilter<TData>({ column }: ShowYearFilterProps<TData>) {
  return (
    <select
      name='show-year'
      id='show-year'
      className='select select-bordered select-primary select-xs ml-2 w-fit'
      value={column?.getFilterValue() as number}
      onChange={e => {
        e.preventDefault();
        column?.setFilterValue(Number.parseInt(e.target.value));
      }}
    >
      {years.map(year => (
        <option
          key={year}
          value={year}
        >
          {year}
        </option>
      ))}
    </select>
  );
}
export default ShowYearFilter;
