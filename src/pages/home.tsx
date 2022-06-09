import { trpc } from '../utils/trpc';

function Home() {
  const members = trpc.useQuery(['member.get-members']).data;

  console.log(members);

  return <></>;
}

export default Home;
