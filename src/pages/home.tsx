import { trpc } from '../utils/trpc';

function Home() {
  const members = trpc.useQuery(['family.get-family', {uid: 1}]).data;
  console.log(members);

  return <></>;
}

export default Home;
