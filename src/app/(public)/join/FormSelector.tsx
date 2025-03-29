'use client';
import Form from '@/components/form/Form';
import { Button } from '@/components/styled-ui/Button';
import { FORMTYPE } from '@/types/common';
import { capitalize } from '@/utils/helpers';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Radio } = Form;

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
    <fieldset className='fieldset place-items-center gap-2'>
      <legend className='fieldset-legend'>Membership Application type:</legend>
      <div className='flex flex-col gap-1'>
        {FORMTYPE.map(selection => (
          <Radio
            id={`${selection}-id`}
            key={selection}
            name='form-select'
            value={selection}
            label={capitalize(selection)}
            size='sm'
            onClick={() => setType(selection)}
          />
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
    </fieldset>
  );
}

export default FormSelector;
