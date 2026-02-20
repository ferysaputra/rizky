import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    color: string;
}

export default function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon, color }: StatsCardProps) {
    const changeColors = {
        positive: 'text-success',
        negative: 'text-danger',
        neutral: 'text-muted',
    };

    return (
        <div className="glass-card-strong p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-muted text-sm font-medium">{title}</p>
                    <p className="font-display text-2xl font-bold mt-1">{value}</p>
                    {change && (
                        <p className={`text-xs mt-1.5 font-medium ${changeColors[changeType]}`}>
                            {change}
                        </p>
                    )}
                </div>
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}15` }}
                >
                    <Icon size={22} style={{ color }} />
                </div>
            </div>
        </div>
    );
}
