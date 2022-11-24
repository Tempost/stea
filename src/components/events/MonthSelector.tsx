import { MouseEvent } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { selectedMonth, changeMonth } from '@/utils/atoms';
import { ChevLeft, ChevRight } from '@/components/icons';
import { isValidDir } from '@/types/atoms';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function MonthSelector() {
  const monthState = useAtomValue(selectedMonth);
  const dispatch = useSetAtom(changeMonth);

  function handleMonthChange(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const direction = e.currentTarget.id;
    if (isValidDir(direction)) {
      dispatch({ dir: direction });
    }
  }

  return (
    <div className='grid grid-flow-col place-content-between border-b-2 pb-2'>
      <button
        className='btn-secondary btn-sm btn p-1'
        id='left'
        onClick={handleMonthChange}
      >
        {ChevLeft}
      </button>

      <h2 className='btn-secondary btn-sm btn w-36 p-1'>
        {MONTHS.at(monthState)}
      </h2>

      <button
        className='btn-secondary btn-sm btn p-1'
        id='right'
        onClick={handleMonthChange}
      >
        {ChevRight}
      </button>
    </div>
  );
}

export default MonthSelector;
