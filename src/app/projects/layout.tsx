import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of projects showcasing full-stack development, system design, and modern web technologies.',
  openGraph: {
    title: 'My Projects | Samiu\'s Portfolio',
    description: 'A collection of professional projects and work samples.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
