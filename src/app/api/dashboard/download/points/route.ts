import fs from 'fs';
import { prisma } from '@/server/prisma';
import { findMany } from '@/server/prisma/queries/shared';
import { stringify } from 'csv';
import { NextRequest, NextResponse } from 'next/server';
import { ReadableOptions } from 'stream';
import { checkAuth } from '@/auth';
import { iteratorToStream, nodeStreamToIterator } from '@/server/utils';

export const GET = checkAuth(async (req: NextRequest) => {
  const year = req.nextUrl.searchParams.get('year');
  const show = req.nextUrl.searchParams.get('show');
  if (!year && !show) {
    console.warn(
      `Attempted downloading points with ${JSON.stringify(req.nextUrl.searchParams)}`,
    );
    return new NextResponse(null, { status: 400 });
  }

  try {
    if (show) {
      return await getPointsForShow(show);
    }

    if (year) {
      return await getPointsForYear(Number.parseInt(year));
    }
  } catch (e) {
    console.error(e);
    return new NextResponse(null, { status: 500 });
  }
  // WARN: REMOVE THIS WHEN https://github.com/nextauthjs/next-auth/issues/12224 is fixed
}) as any;

async function getPointsForYear(showYear: number) {
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

  const riderEndofYear = await findMany('RiderCombo', {
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
    return new NextResponse(null, { status: 204 });
  }

  const filename = `Points_For_${showYear}.csv`;
  const filePath = `/tmp/${filename}`;

  await new Promise(res => {
    const writeStream = fs.createWriteStream(filePath);
    CSV.pipe(writeStream).on('close', () => res(true));
    CSV.on('end', () => {
      writeStream.end();
    });
    riderEndofYear.forEach(row => CSV.write(row));
    CSV.end();
  });

  const stats = await fs.promises.stat(filePath);
  const data = streamFile(filePath);

  return new NextResponse(data, {
    headers: new Headers({
      'content-disposition': `attachment; filename=${filename}`,
      'content-type': 'application/csv',
      'content-length': stats.size + '',
    }),
  });
}

function streamFile(path: string, options?: ReadableOptions) {
  const downloadStream = fs.createReadStream(path, options);
  return iteratorToStream(nodeStreamToIterator(downloadStream));
}

async function getPointsForShow(showUid: string) {
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
    return new NextResponse(null, { status: 204 });
  }

  const showDate = points[0].show.showDate;
  const filename = `${points[0].show.showName}-${showDate.getMonth() + 1}-${showDate.getDate()}-${showDate.getFullYear()}.csv`;
  const filePath = `/tmp/${filename}`;

  await new Promise(res => {
    const writeStream = fs.createWriteStream(filePath);
    CSV.pipe(writeStream).on('close', () => res(true));
    CSV.on('end', () => {
      writeStream.close();
    });
    points.forEach(row => CSV.write(row));

    CSV.end();
  });

  const stats = await fs.promises.stat(filePath);
  const data = streamFile(filePath);

  return new NextResponse(data, {
    headers: new Headers({
      'content-disposition': `attachment; filename=${filename}`,
      'content-type': 'application/csv',
      'content-length': stats.size + '',
    }),
  });
}
