'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import { Heart, LogOut, Search, Play, X, Calendar, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getArticles, Article } from '@/lib/firestore/articles';

export default function AppHomePage() {
    const { userData, logout } = useAuth();
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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
                        {/*<button className="text-xs text-primary font-semibold">Lihat semua</button>*/}
                    </div>
                    <ArticleCard article={featuredArticle} variant="featured" onClick={() => setSelectedArticle(featuredArticle)} />
                </div>
            )}

            {/* Video Section */}
            <div className="px-5 mb-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-display font-bold text-sm">Tonton &amp; Pelajari</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    {articles.filter(a => a.youtubeId).length > 0 ? (
                        articles.filter(a => a.youtubeId).map((article) => (
                            <div
                                key={article.id}
                                onClick={() => setActiveVideoId(article.youtubeId!)}
                                className="min-w-[180px] h-[110px] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary-light/10 flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 hover:shadow-md shrink-0 relative overflow-hidden"
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${article.youtubeId}/mqdefault.jpg`}
                                    alt={article.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Play size={16} className="text-primary ml-0.5" fill="currentColor" />
                                    </div>
                                    <span className="text-[11px] font-semibold mt-2 text-white drop-shadow-sm text-center px-2 line-clamp-1">{article.title}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted text-xs py-4">Belum ada video tersedia</p>
                    )}
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
                            <ArticleCard key={article.id} article={article} variant="compact" onClick={() => setSelectedArticle(article)} />
                        ))
                    ) : (
                        <p className="text-muted text-sm text-center py-4">Belum ada artikel</p>
                    )}
                </div>
            </div>

            {/* Article Reader Modal */}
            {selectedArticle && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center animate-fade-in"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div
                        className="bg-white w-full max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border/50 px-5 py-4 flex items-center gap-3 shrink-0 sm:rounded-t-2xl">
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
                            >
                                <ArrowLeft size={16} />
                            </button>
                            <div className="flex-1 min-w-0">
                                <h2 className="font-display font-bold text-base line-clamp-1">{selectedArticle.title}</h2>
                                <p className="text-[10px] text-muted">{selectedArticle.category}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto flex-1 px-5 py-5">
                            <div className="h-40 rounded-xl bg-gradient-to-br from-primary/20 via-accent/15 to-primary-light/20 flex items-center justify-center mb-5">
                                <span className="text-5xl opacity-40">📖</span>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                    {selectedArticle.category}
                                </span>
                                <div className="flex items-center gap-1 text-muted text-xs">
                                    <Calendar size={12} />
                                    <span>{new Date(selectedArticle.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>

                            <h1 className="font-display font-bold text-xl mb-3 leading-tight">{selectedArticle.title}</h1>
                            <p className="text-muted text-sm mb-4 italic">{selectedArticle.excerpt}</p>

                            <div
                                className="prose prose-sm max-w-none text-foreground/90 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                            />

                            {selectedArticle.youtubeId && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-sm mb-2">Video Terkait</h3>
                                    <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${selectedArticle.youtubeId}`}
                                            title="YouTube Video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* YouTube Video Modal */}
            {activeVideoId && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setActiveVideoId(null)}
                >
                    <div className="relative w-full max-w-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setActiveVideoId(null)}
                            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </button>
                        <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                                title="YouTube Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
