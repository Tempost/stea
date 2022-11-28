import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

// Upload .csv file to this API
// Convert .csv file into zod objects?
// Which ever method will get me a ridercombo w/ points
//
// After processing is finished, respond to client saying job complete
// respond with any errors if found

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = await getToken({ req });

    if (token) {
      const csv: string = req.body;
      console.log(csv);
      const heading = csv.split("\n").at(0);

    } else {
      console.warn("Attempted to access api protected by auth.");
      res.status(401);
    }

    res.end();
  }

  res.status(405).end();
}

async function parseAndUpload(csvLines: string[]) {
}
