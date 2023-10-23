import { prisma } from '@/server/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z, ZodError } from 'zod';

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
    const points = await prisma.points.findMany({
      where: {
        riderUid: params.rider,
      },
    });

    console.log(points);

    return res.status(200).json(points);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '' });
  }

  res.end();
}

const queryParams = z.object({
  rider: z.string(),
});
