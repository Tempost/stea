import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { stringify } from 'csv';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

const queryParams = z.object({
  year: z.coerce.number(),
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
  if (!token) {
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
      { key: 'memberName', header: 'Member Name' },
      { key: 'horseName', header: 'Horse Rode' },
      { key: 'totalShows', header: 'Shows Attended' },
      { key: 'division', header: 'division' },
      { key: 'totalPoints', header: 'Points' },
    ],
  });

  try {
    const riderEndofYear = await prisma.riderCombo.findMany({
      where: {
        showYear: params.data.year,
      },
      select: {
        memberName: true,
        totalPoints: true,
        totalShows: true,
        horseName: true,
        division: true,
      },
      orderBy: [
        {
          division: 'desc',
        },
        { totalPoints: 'desc' },
      ],
    });

    if (riderEndofYear.length === 0) {
      res.status(204).end();
      return;
    }

    const filename = `Points_For_${params.data.year}.csv`;

    await new Promise(function (resolve) {
      riderEndofYear.forEach(row => CSV.write(row));

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
