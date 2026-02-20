import { Article } from '@/lib/mock-data';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleCardProps {
    article: Article;
    variant?: 'featured' | 'compact';
}

export default function ArticleCard({ article, variant = 'compact' }: ArticleCardProps) {
    if (variant === 'featured') {
        return (
            <div className="glass-card-strong overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                {/* Gradient banner instead of image */}
                <div className="h-40 bg-gradient-to-br from-primary/20 via-accent/15 to-primary-light/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-40">📖</span>
                    </div>
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-semibold text-primary">
                            {article.category}
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-muted text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-muted text-xs">
                            <Calendar size={12} />
                            <span>{format(article.createdAt, 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                            Read more <ArrowRight size={12} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-3.5 flex gap-3.5 group cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-primary/8">
            {/* Small gradient thumbnail */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center shrink-0">
                <span className="text-2xl opacity-50">📄</span>
            </div>
            <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                    {article.category}
                </span>
                <h4 className="font-semibold text-sm mt-0.5 group-hover:text-primary transition-colors line-clamp-1">
                    {article.title}
                </h4>
                <p className="text-muted text-xs mt-1 line-clamp-1">{article.excerpt}</p>
            </div>
        </div>
    );
}
