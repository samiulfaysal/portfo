import { getProjects } from '@/server-actions/projects';
import type { Metadata } from 'next';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  try {
    const result = await getProjects();
    const project = result.success 
      ? result.projects.find((item) => item.slug === slug)
      : null;

    if (!project) {
      return {
        title: 'Project Not Found | Samiu\'s Portfolio',
        description: 'The project you are looking for does not exist.',
      };
    }

    const techStackArray = project.techStack;

    return {
      title: `${project.title} | Samiu's Portfolio`,
      description: project.description,
      keywords: [
        'portfolio',
        'project',
        project.title,
        ...techStackArray,
      ],
      openGraph: {
        title: `${project.title} | Samiu's Portfolio`,
        description: project.description,
        type: 'article',
        url: `${baseUrl}/projects/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} | Samiu's Portfolio`,
        description: project.description,
      },
      alternates: {
        canonical: `${baseUrl}/projects/${slug}`,
      },
    };
  } catch {
    return {
      title: 'Project | Samiu\'s Portfolio',
      description: 'A project from my portfolio.',
    };
  }
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return children;
}
