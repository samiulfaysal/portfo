'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { Project } from '@prisma/client';

// Validation schema for project creation/updates
const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  techStack: z.array(z.string()).min(1, 'At least one tech stack item required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
export type PortfolioProject = Omit<Project, 'techStack'> & {
  techStack: string[];
};

function normalizeTechStack(value: Project['techStack']): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function normalizeProject(project: Project): PortfolioProject {
  return {
    ...project,
    techStack: normalizeTechStack(project.techStack),
  };
}

export async function createProject(input: ProjectInput) {
  try {
    const validatedData = ProjectSchema.parse(input);
    
    // Check if slug already exists
    const existing = await prisma.project.findUnique({
      where: { slug: validatedData.slug }
    });
    
    if (existing) {
      return { error: 'Slug already exists' };
    }

    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        description: validatedData.description,
        techStack: validatedData.techStack,
        githubUrl: validatedData.githubUrl || null,
        liveUrl: validatedData.liveUrl || null,
        featured: validatedData.featured,
      },
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/projects');
    
    return { success: true, project: normalizeProject(project) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: 'Failed to create project' };
  }
}

export async function updateProject(id: string, input: ProjectInput) {
  try {
    const validatedData = ProjectSchema.parse(input);

    // Check if slug is being changed and if it already exists
    const existing = await prisma.project.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existing && existing.id !== id) {
      return { error: 'Slug already exists' };
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        description: validatedData.description,
        techStack: validatedData.techStack,
        githubUrl: validatedData.githubUrl || null,
        liveUrl: validatedData.liveUrl || null,
        featured: validatedData.featured,
      },
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/projects');
    
    return { success: true, project: normalizeProject(project) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: 'Failed to update project' };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/projects');
    
    return { success: true };
  } catch {
    return { error: 'Failed to delete project' };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, projects: projects.map(normalizeProject) };
  } catch {
    return { error: 'Failed to fetch projects' };
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      return { error: 'Project not found' };
    }
    return { success: true, project: normalizeProject(project) };
  } catch {
    return { error: 'Failed to fetch project' };
  }
}
