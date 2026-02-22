import StatsCard from '@/components/StatsCard';
import { Users, FileText, MessageSquare, TrendingUp, Activity, Clock } from 'lucide-react';
import { mockUsers, mockArticles, mockChatThreads } from '@/lib/mock-data';
import { format } from 'date-fns';

export default function AdminDashboardPage() {
    const totalUsers = mockUsers.filter((u) => u.role === 'user').length;
    const totalArticles = mockArticles.length;
    const activeChats = mockChatThreads.filter((t) => t.unreadCount > 0).length;

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="font-display text-2xl font-bold">Selamat datang kembali, Admin 👋</h1>
                <p className="text-muted text-sm mt-1">Berikut yang terjadi dengan Smart Haid hari ini</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatsCard
                    title="Total Users"
                    value={totalUsers}
                    change="+12% this month"
                    changeType="positive"
                    icon={Users}
                    color="#e84393"
                />
                <StatsCard
                    title="Articles"
                    value={totalArticles}
                    change="2 published this week"
                    changeType="neutral"
                    icon={FileText}
                    color="#a855f7"
                />
                <StatsCard
                    title="Active Chats"
                    value={activeChats}
                    change={`${activeChats} need response`}
                    changeType={activeChats > 0 ? 'negative' : 'positive'}
                    icon={MessageSquare}
                    color="#10b981"
                />
                <StatsCard
                    title="Engagement"
                    value="89%"
                    change="+5% from last week"
                    changeType="positive"
                    icon={TrendingUp}
                    color="#f59e0b"
                />
            </div>

            {/* Activity & Recent Users */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card-strong p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-display font-bold">Recent Activity</h2>
                        <Activity size={18} className="text-muted" />
                    </div>
                    <div className="space-y-4">
                        {[
                            { action: 'New user registered', user: 'Aisya Putri', time: '5 min ago', color: 'bg-primary/10 text-primary' },
                            { action: 'Article published', user: 'Admin Staff', time: '1 hour ago', color: 'bg-accent/10 text-accent' },
                            { action: 'Support chat opened', user: 'Dewi Lestari', time: '2 hours ago', color: 'bg-success/10 text-success' },
                            { action: 'Note created', user: 'Siti Rahma', time: '3 hours ago', color: 'bg-warning/10 text-warning' },
                            { action: 'PDF resource updated', user: 'Admin Staff', time: '5 hours ago', color: 'bg-accent/10 text-accent' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                                    <Activity size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{item.action}</p>
                                    <p className="text-xs text-muted">{item.user}</p>
                                </div>
                                <div className="flex items-center gap-1 text-muted">
                                    <Clock size={12} />
                                    <span className="text-xs">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Users */}
                <div className="glass-card-strong p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-display font-bold">Recent Users</h2>
                        <Users size={18} className="text-muted" />
                    </div>
                    <div className="space-y-3">
                        {mockUsers
                            .filter((u) => u.role === 'user')
                            .slice(0, 5)
                            .map((user) => (
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
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
