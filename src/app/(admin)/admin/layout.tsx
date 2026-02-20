import Sidebar from '@/components/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#f8f9fc]">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                {/* Top Bar */}
                <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-20">
                    <div>
                        <h2 className="font-display font-bold text-lg text-foreground">Dashboard</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right mr-2">
                            <p className="text-sm font-semibold">Admin Staff</p>
                            <p className="text-xs text-muted">admin@smarthaid.com</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm">
                            👩‍💼
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
