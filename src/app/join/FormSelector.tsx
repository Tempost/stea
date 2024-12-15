'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import Radio from '@/components/styled-ui/Radio';
import { FORMTYPE } from '@/types/common';

function FormSelector() {
  const router = useRouter();
  const path = usePathname();
  const [type, setType] = useState<string>();

  return (
    <>
      <div>
        {FORMTYPE.map(selection => (
          <div
            key={selection}
            className='form-control flex-row'
          >
            <label
              htmlFor={`${selection}-id`}
              aria-label={selection}
              className='label cursor-pointer space-x-5'
              key={selection}
            >
              <Radio
                id={`${selection}-id`}
                className='radio radio-primary radio-md md:radio-sm'
                value={selection}
                name='app-select'
                onClick={() => setType(selection)}
              />
              <span className='label-text'>{selection}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        className='btn btn-primary w-full'
        onClick={() => {
          if (type) {
            router.push(`${path}/${type.toLowerCase()}`);
          }
        }}
      >
        Next
      </button>
    </>
  );
}

export default FormSelector;
