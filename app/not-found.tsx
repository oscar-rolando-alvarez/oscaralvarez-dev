import Link from 'next/link';
import { defaultLocale } from '@/i18n/request';

export default function NotFound() {
  return (
    <html>
      <body className="grid min-h-screen place-items-center bg-[#0a0a0f] text-white">
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50">404</p>
          <h1 className="mt-3 font-bold text-3xl">Page not found</h1>
          <Link
            href={`/${defaultLocale}`}
            className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
