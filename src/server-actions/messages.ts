'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactInput = z.infer<typeof ContactSchema>;

export async function submitContactMessage(input: ContactInput) {
  try {
    const validatedData = ContactSchema.parse(input);

    const message = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || null,
        message: validatedData.message,
      },
    });

    revalidatePath('/admin/dashboard');

    return { success: true, message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: 'Failed to submit message' };
  }
}

export async function getMessages() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, messages };
  } catch {
    return { error: 'Failed to fetch messages' };
  }
}

export async function markMessageAsRead(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });

    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch {
    return { error: 'Failed to update message' };
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch {
    return { error: 'Failed to delete message' };
  }
}
