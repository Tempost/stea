'use client';
import { MouseEvent, useReducer } from 'react';

import CalendarEvents from '@/components/events/CalendarEvent';
import { ChevLeft, ChevRight } from '@/components/icons';
import { ShowCalendar } from '@/server/prisma/queries/args';
import { Button } from './styled-ui/Button';

interface CalendarProps {
  shows: Array<ShowCalendar>;
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

function filterByMonths(
  shows: Array<ShowCalendar>,
  currMonth: number,
): Array<ShowCalendar> | undefined {
  if (!shows) return;

  return shows.filter(show => {
    if (new Date(show.showDate).getMonth() === currMonth) {
      return true;
    }
    return false;
  });
}

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
      <div className='join place-content-center space-x-1 border-b-2 border-gray-200 pb-2'>
        <Button
          variant='secondary'
          size='sm'
          id='left'
          onClick={handleMonthChange}
          join={true}
        >
          {ChevLeft}
        </Button>

        <Button
          className='w-36 cursor-default p-1'
          variant='secondary'
          size='sm'
          id='middle'
          join={true}
        >
          {MONTHS.at(month)}
        </Button>

        <Button
          variant='secondary'
          size='sm'
          id='right'
          onClick={handleMonthChange}
          join={true}
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
