import { MouseEvent, useReducer } from 'react';

import { ChevLeft, ChevRight } from '@/components/icons';
import { inferQueryOutput } from '@/utils/trpc';

interface MonthState {
  month: number;
};

type ValidDir = 'left' | 'right';

interface MonthAction {
  dir: ValidDir;
};

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

const initialState: MonthState = {
  month: new Date().getMonth()
};

function isValidDir(dir: any): dir is ValidDir {
  return dir === 'left' || dir === 'right';
}

function reducer(state: MonthState, action: MonthAction) {
  console.log(action);
  switch (action.dir) {
    case 'left':
      if (state.month < 1) {
        return {month: 11}
      }

      return { month: state.month - 1 };
    case 'right':
      if (state.month >= 11) {
        return {month: 0}
      }
      return { month: state.month + 1 };
    default:
      throw new Error(`Invalid action taking on reducer... ${action.dir}`);
  }
}

function filterMonths(shows: inferQueryOutput<'shows.get-shows'>, currMonth: number) {
  return shows.filter(show => {
    if (show.showDate.getMonth() === currMonth) {
      return true
    }
    return false
  })
}

function MonthSelector() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMonthChange(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const direction = e.currentTarget.id;
    if (isValidDir(direction)) {
      dispatch({ dir: direction })
    }
  }

  return (
    <>
      <button
        className='btn-secondary btn p-1'
        id='left'
        onClick={handleMonthChange}
      >
        {ChevLeft}
      </button>

      <h2 className='btn-secondary btn p-1'>
        {MONTHS.at(state.month)}
      </h2>

      <button
        className='btn-secondary btn p-1'
        id='right'
        onClick={handleMonthChange}
      >
        {ChevRight}
      </button>
    </>
  );
}

export default MonthSelector;
