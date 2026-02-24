'use client';

import { useState, useEffect } from 'react';
import StatsCard from '@/components/StatsCard';
import { Users, FileText, MessageSquare, TrendingUp, Activity, Clock } from 'lucide-react';
import { getUsers, UserProfile } from '@/lib/firestore/users';
import { getArticles } from '@/lib/firestore/articles';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminDashboardPage() {
    const { userData } = useAuth();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [articleCount, setArticleCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [usersData, articlesData] = await Promise.all([getUsers(), getArticles()]);
                setUsers(usersData.filter((u) => u.role === 'user'));
                setArticleCount(articlesData.length);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="font-display text-2xl font-bold">Selamat datang kembali, {userData?.name?.split(' ')[0] || 'Admin'} 👋</h1>
                <p className="text-muted text-sm mt-1">Berikut yang terjadi dengan Smart Haid hari ini</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatsCard
                    title="Total Pengguna"
                    value={loading ? '...' : users.length}
                    change="Pengguna terdaftar"
                    changeType="neutral"
                    icon={Users}
                    color="#e84393"
                />
                <StatsCard
                    title="Artikel"
                    value={loading ? '...' : articleCount}
                    change="Artikel dipublikasi"
                    changeType="neutral"
                    icon={FileText}
                    color="#a855f7"
                />
                <StatsCard
                    title="Obrolan Aktif"
                    value={loading ? '...' : 0}
                    change="Perlu ditanggapi"
                    changeType="neutral"
                    icon={MessageSquare}
                    color="#10b981"
                />
                <StatsCard
                    title="Keterlibatan"
                    value="—"
                    change="Data segera tersedia"
                    changeType="neutral"
                    icon={TrendingUp}
                    color="#f59e0b"
                />
            </div>

            {/* Activity & Recent Users */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card-strong p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-display font-bold">Aktivitas Terbaru</h2>
                        <Activity size={18} className="text-muted" />
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
                            ))
                        ) : users.length > 0 ? (
                            users.slice(0, 5).map((user, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Activity size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Pengguna terdaftar</p>
                                        <p className="text-xs text-muted">{user.name}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted">
                                        <Clock size={12} />
                                        <span className="text-xs">{user.lastLogin.toLocaleDateString('id-ID')}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted text-sm text-center py-4">Belum ada aktivitas</p>
                        )}
                    </div>
                </div>

                {/* Recent Users */}
                <div className="glass-card-strong p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-display font-bold">Pengguna Baru</h2>
                        <Users size={18} className="text-muted" />
                    </div>
                    <div className="space-y-3">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
                            ))
                        ) : users.length > 0 ? (
                            users.slice(0, 5).map((user) => (
                                <div key={user.uid} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-lg">
                                        {user.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">{user.name}</p>
                                        <p className="text-xs text-muted truncate">{user.email}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-success shrink-0" />
                                </div>
                            ))
                        ) : (
                            <p className="text-muted text-sm text-center py-4">Belum ada pengguna</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
