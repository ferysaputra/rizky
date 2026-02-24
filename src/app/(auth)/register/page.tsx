'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Kata sandi harus minimal 6 karakter.');
            return;
        }

        setLoading(true);
        try {
            await register(email, password, name);
            router.push('/app');
        } catch (err: unknown) {
            const firebaseError = err as { code?: string };
            if (firebaseError.code === 'auth/email-already-in-use') {
                setError('Email ini sudah terdaftar.');
            } else if (firebaseError.code === 'auth/weak-password') {
                setError('Kata sandi terlalu lemah. Gunakan minimal 6 karakter.');
            } else if (firebaseError.code === 'auth/invalid-email') {
                setError('Format email tidak valid.');
            } else {
                setError('Terjadi kesalahan. Silakan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fdf6f9] via-white to-[#fef0f5] flex items-center justify-center px-6">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />

            <div className="w-full max-w-sm relative animate-slide-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <Heart size={28} className="text-white" fill="white" />
                    </div>
                    <h1 className="font-display text-2xl font-extrabold gradient-text">Buat Akun</h1>
                    <p className="text-muted text-sm mt-1">Bergabung dengan Smart Haid dan kelola kesehatan Anda</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card-strong p-6">
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-danger/10 text-danger text-xs font-medium p-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-semibold text-muted block mb-1.5">Nama Lengkap</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Nama lengkap Anda"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-field pl-4"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-muted block mb-1.5">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-4"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-muted block mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Min. 6 karakter"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-4 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff size={16} className="text-muted" /> : <Eye size={16} className="text-muted" />}
                                </button>
                            </div>
                            {/* Password strength */}
                            <div className="flex gap-1 mt-2">
                                <div className={`h-1 rounded-full flex-1 ${password.length > 0 ? 'bg-danger' : 'bg-border'}`} />
                                <div className={`h-1 rounded-full flex-1 ${password.length >= 4 ? 'bg-warning' : 'bg-border'}`} />
                                <div className={`h-1 rounded-full flex-1 ${password.length >= 8 ? 'bg-success' : 'bg-border'}`} />
                            </div>
                        </div>

                        <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded accent-primary mt-0.5" />
                            <span className="text-xs text-muted leading-relaxed">
                                Saya menyetujui{' '}
                                <span className="text-primary font-semibold">Ketentuan Layanan</span> dan{' '}
                                <span className="text-primary font-semibold">Kebijakan Privasi</span>
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60"
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>Buat Akun <ArrowRight size={16} /></>
                            )}
                        </button>
                    </div>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-muted mt-6">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                        Masuk
                    </Link>
                </p>
            </div>
        </div>
    );
}
