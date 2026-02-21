'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                    <h1 className="font-display text-2xl font-extrabold gradient-text">Create Account</h1>
                    <p className="text-muted text-sm mt-1">Join Smart Haid and take charge of your health</p>
                </div>

                {/* Form */}
                <div className="glass-card-strong p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-muted block mb-1.5">Full Name</label>
                            <div className="relative">
                                {/*<User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />*/}
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-muted block mb-1.5">Email Address</label>
                            <div className="relative">
                                {/*<Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />*/}
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-muted block mb-1.5">Password</label>
                            <div className="relative">
                                {/*<Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />*/}
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Min. 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10 pr-10"
                                />
                                <button
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
                                I agree to the{' '}
                                <span className="text-primary font-semibold">Terms of Service</span> and{' '}
                                <span className="text-primary font-semibold">Privacy Policy</span>
                            </span>
                        </label>

                        <Link href="/app">
                            <button className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                                Create Account <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted">or</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <button className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5">
                        <span className="text-lg">🔐</span>
                        Continue with Google
                    </button>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-muted mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
