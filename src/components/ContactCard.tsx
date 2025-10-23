import Card from './card/Card';

interface ContactCardProps {
  name: string | null;
  position: string;
  email: string | null;
}

export function ContactCard({ name, position, email }: ContactCardProps) {
  return (
    <Card className='shadow-md'>
      <Card.Body>
        <Card.Title tag='h3'>{position}</Card.Title>
        <p>{name ? name : 'Open Position'}</p>
        <Card.Actions>
          <a
            className='link underline'
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}
