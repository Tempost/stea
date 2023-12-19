import type {
  NextApiRequest,
  NextApiResponse,
} from 'next/dist/shared/lib/utils';
import { prisma } from '@/server/prisma';
import { getToken } from 'next-auth/jwt';
import { EntrySubmissionSchema } from '@/utils/zodschemas';

const currentDate = new Date();
const capDate = new Date();
capDate.setMonth(10);
capDate.setDate(30);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.url);
  const { showUID } = req.query;

  if (!showUID) {
    console.log('Invalid query param', JSON.stringify(showUID, null, 0));
    return res.status(500).json({ message: 'Invalid query param passed.' });
  }

  const token = await getToken({ req });
  if (!token) {
    console.warn('Attempted to access api protected by auth.');
    return res.status(401).json({ message: 'Access Not Allowed.' });
  }

  const existingShow = await prisma.show.findUnique({
    where: {
      uid: showUID as string,
    },
    select: {
      uid: true,
      showDate: true,
      showName: true,
    },
  });

  if (!existingShow) {
    console.warn("Attempted to update show that doesn't exist.");
    return res.status(400).json({
      message: 'Selected show not found or points were already submitted.',
    });
  }

  const body = EntrySubmissionSchema.parse(req.body);

  const dbActions = [];
  let year = existingShow.showDate.getFullYear();

  if (year == currentDate.getFullYear() && existingShow.showDate > capDate) {
    year += 1;
  }

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
          memberName_horseName_division_showYear: {
            memberName: entry.fullName,
            horseName: entry.horseRN,
            division: entry.division,
            showYear: existingShow.showDate.getFullYear(),
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
          showYear: year,
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

  return res.status(200).json({ success: true, message: '' });
}
