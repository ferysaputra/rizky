'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heart, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { login, userData, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect');

    // After login, wait for userData to load then redirect based on role
    useEffect(() => {
        if (loginSuccess && user && userData) {
            if (redirectTo === '/admin' && userData.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/app');
            }
        }
    }, [loginSuccess, user, userData, redirectTo, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            setLoginSuccess(true);
        } catch (err: unknown) {
            const firebaseError = err as { code?: string };
            if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
                setError('Email atau kata sandi salah.');
            } else if (firebaseError.code === 'auth/too-many-requests') {
                setError('Terlalu banyak percobaan. Coba lagi nanti.');
            } else {
                setError('Terjadi kesalahan. Silakan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fdf6f9] via-white to-[#fef0f5] flex items-center justify-center px-6">
            {/* Background decorations */}
            <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />

            <div className="w-full max-w-sm relative animate-slide-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <Heart size={28} className="text-white" fill="white" />
                    </div>
                    <h1 className="font-display text-2xl font-extrabold gradient-text">Selamat Datang Kembali</h1>
                    <p className="text-muted text-sm mt-1">Masuk untuk melanjutkan ke Smart Haid</p>
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
                                    placeholder="••••••••"
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
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                                <span className="text-xs text-muted">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2 disabled:opacity-60"
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight size={16} /></>
                            )}
                        </button>
                    </div>
                </form>

                {/* Register Link */}
                <p className="text-center text-sm text-muted mt-6">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-primary font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
