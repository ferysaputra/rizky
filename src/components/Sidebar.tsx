'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileEdit, Users, MessageSquare, Settings, LogOut, Heart, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const sidebarItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/cms', icon: FileEdit, label: 'Pengelola Konten' },
    { href: '/admin/users', icon: Users, label: 'Pengguna' },
    { href: '/admin/chat', icon: MessageSquare, label: 'Obrolan Bantuan' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-3.5 z-40 p-2 bg-white rounded-lg shadow-sm border border-border text-foreground transition-all duration-300 ${isOpen ? 'left-[264px] md:left-[272px]' : 'left-4'}`}
            >
                <Menu size={20} />
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30 animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar container */}
            <aside className={`
                admin-sidebar min-h-screen flex flex-col p-4 shrink-0 
                fixed md:relative left-0 top-0 z-40 h-[100dvh] transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 px-0 opacity-0 md:opacity-100'}
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
                    {/*button className="admin-sidebar-item w-full">
                        <Settings size={20} />
                        <span>Pengaturan</span>
                    </button>*/}
                    <button onClick={handleLogout} className="admin-sidebar-item w-full text-red-400/70 hover:text-red-400">
                        <LogOut size={20} />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
