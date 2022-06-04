import { trpc } from '../utils/trpc';

function Home() {
  const members = trpc.useQuery(['get-members']).data;
  console.log(members);

  return <></>;
}

export default Home;
