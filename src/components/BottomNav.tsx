'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, StickyNote, FileText, MessageCircle } from 'lucide-react';

const navItems = [
    { href: '/app', icon: Home, label: 'Home' },
    { href: '/app/calendar', icon: CalendarDays, label: 'Calendar' },
    { href: '/app/notes', icon: StickyNote, label: 'Notes' },
    { href: '/app/pdf', icon: FileText, label: 'PDF' },
    { href: '/app/chat', icon: MessageCircle, label: 'Chat' },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
            <div className="mx-2 mb-3 rounded-2xl glass-card-strong border border-white/60 px-2 py-2">
                <div className="flex items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${isActive
                                    ? 'text-primary scale-105'
                                    : 'text-muted hover:text-primary/70'
                                    }`}
                            >
                                <div className={`relative ${isActive ? 'animate-float' : ''}`}>
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
