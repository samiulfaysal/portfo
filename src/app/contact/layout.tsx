import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me. I respond to all inquiries within 24-48 hours.',
  openGraph: {
    title: 'Contact | Samiu\'s Portfolio',
    description: 'Let\'s connect and discuss your project or collaboration opportunities.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
