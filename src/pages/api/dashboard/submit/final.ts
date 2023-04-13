import type {
  NextApiRequest,
  NextApiResponse,
} from 'next/dist/shared/lib/utils';
import { prisma } from '@/server/prisma';
import { isShowUniqueArgs } from '@/types/common';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query;
  if (!isShowUniqueArgs(params)) {
    console.log('Invalid query param', JSON.stringify(params, null, 0));
    return res.status(500).json({ message: 'Invalid query param passed.' });
  }

  // const token = await getToken({ req });
  // if (!token) {
  //   console.error('Attempted to access api protected by auth.');
  //   return res.status(401).json({ message: 'Access Not Allowed.' });
  // }

  // const existingShow = await prisma.show.findUnique({
  //   where: {
  //     uid: params.showUID,
  //   },
  // });

  // if (!existingShow) {
  //   console.error("Attempted to update show that doesn't exist.");
  //   return res.status(400).json({ message: 'Selected show not found.' });
  // }
  // const relations = {
  //   member: {
  //     connect: {
  //       fullName: entryName,
  //     },
  //   },
  //   horse: {
  //     connect: {
  //       horseRN: entry.horseName,
  //     },
  //   },
  //   shows: {
  //     connect: {
  //       uid: showUID,
  //     },
  //   },
  //   points: {
  //     create: {
  //       points: riderFinalPoints,
  //       place: entry.placing,
  //       show: {
  //         connect: {
  //           uid: showUID,
  //         },
  //       },
  //     },
  //   },
  // };
  // promises.push(
  //   prisma.riderCombo.upsert({
  //     where: {
  //       memberName_horseName_division: {
  //         memberName: entryName,
  //         horseName: entry.horseName,
  //         division: entry.division,
  //       },
  //     },
  //     update: {
  //       division: entry.division,
  //       totalPoints: { increment: riderFinalPoints },
  //       totalShows: { increment: 1 },
  //       completedHT: entry.rideType === 'HT',
  //       ...relations,
  //     },
  //     create: {
  //       division: entry.division,
  //       totalPoints: riderFinalPoints,
  //       totalShows: 1,
  //       ...relations,
  //     },
  //   })
  // );

  // await Promise.all(promises).then(() =>
  //   // prisma.show.update({ where: { uid: showUID }, data: { reviewed: true } })
  //   console.log('Pog')
  // );
}
