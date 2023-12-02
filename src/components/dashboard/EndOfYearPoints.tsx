import Modal from '@/components/styled-ui/Modal';
import { useState } from 'react';

const years = Array.from({ length: 10 }, (_, i) => i + 2023);
const currYear = new Date().getFullYear();

function EndOfYearPoints() {
  const [yearSelect, setYearSelect] = useState(currYear);

  return (
    <Modal
      id='eoy-modal'
      buttonLabel='End of Year Points'
      onClick={() => {
        setYearSelect(currYear);
      }}
      ok={
        <a
          className='btn btn-sm'
          href={`/api/dashboard/download/points/endofyear?${new URLSearchParams(
            { year: yearSelect.toString() }
          )}`}
        >
          Download
        </a>
      }
    >
      <h3 className='text-lg font-bold'>Enter Show Information</h3>

      <div className='form-control w-full'>
        <label
          htmlFor='show-year'
          aria-label='Show Year'
          className='label'
        >
          <span className='label-text'>Show Year*</span>
        </label>
        <select
          name='show-year'
          id='show-year'
          className='select-bordered select-primary select w-fit md:select-sm'
          value={yearSelect}
          onChange={e => {
            e.preventDefault();
            setYearSelect(Number.parseInt(e.target.value));
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
      </div>
    </Modal>
  );
}

export default EndOfYearPoints;
