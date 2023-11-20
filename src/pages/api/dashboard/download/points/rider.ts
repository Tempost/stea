import { prisma, MyPrismaClient } from '@/server/prisma';
import type { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z, ZodError } from 'zod';
import { stringify } from 'csv';
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'GET') {
    console.warn('Attempted to access via unsupported method');
    return res.status(405).json({ message: 'Method Not Allowed.' });
  }

  // const token = await getToken({ req });
  // if (!token) {
  //   console.error('Attempted to access api protected by auth.');
  //   return res.status(401).json({ message: 'Access Not Allowed.' });
  // }

  try {
    const params = queryParams.parse(req.query);

    // TODO: The rider field will be the UID of the selected rider combo from the UI
    const points = await prisma.riderCombo.findMany({
      where: {
        uid: params.rider,
      },
    });

    const readSteam = fs.createReadStream('csv-file.csv');

    const test = stringify({
      header: true,
      columns: ['memberName', 'totalPoints', 'totalShows', 'horseName'],
    });

    await new Promise(function (resolve) {
      console.log('Writing data to stream');
      points.forEach(row => test.write(row));

      res.setHeader('Content-Type', 'application/csv');

      // TODO: Update file name with the riders name
      res.setHeader('Content-Disposition', `attachment; filename=what.csv`);
      test.pipe(res).on('close', resolve);
      readSteam.pipe(res);
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '' });
  }
  res.end();
}

const queryParams = z.object({
  rider: z.string(),
});
