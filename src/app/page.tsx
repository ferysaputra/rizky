import Link from 'next/link';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf6f9] via-white to-[#fef0f5] flex flex-col items-center justify-center px-6 py-12">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative text-center max-w-lg animate-slide-up">
        {/* Logo */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8 shadow-lg shadow-primary/20 animate-float">
          <Heart size={36} className="text-white" fill="white" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={16} className="text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Selamat Datang di</span>
          <Sparkles size={16} className="text-primary" />
        </div>

        <h1 className="font-display text-5xl font-extrabold gradient-text mb-4 tracking-tight">
          Smart Haid
        </h1>

        <p className="text-muted text-base leading-relaxed max-w-md mx-auto mb-10">
          Pendamping kesehatan pribadi Anda. Lacak siklus menstruasi Anda, kelola catatan, baca artikel kesehatan, dan dapatkan dukungan — semuanya di satu tempat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/login" className="btn-primary flex items-center gap-2 text-base px-8 py-3.5">
            Login <ArrowRight size={18} />
          </Link>
          <Link href="/login?redirect=/admin" className="btn-secondary px-8 py-3">
            Admin
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex items-center justify-center gap-6">
          {/*<Link href="/admin" className="text-xs text-muted hover:text-primary transition-colors font-medium">
            Admin Dashboard →
          </Link>*/}
        </div>
      </div>
    </div>
  );
}
