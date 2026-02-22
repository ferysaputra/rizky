import { mockArticles } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import { Heart, Bell, Search, Play } from 'lucide-react';

export default function AppHomePage() {
    const featuredArticle = mockArticles[0];
    const otherArticles = mockArticles.slice(1);

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
                            <p className="text-xs text-muted font-medium">Selamat pagi ✨</p>
                            <h1 className="font-display text-lg font-bold">Smart Haid</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-primary/5 transition-colors">
                            <Search size={18} className="text-muted" />
                        </button>
                        <button className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-primary/5 transition-colors relative">
                            <Bell size={18} className="text-muted" />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
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
                            <span className="text-3xl font-display font-extrabold">Day 9</span>
                            <span className="text-white/70 text-sm mb-1">of 28</span>
                        </div>
                        <p className="text-white/80 text-xs mt-1.5">🌿 Masa subur mendekat</p>
                    </div>
                </div>
            </div>

            {/* Featured Article */}
            <div className="px-5 mb-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-display font-bold text-sm">Featured</h2>
                    <button className="text-xs text-primary font-semibold">See all</button>
                </div>
                <ArticleCard article={featuredArticle} variant="featured" />
            </div>

            {/* Video Section */}
            <div className="px-5 mb-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-display font-bold text-sm">Watch & Learn</h2>
                    <button className="text-xs text-primary font-semibold">See all</button>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    {['Health Tips', 'Yoga Flow', 'Nutrition'].map((title, i) => (
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
                    <h2 className="font-display font-bold text-sm">Recent Articles</h2>
                </div>
                <div className="flex flex-col gap-3 stagger-children">
                    {otherArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} variant="compact" />
                    ))}
                </div>
            </div>
        </div>
    );
}
