import { createFileRoute, Link } from '@tanstack/react-router';

import { Button } from '@/components/styled-ui/Button';
import { FORMTYPE } from '@/types/common';
import { capitalize } from '@/utils/helpers';

export const Route = createFileRoute('/_publicLayout/_joinLayout/join/')({
  component: JoinPage,
});

function JoinPage() {
  return (
    <section>
      <h2 className='border-b-2 border-gray-200 text-2xl'>Join Online Below</h2>
      <fieldset className='fieldset place-items-center gap-2'>
        <legend className='fieldset-legend'>
          Membership Application type:
        </legend>
        <div className='flex flex-col place-items-center gap-1'>
          {FORMTYPE.map(selection => (
            <Link
              id={`${selection}-id`}
              key={selection}
              to={`${Route.fullPath}/${selection}`}
            >
              <Button variant='link'>{capitalize(selection)}</Button>
            </Link>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
