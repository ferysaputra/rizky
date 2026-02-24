'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import { Heart, LogOut, Search, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getArticles, Article } from '@/lib/firestore/articles';

export default function AppHomePage() {
    const { userData, logout } = useAuth();
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);

    // Calculate cycle day from user data
    let cycleDayInCycle = 1;
    let cycleLength = 28;
    let phaseText = '🌿 Masa subur mendekat';

    if (userData?.cycleSettings) {
        cycleLength = userData.cycleSettings.length;
        const periodLength = userData.cycleSettings.periodLength || 5;
        const today = new Date();
        const lastPeriod = new Date(userData.cycleSettings.lastDate);
        const diffTime = today.getTime() - lastPeriod.getTime();
        const currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        cycleDayInCycle = ((currentDay - 1) % cycleLength) + 1;

        const ovulationDay = cycleLength - 14;
        if (cycleDayInCycle <= periodLength) {
            phaseText = '🩸 Sedang menstruasi';
        } else if (cycleDayInCycle >= ovulationDay - 5 && cycleDayInCycle <= ovulationDay + 1) {
            phaseText = '🌿 Masa subur';
        } else if (cycleDayInCycle === ovulationDay) {
            phaseText = '🌸 Hari ovulasi';
        } else {
            phaseText = '☀️ Fase luteal';
        }
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="px-5 pt-6 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Heart size={18} className="text-white" fill="white" />
                        </div>
                        <div>
                            <p className="text-xs text-muted font-medium">Selamat pagi, {userData?.name?.split(' ')[0] || 'User'} ✨</p>
                            <h1 className="font-display text-lg font-bold">Smart Haid</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-primary/5 transition-colors">
                            <Search size={18} className="text-muted" />
                        </button>
                        <button
                            onClick={async () => { await logout(); router.push('/'); }}
                            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-danger/10 transition-colors"
                            title="Keluar"
                        >
                            <LogOut size={18} className="text-danger" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Cycle Quick Status */}
            <div className="px-5 mb-5">
                <div className="bg-gradient-to-r from-primary via-primary-light to-accent rounded-2xl p-4 text-white relative overflow-hidden">
                    <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10" />
                    <div className="absolute -right-2 -top-4 w-16 h-16 rounded-full bg-white/5" />
                    <div className="relative">
                        <p className="text-white/80 text-xs font-medium">Hari Siklus Anda</p>
                        <div className="flex items-end gap-2 mt-1">
                            <span className="text-3xl font-display font-extrabold">Hari {cycleDayInCycle}</span>
                            <span className="text-white/70 text-sm mb-1">dari {cycleLength}</span>
                        </div>
                        <p className="text-white/80 text-xs mt-1.5">{phaseText}</p>
                    </div>
                </div>
            </div>

            {/* Featured Article */}
            {loading ? (
                <div className="px-5 mb-5">
                    <div className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
                </div>
            ) : featuredArticle && (
                <div className="px-5 mb-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-display font-bold text-sm">Pilihan</h2>
                        <button className="text-xs text-primary font-semibold">Lihat semua</button>
                    </div>
                    <ArticleCard article={featuredArticle} variant="featured" />
                </div>
            )}

            {/* Video Section */}
            <div className="px-5 mb-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-display font-bold text-sm">Tonton &amp; Pelajari</h2>
                    <button className="text-xs text-primary font-semibold">Lihat semua</button>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    {['Tips Kesehatan', 'Yoga', 'Nutrisi'].map((title, i) => (
                        <div
                            key={i}
                            className="min-w-[160px] h-[100px] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary-light/10 flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 hover:shadow-md shrink-0"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <Play size={16} className="text-primary ml-0.5" fill="currentColor" />
                            </div>
                            <span className="text-xs font-semibold mt-2 text-foreground/70">{title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Articles */}
            <div className="px-5 mb-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-display font-bold text-sm">Artikel Terbaru</h2>
                </div>
                <div className="flex flex-col gap-3 stagger-children">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
                        ))
                    ) : otherArticles.length > 0 ? (
                        otherArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} variant="compact" />
                        ))
                    ) : (
                        <p className="text-muted text-sm text-center py-4">Belum ada artikel</p>
                    )}
                </div>
            </div>
        </div>
    );
}
