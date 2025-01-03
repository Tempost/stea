'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Radio from '@/components/styled-ui/Radio';
import { FORMTYPE } from '@/types/common';
import { Button } from '@/components/styled-ui/Button';
import { Label } from '@/components/styled-ui/Label';

function FormSelector() {
  const router = useRouter();
  const path = usePathname();
  const [type, setType] = useState<string>();
  useEffect(() => {
    if (type) {
      router.prefetch(`${path}/${type}`);
    }
  }, [router, path, type]);

  return (
    <>
      <div>
        {FORMTYPE.map(selection => (
          <div
            key={selection}
            className='form-control flex-row'
          >
            <Label
              htmlFor={`${selection}-id`}
              aria-label={selection}
              innerClassName='capitalize space-x-5'
              key={selection}
            >
              <Radio
                id={`${selection}-id`}
                name='form-select'
                className='radio-md md:radio-sm'
                value={selection}
                onClick={() => setType(selection)}
              />
              <span className='label-text'>{selection}</span>
            </Label>
          </div>
        ))}
      </div>
      <Button
        variant='primary'
        className='w-full'
        onClick={() => {
          if (type) {
            router.push(`${path}/${type}`);
          }
        }}
      >
        Next
      </Button>
    </>
  );
}

export default FormSelector;
