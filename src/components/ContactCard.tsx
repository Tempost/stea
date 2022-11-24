export interface ContactCardProps {
  name?: string;
  position: string;
  email?: string;
}

export function ContactCard({ name, position, email }: ContactCardProps) {
  return (
    <span className='w-fit rounded-md p-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)]'>
      <p className='text-lg font-semibold'>{position}</p>
      <span className='divider my-1 w-full' />
      <p>{name ?? 'Open Position'}</p>
      {email && <p className='underline'>{email}</p>}
    </span>
  );
}
