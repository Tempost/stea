import { LayoutProps } from '@/types/common';

export default function ChildLayout({ children }: LayoutProps) {
  return <div className={`p-4 sm:p-8 md:p-10 lg:p-16`}>{children}</div>;
}

export const metadata = {
  title: 'Points',
  description:
    'Rider scores for the selected year, default year is the current year',
};
