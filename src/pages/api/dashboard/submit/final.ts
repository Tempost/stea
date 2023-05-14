import type {
  NextApiRequest,
  NextApiResponse,
} from 'next/dist/shared/lib/utils';
import { prisma } from '@/server/prisma';
import { isShowUniqueArgs } from '@/types/common';
import { getToken } from 'next-auth/jwt';
import { EntrySubmissionSchema } from '@/utils/zodschemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query;
  if (!isShowUniqueArgs(params)) {
    console.log('Invalid query param', JSON.stringify(params, null, 0));
    return res.status(500).json({ message: 'Invalid query param passed.' });
  }

  const token = await getToken({ req });
  if (!token) {
    console.error('Attempted to access api protected by auth.');
    return res.status(401).json({ message: 'Access Not Allowed.' });
  }

  const existingShow = await prisma.show.findUnique({
    where: {
      uid: params.showUID,
    },
    select: {
      uid: true,
      showDate: true,
      showName: true,
    },
  });

  if (!existingShow) {
    console.error("Attempted to update show that doesn't exist.");
    return res.status(400).json({ message: 'Selected show not found.' });
  }

  const body = EntrySubmissionSchema.parse(req.body);

  const dbActions = new Array();
  for (const entry of body) {
    const relations = {
      member: {
        connect: {
          fullName: entry.fullName,
        },
      },
      horse: {
        connect: {
          horseRN: entry.horseRN,
        },
      },
      shows: {
        connect: {
          uid: existingShow.uid,
        },
      },
      points: {
        create: {
          points: entry.points,
          place: entry.placing,
          show: {
            connect: {
              uid: existingShow.uid,
            },
          },
        },
      },
    };

    dbActions.push(
      prisma.riderCombo.upsert({
        where: {
          memberName_horseName_division: {
            memberName: entry.fullName,
            horseName: entry.horseRN,
            division: entry.division,
          },
        },
        update: {
          division: entry.division,
          totalPoints: { increment: entry.points },
          totalShows: { increment: 1 },
          completedHT: entry.rideType === 'HT',
          ...relations,
        },
        create: {
          division: entry.division,
          totalPoints: entry.points,
          totalShows: 1,
          ...relations,
        },
      })
    );
  }

  await Promise.all(dbActions).then(() =>
    prisma.show.update({
      where: { uid: existingShow.uid },
      data: { reviewed: true },
    })
  );
  return res.status(200).json({ success: true, message: 'WOW' });
}
