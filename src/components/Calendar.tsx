'use client';
import { MouseEvent, useReducer } from 'react';

import { filterByMonths } from '@/utils/filterByMonths';
import CalendarEvents from '@/components/events/CalendarEvent';
import { Show } from '@prisma/client';
import { ChevLeft, ChevRight } from '@/components/icons';

interface CalendarProps {
  shows: Array<Show>;
}

interface MonthAction {
  dir: string;
}

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

const currMonth = new Date().getMonth();

const changeMonth = (month: number, action: MonthAction) => {
  switch (action.dir) {
    case 'left':
      return (((month - 1) % 12) + 12) % 12;
    case 'right':
      return (month + 1) % 12;
    default:
      throw new Error(`Unsupported action :: action:${action.dir}`);
  }
};

export default function Calendar({ shows }: CalendarProps) {
  const [month, dispatch] = useReducer(changeMonth, currMonth);

  const filteredShows = filterByMonths(shows, month);

  function handleMonthChange(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const direction = e.currentTarget.id;
    dispatch({ dir: direction });
  }

  return (
    <>
      <div className='grid grid-flow-col place-content-between border-b-2 pb-2'>
        <button
          className='btn btn-secondary btn-sm p-1'
          id='left'
          onClick={handleMonthChange}
        >
          {ChevLeft}
        </button>

        <h2 className='btn btn-secondary btn-sm w-36 p-1'>
          {MONTHS.at(month)}
        </h2>

        <button
          className='btn btn-secondary btn-sm p-1'
          id='right'
          onClick={handleMonthChange}
        >
          {ChevRight}
        </button>
      </div>

      {filteredShows!.map((show, index) => (
        <CalendarEvents
          key={`${show.showName}-${index}`}
          show={show}
        />
      ))}
    </>
  );
}
