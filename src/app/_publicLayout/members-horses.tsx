import HorseTable from '@/components/tables/Horses';
import MemberTable from '@/components/tables/Members';
import { createFileRoute } from '@tanstack/react-router';
import { getMembersAndPoints } from '../../server/functions/serverFunctions';

export const Route = createFileRoute('/_publicLayout/members-horses')({
  component: MembersAnHorses,
  loader: () => getMembersAndPoints(),
});

function MembersAnHorses() {
  const { members, horses } = Route.useLoaderData();

  return (
    <div className='p-4 sm:p-8 md:grid md:grid-flow-col md:place-content-evenly md:p-10 lg:p-16'>
      <MemberTable
        members={members}
        search
        paginate
      />
      <HorseTable
        horses={horses}
        search
        paginate
      />
    </div>
  );
}
