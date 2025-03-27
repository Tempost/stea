import NextLink, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import Card from '../card/Card';

interface NavCardProps extends LinkProps {
  img: string;
  bodyText: ReactNode;
}

export default function NavCard({ img, bodyText, ...props }: NavCardProps) {
  return (
    <NextLink {...props}>
      <Card
        imageFull
        border={false}
        className='container h-[15em] w-[20em] shadow-xl transition-all delay-75 duration-300 ease-in-out hover:scale-[1.05] hover:cursor-pointer hover:shadow-2xl'
      >
        <Card.Image
          src={img}
          alt='Background image for card'
          fill
          sizes='100vw, 50vw'
        />
        <Card.Body className='group grid place-items-center transition-all delay-75 duration-300 ease-in-out'>
          <Card.Title
            tag='h3'
            className='text-2xl transition-all delay-75 duration-400 ease-in-out group-hover:text-3xl group-hover:font-bold md:text-3xl group-hover:md:text-4xl'
          >
            {bodyText}
          </Card.Title>
        </Card.Body>
      </Card>
    </NextLink>
  );
}
