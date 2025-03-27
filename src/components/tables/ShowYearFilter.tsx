'use client';
import { Column } from '@tanstack/react-table';
import Select from '../styled-ui/Select';

interface ShowYearFilterProps<TData> {
  column?: Column<TData>;
}

const years = Array.from({ length: 10 }, (_, i) => i + 2023);

function ShowYearFilter<TData>({ column }: ShowYearFilterProps<TData>) {
  return (
    <Select
      id='show-year'
      name='show-year'
      size='xs'
      className='w-fit'
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
    </Select>
  );
}
export default ShowYearFilter;
