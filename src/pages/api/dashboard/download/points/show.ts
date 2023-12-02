import { prisma } from '@/server/prisma';
import { readableDateTime } from '@/utils/helpers';
import { Prisma } from '@prisma/client';
import { stringify } from 'csv';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

const queryParams = z.object({
  show: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'GET') {
    console.warn('Attempted to access via unsupported method');
    return res.status(405).json({ message: 'Method Not Allowed.' });
  }

  const token = await getToken({ req });
  if (token) {
    console.warn('Attempted to access api protected by auth.');
    return res.status(401).json({ message: 'Access Not Allowed.' });
  }

  const params = queryParams.safeParse(req.query);
  if (!params.success) {
    console.warn(
      `Attempted downloading points with ${JSON.stringify(req.query)}`
    );
    return res.status(400).json({ message: 'Incorrect query params.' });
  }

  const CSV = stringify({
    header: true,
    columns: [
      { key: 'RiderCombo.memberName', header: 'Member Name' },
      { key: 'RiderCombo.horseName', header: 'Horse Rode' },
      { key: 'RiderCombo.division', header: 'Division' },
      { key: 'points', header: 'Points' },
      { key: 'place', header: 'Place' },
    ],
  });

  try {
    const points = await prisma.points.findMany({
      where: {
        showUid: params.data.show,
      },
      select: {
        points: true,
        place: true,
        show: {
          select: {
            showName: true,
            showDate: true,
          },
        },
        RiderCombo: {
          select: {
            division: true,
            totalPoints: true,
            totalShows: true,
            completedHT: true,
            multiVenue: true,
            memberName: true,
            horseName: true,
          },
        },
      },
    });

    if (points.length === 0) {
      return res.status(204).end();
    }

    const filename = `${points[0].show.showName}-${readableDateTime(
      points[0].show.showDate
    )}.csv`;

    await new Promise(function (resolve) {
      points.forEach(row => CSV.write(row));

      res.setHeader('Content-Type', 'application/csv');

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      CSV.pipe(res).on('close', resolve);
      CSV.end();
    });
  } catch (e) {
    res.status(500);
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json({ message: 'Unable to fetch points from database.' });
    }

    return res.json({ message: 'Internal Server Error.' });
  }
}
