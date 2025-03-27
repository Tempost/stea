'use client';
import { Button } from '@/components/styled-ui/Button';
import { usePathname, useRouter } from 'next/navigation';

function ReturnButton() {
  const router = useRouter();
  const path = usePathname();

  if (path?.endsWith('join')) return null;

  return (
    <Button
      variant='link'
      className='btn-sm self-end capitalize'
      onClick={() => router.back()}
    >
      return
    </Button>
  );
}

export default ReturnButton;
