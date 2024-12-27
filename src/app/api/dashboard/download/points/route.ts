import { prisma } from '@/server/prisma';
import { readableDateTime } from '@/utils/helpers';
import { Prisma } from '@prisma/client';
import { stringify } from 'csv';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const queryParams = z.object({
  year: z.string().optional(),
  show: z.string().optional(),
});

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const params = queryParams.safeParse(req.query);
  if (!params.success) {
    console.warn(
      `Attempted downloading points with ${JSON.stringify(req.query)}`,
    );
    return res.status(400).json({ message: 'Incorrect query params.' });
  }

  try {
    if (params.data.show) {
      await getPointsForShow(params.data.show, res);
    }

    if (params.data.year) {
      await getPointsForYear(Number.parseInt(params.data.year), res);
    }
  } catch (e) {
    res.status(500);
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json({ message: 'Unable to fetch points from database.' });
    }

    return res.json({ message: 'Internal Server Error.' });
  }
}

async function getPointsForYear(showYear: number, res: NextApiResponse) {
  const CSV = stringify({
    header: true,
    columns: [
      { key: 'memberName', header: 'Member Name' },
      { key: 'horseName', header: 'Horse Rode' },
      { key: 'totalShows', header: 'Shows Attended' },
      { key: 'division', header: 'Division' },
      { key: 'member.memberStatusType', header: 'Status' },
      { key: 'totalPoints', header: 'Points' },
    ],
  });

  const riderEndofYear = await prisma.riderCombo.findMany({
    where: {
      showYear,
    },
    select: {
      memberName: true,
      totalPoints: true,
      totalShows: true,
      horseName: true,
      division: true,
      member: {
        select: {
          memberStatusType: true,
        },
      },
    },
    orderBy: [
      {
        division: 'desc',
      },
      {
        member: {
          memberStatusType: 'asc',
        },
      },
      { totalPoints: 'desc' },
    ],
  });

  if (riderEndofYear.length === 0) {
    res.status(204).end();
    return;
  }

  const filename = `Points_For_${showYear}.csv`;

  await new Promise(function (resolve) {
    riderEndofYear.forEach(row => CSV.write(row));

    res.setHeader('Content-Type', 'application/csv');

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    CSV.pipe(res).on('close', resolve);
    CSV.end();
  });
}

async function getPointsForShow(showUid: string, res: NextApiResponse) {
  const CSV = stringify({
    header: true,
    columns: [
      { key: 'RiderCombo.memberName', header: 'Member Name' },
      { key: 'RiderCombo.horseName', header: 'Horse Rode' },
      { key: 'RiderCombo.division', header: 'Division' },
      { key: 'place', header: 'Place' },
      { key: 'points', header: 'Points' },
    ],
  });

  const points = await prisma.points.findMany({
    where: {
      showUid: showUid,
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
          memberName: true,
          horseName: true,
        },
      },
    },
    orderBy: [{ RiderCombo: { division: 'desc' } }, { points: 'asc' }],
  });

  if (points.length === 0) {
    res.status(204).end();
    return;
  }

  const filename = `${points[0].show.showName}-${readableDateTime(
    points[0].show.showDate,
  )}.csv`;

  await new Promise(function (resolve) {
    points.forEach(row => CSV.write(row));

    res.setHeader('Content-Type', 'application/csv');

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    CSV.pipe(res).on('close', resolve);
    CSV.end();
  });
}
