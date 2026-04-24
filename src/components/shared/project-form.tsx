'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createProject, updateProject } from '@/server-actions/projects';
import { motion } from 'framer-motion';

const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  techStack: z.string().min(1, 'At least one tech stack item required').transform((value) =>
    value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  ),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean(),
});

type ProjectFormValues = z.input<typeof ProjectSchema>;
type ProjectFormData = z.output<typeof ProjectSchema>;

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    techStack: string[];
    githubUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
  };
  onSuccess?: () => void;
}

export default function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues, unknown, ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          description: initialData.description,
          techStack: initialData.techStack.join(', '),
          githubUrl: initialData.githubUrl || '',
          liveUrl: initialData.liveUrl || '',
          featured: initialData.featured,
        }
      : {
          title: '',
          slug: '',
          description: '',
          techStack: '',
          githubUrl: '',
          liveUrl: '',
          featured: false,
        },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    setMessage(null);

    try {
      const result = initialData
        ? await updateProject(initialData.id, data)
        : await createProject(data);

      if ('error' in result) {
        setMessage({ type: 'error', text: result.error ?? 'Unable to save project' });
      } else {
        setMessage({ type: 'success', text: initialData ? 'Project updated successfully' : 'Project created successfully' });
        if (onSuccess) onSuccess();
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message && (
        <motion.div
          className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message.text}
        </motion.div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
        <input
          type="text"
          {...register('title')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition"
          placeholder="Project title"
        />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Slug</label>
        <input
          type="text"
          {...register('slug')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition"
          placeholder="project-slug"
        />
        {errors.slug && <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition resize-none"
          placeholder="Project description"
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Tech Stack (comma-separated)</label>
        <input
          type="text"
          {...register('techStack')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition"
          placeholder="React, Node.js, PostgreSQL"
        />
        {errors.techStack && (
          <p className="text-red-400 text-sm mt-1">
            {errors.techStack.message || 'Invalid tech stack'}
          </p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">GitHub URL (optional)</label>
        <input
          type="url"
          {...register('githubUrl')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition"
          placeholder="https://github.com/..."
        />
        {errors.githubUrl && <p className="text-red-400 text-sm mt-1">{errors.githubUrl.message}</p>}
      </div>

      {/* Live URL */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Live URL (optional)</label>
        <input
          type="url"
          {...register('liveUrl')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition"
          placeholder="https://..."
        />
        {errors.liveUrl && <p className="text-red-400 text-sm mt-1">{errors.liveUrl.message}</p>}
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register('featured')}
          className="w-4 h-4 rounded accent-blue-500"
        />
        <label className="text-sm font-medium text-white/80">Featured Project</label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? 'Loading...' : initialData ? 'Update Project' : 'Create Project'}
      </motion.button>
    </motion.form>
  );
}
