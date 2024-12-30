import fs from 'fs';
import { prisma } from '@/server/prisma';
import { findMany } from '@/server/prisma/queries/shared';
import { stringify } from 'csv';
import { NextRequest, NextResponse } from 'next/server';
import { ReadableOptions } from 'stream';

function streamFile(
  path: string,
  options?: ReadableOptions,
): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on('data', (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk)),
      );
      downloadStream.on('end', () => controller.close());
      downloadStream.on('error', (error: NodeJS.ErrnoException) =>
        controller.error(error),
      );
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}

export async function GET(req: NextRequest) {
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
}

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
  const path = `/tmp/${filename}`;

  await new Promise(resolve => {
    riderEndofYear.forEach(row => CSV.write(row));

    const writeStream = fs.createWriteStream(path);
    CSV.pipe(writeStream).on('close', resolve);
    CSV.on('end', () => {
      writeStream.close();
    });
    CSV.end();
  });

  const stats = await fs.promises.stat(path);
  const data = streamFile(path);

  return new NextResponse(data, {
    headers: new Headers({
      'content-disposition': `attachment; filename=${filename}`,
      'content-type': 'application/csv',
      'content-length': stats.size + '',
    }),
  });
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
  const path = `/tmp/${filename}`;

  await new Promise(resolve => {
    points.forEach(row => CSV.write(row));

    const writeStream = fs.createWriteStream(path);
    CSV.pipe(writeStream).on('close', resolve);
    CSV.on('end', () => {
      writeStream.close();
    });
    CSV.end();
  });

  const stats = await fs.promises.stat(path);
  const data = streamFile(path);

  return new NextResponse(data, {
    headers: new Headers({
      'content-disposition': `attachment; filename=${filename}`,
      'content-type': 'application/csv',
      'content-length': stats.size + '',
    }),
  });
}
