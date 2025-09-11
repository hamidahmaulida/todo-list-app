import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shared Task | Todo App',
  description: 'View shared todo task',
  robots: 'noindex, nofollow', // Prevent indexing shared pages for privacy
};

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shared-page">
      {children}
    </div>
  );
}