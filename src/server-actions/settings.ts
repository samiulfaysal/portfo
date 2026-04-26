'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const DEFAULT_HERO = {
  status: '> system.status === "ONLINE"',
  title: 'Architecting The Web.',
  subtitle: 'I am a Full-Stack Web Developer and Systems Architect. I engineer complex infrastructure into beautifully simple, high-performance digital experiences.'
};

export async function getHeroSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { key: 'hero_content' }
    });
    return settings || DEFAULT_HERO;
  } catch (error) {
    return DEFAULT_HERO;
  }
}

export async function updateHeroSettings(data: { status: string; title: string; subtitle: string }) {
  try {
    await prisma.siteSettings.upsert({
      where: { key: 'hero_content' },
      update: data,
      create: { key: 'hero_content', ...data }
    });
    
    // This tells Next.js to immediately refresh the homepage with the new data
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update settings' };
  }
}