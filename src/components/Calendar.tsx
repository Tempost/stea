'use client';
import { MouseEvent, useReducer } from 'react';

import { filterByMonths } from '@/utils/filterByMonths';
import CalendarEvents from '@/components/events/CalendarEvent';
import { Show } from '@prisma/client';
import { ChevLeft, ChevRight } from '@/components/icons';
import { Button } from './styled-ui/Button';

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
        <Button
          variant='secondary'
          size='sm'
          id='left'
          onClick={handleMonthChange}
        >
          {ChevLeft}
        </Button>

        <Button
          className='w-36 cursor-default p-1'
          variant='secondary'
          size='sm'
          id='middle'
        >
          {MONTHS.at(month)}
        </Button>

        <Button
          variant='secondary'
          size='sm'
          id='right'
          onClick={handleMonthChange}
        >
          {ChevRight}
        </Button>
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
