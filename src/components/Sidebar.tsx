'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileEdit, Users, MessageSquare, Settings, LogOut, Heart, Menu, X } from 'lucide-react';

const sidebarItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/cms', icon: FileEdit, label: 'Content Manager' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/chat', icon: MessageSquare, label: 'Support Chat' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile toggle button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-3.5 left-4 z-40 p-2 bg-white rounded-lg shadow-sm border border-border text-foreground"
            >
                <Menu size={20} />
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar container */}
            <aside className={`
                admin-sidebar w-64 min-h-screen flex flex-col p-4 shrink-0 
                fixed md:sticky md:top-0 left-0 z-50 h-[100dvh] transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Close button inside sidebar for mobile */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden absolute top-4 right-4 p-2 text-white/70 hover:text-white"
                >
                    <X size={20} />
                </button>

                {/* Logo */}
                <div className="flex items-center gap-3 px-3 py-4 mb-6 mt-8 md:mt-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                        <Heart size={22} className="text-white" fill="white" />
                    </div>
                    <div>
                        <h1 className="text-white font-display text-lg font-bold tracking-tight">Smart Haid</h1>
                        <p className="text-white/40 text-xs">Admin Panel</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1.5 flex-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`admin-sidebar-item ${isActive ? 'active' : ''}`}>
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="border-t border-white/10 pt-4 mt-4 flex flex-col gap-1.5">
                    <button className="admin-sidebar-item w-full">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                    <button className="admin-sidebar-item w-full text-red-400/70 hover:text-red-400">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
