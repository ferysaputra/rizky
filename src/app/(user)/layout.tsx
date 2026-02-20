import BottomNav from '@/components/BottomNav';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background min-h-screen flex justify-center">
            <div className="phone-frame relative overflow-x-hidden">
                <div className="pb-24">
                    {children}
                </div>
                <BottomNav />
            </div>
        </div>
    );
}
