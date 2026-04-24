'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactMessage } from '@/server-actions/messages';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof ContactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    try {
      const result = await submitContactMessage(data);

      if ('error' in result) {
        showToast('error', result.error || 'Failed to send message');
      } else {
        showToast('success', 'Message sent! I\'ll get back to you soon.');
        reset();
        if (onSuccess) onSuccess();
      }
    } catch {
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toast Notification */}
      {toast && (
        <motion.div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            toast.type === 'success'
              ? 'bg-green-500/20 border border-green-500/50 text-green-200'
              : 'bg-red-500/20 border border-red-500/50 text-red-200'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <span>{toast.message}</span>
        </motion.div>
      )}

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
        <input
          type="text"
          {...register('name')}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition backdrop-blur-sm"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            {errors.name.message}
          </p>
        )}
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
        <input
          type="email"
          {...register('email')}
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition backdrop-blur-sm"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            {errors.email.message}
          </p>
        )}
      </motion.div>

      {/* Subject */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
        <input
          type="text"
          {...register('subject')}
          placeholder="What is this about?"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition backdrop-blur-sm"
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            {errors.subject.message}
          </p>
        )}
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
        <textarea
          {...register('message')}
          placeholder="Tell me more about your project or inquiry..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition backdrop-blur-sm resize-none"
        />
        {errors.message && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            {errors.message.message}
          </p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-600/50 disabled:to-blue-500/50 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/30"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Send size={20} />
        {loading ? 'Sending...' : 'Send Message'}
      </motion.button>

      {/* Privacy Notice */}
      <motion.p
        className="text-xs text-white/40 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I respect your privacy. Your message will only be used to contact you back about your inquiry.
      </motion.p>
    </motion.form>
  );
}
