'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, userData, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace('/login');
            return;
        }

        if (requireAdmin && userData?.role !== 'admin') {
            router.replace('/app');
            return;
        }
    }, [user, userData, loading, requireAdmin, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-sm text-muted">Memuat...</span>
                </div>
            </div>
        );
    }

    if (!user) return null;
    if (requireAdmin && userData?.role !== 'admin') return null;

    return <>{children}</>;
}
