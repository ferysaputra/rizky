// Mock data for Smart Haid frontend development

export interface Article {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    youtubeId: string;
    createdAt: Date;
    category: string;
    imageUrl: string;
}

export interface Note {
    id: string;
    userId: string;
    title: string;
    body: string;
    createdAt: Date;
    color: string;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
    isRead: boolean;
}

export interface ChatThread {
    id: string;
    participants: string[];
    participantName: string;
    lastMessage: string;
    updatedAt: Date;
    unreadCount: number;
    avatar: string;
}

export interface User {
    uid: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    lastLogin: Date;
    avatar: string;
    cycleSettings?: {
        lastDate: Date;
        length: number;
    };
}

// === ARTICLES ===
export const mockArticles: Article[] = [
    {
        id: '1',
        title: 'Memahami Siklus Menstruasi Anda',
        content: '<p>Siklus menstruasi Anda adalah proses bulanan yang mempersiapkan tubuh Anda untuk kehamilan. Memahami setiap fase membantu Anda mengelola kesehatan dan kesejahteraan dengan lebih baik.</p>',
        excerpt: 'Pelajari tentang empat fase siklus menstruasi Anda dan bagaimana melacaknya secara efektif.',
        youtubeId: 'dQw4w9WgXcQ',
        createdAt: new Date('2026-02-15'),
        category: 'Health',
        imageUrl: '/images/article1.jpg',
    },
    {
        id: '2',
        title: 'Tips Nutrisi Selama Menstruasi',
        content: '<p>Memakan makanan yang tepat selama menstruasi dapat membantu meredakan kram, mengurangi kembung, dan memperbaiki suasana hati Anda.</p>',
        excerpt: 'Temukan makanan terbaik untuk dikonsumsi selama menstruasi demi kenyamanan dan energi.',
        youtubeId: 'dQw4w9WgXcQ',
        createdAt: new Date('2026-02-12'),
        category: 'Nutrition',
        imageUrl: '/images/article2.jpg',
    },
    {
        id: '3',
        title: 'Olahraga dan Siklus Anda',
        content: '<p>Menyesuaikan rutinitas olahraga Anda dengan fase siklus dapat mengoptimalkan kinerja dan pemulihan Anda.</p>',
        excerpt: 'Cara mengadaptasi rutinitas olahraga Anda dengan setiap fase siklus menstruasi Anda.',
        youtubeId: 'dQw4w9WgXcQ',
        createdAt: new Date('2026-02-10'),
        category: 'Fitness',
        imageUrl: '/images/article3.jpg',
    },
    {
        id: '4',
        title: 'Mengelola Gejala PMS Secara Alami',
        content: '<p>Pengobatan alami dan perubahan gaya hidup dapat mengurangi gejala PMS secara signifikan dan meningkatkan kualitas hidup Anda.</p>',
        excerpt: 'Pendekatan alami untuk mengelola gejala sindrom pramenstruasi.',
        youtubeId: 'dQw4w9WgXcQ',
        createdAt: new Date('2026-02-08'),
        category: 'Wellness',
        imageUrl: '/images/article4.jpg',
    },
];

// === NOTES ===
export const mockNotes: Note[] = [
    {
        id: '1',
        userId: 'user1',
        title: 'Janji Temu Dokter',
        body: 'Jadwalkan pemeriksaan dengan Dr. Sarah minggu depan. Ingat untuk menanyakan tentang tingkat vitamin D dan masalah tidur.',
        createdAt: new Date('2026-02-18'),
        color: '#fce4ec',
    },
    {
        id: '2',
        userId: 'user1',
        title: 'Catatan Gejala',
        body: 'Kram ringan hari ini, nyeri punggung bawah. Minum ibuprofen jam 2 siang. Merasa lebih baik menjelang malam.',
        createdAt: new Date('2026-02-17'),
        color: '#f3e5f5',
    },
    {
        id: '3',
        userId: 'user1',
        title: 'Ide Rencana Makan',
        body: 'Makanan kaya zat besi: bayam, lentil, cokelat hitam. Tambahkan lebih banyak omega-3 (salmon, kenari).',
        createdAt: new Date('2026-02-16'),
        color: '#e8f5e9',
    },
    {
        id: '4',
        userId: 'user1',
        title: 'Pengingat Perawatan Diri',
        body: 'Mandi air hangat, minum teh herbal, praktikkan latihan pernapasan dalam saat merasa stres.',
        createdAt: new Date('2026-02-14'),
        color: '#fff3e0',
    },
];

// === CHAT MESSAGES ===
export const mockChatMessages: ChatMessage[] = [
    {
        id: '1',
        senderId: 'admin1',
        text: 'Hai! Selamat datang di dukungan Smart Haid. Ada yang bisa saya bantu hari ini? 😊',
        timestamp: new Date('2026-02-19T09:00:00'),
        isRead: true,
    },
    {
        id: '2',
        senderId: 'user1',
        text: 'Hai! Saya punya pertanyaan tentang fitur kalender. Bagaimana cara mengatur panjang siklus saya?',
        timestamp: new Date('2026-02-19T09:02:00'),
        isRead: true,
    },
    {
        id: '3',
        senderId: 'admin1',
        text: 'Pertanyaan bagus! Buka tab Kalender, lalu ketuk ikon pengaturan di bagian atas. Anda dapat memasukkan rata-rata panjang siklus Anda di sana.',
        timestamp: new Date('2026-02-19T09:03:00'),
        isRead: true,
    },
    {
        id: '4',
        senderId: 'user1',
        text: 'Ketemu! Terima kasih banyak 💕',
        timestamp: new Date('2026-02-19T09:05:00'),
        isRead: true,
    },
];

// === CHAT THREADS (Admin View) ===
export const mockChatThreads: ChatThread[] = [
    {
        id: 'thread1',
        participants: ['user1', 'admin1'],
        participantName: 'Aisya Putri',
        lastMessage: 'Ketemu! Terima kasih banyak 💕',
        updatedAt: new Date('2026-02-19T09:05:00'),
        unreadCount: 0,
        avatar: '👩',
    },
    {
        id: 'thread2',
        participants: ['user2', 'admin1'],
        participantName: 'Dewi Lestari',
        lastMessage: 'Bisakah saya mengekspor data kalender saya?',
        updatedAt: new Date('2026-02-19T08:30:00'),
        unreadCount: 1,
        avatar: '👩‍🦱',
    },
    {
        id: 'thread3',
        participants: ['user3', 'admin1'],
        participantName: 'Siti Rahma',
        lastMessage: 'Penampil PDF tidak memuat untuk saya',
        updatedAt: new Date('2026-02-18T16:20:00'),
        unreadCount: 2,
        avatar: '👩‍🦰',
    },
    {
        id: 'thread4',
        participants: ['user4', 'admin1'],
        participantName: 'Nur Fadilah',
        lastMessage: 'Terima kasih atas bantuannya!',
        updatedAt: new Date('2026-02-18T14:10:00'),
        unreadCount: 0,
        avatar: '🧕',
    },
];

// === USERS (Admin View) ===
export const mockUsers: User[] = [
    {
        uid: 'user1',
        email: 'aisya@example.com',
        name: 'Aisya Putri',
        role: 'user',
        lastLogin: new Date('2026-02-19T09:05:00'),
        avatar: '👩',
        cycleSettings: { lastDate: new Date('2026-02-10'), length: 28 },
    },
    {
        uid: 'user2',
        email: 'dewi@example.com',
        name: 'Dewi Lestari',
        role: 'user',
        lastLogin: new Date('2026-02-19T08:30:00'),
        avatar: '👩‍🦱',
        cycleSettings: { lastDate: new Date('2026-02-05'), length: 30 },
    },
    {
        uid: 'user3',
        email: 'siti@example.com',
        name: 'Siti Rahma',
        role: 'user',
        lastLogin: new Date('2026-02-18T16:20:00'),
        avatar: '👩‍🦰',
    },
    {
        uid: 'user4',
        email: 'nur@example.com',
        name: 'Nur Fadilah',
        role: 'user',
        lastLogin: new Date('2026-02-18T14:10:00'),
        avatar: '🧕',
        cycleSettings: { lastDate: new Date('2026-02-15'), length: 26 },
    },
    {
        uid: 'admin1',
        email: 'admin@smarthaid.com',
        name: 'Admin Staff',
        role: 'admin',
        lastLogin: new Date('2026-02-19T07:00:00'),
        avatar: '👩‍💼',
    },
];

// === CYCLE CALCULATION HELPERS ===
export type CyclePhase = 'period' | 'fertile' | 'ovulation' | 'normal';

export function getCyclePhase(dayOfCycle: number, cycleLength: number, periodLength: number = 5): CyclePhase {
    // Period: days 1 to periodLength
    if (dayOfCycle >= 1 && dayOfCycle <= periodLength) return 'period';

    // Ovulation: typically around day 14 (cycleLength - 14)
    const ovulationDay = cycleLength - 14;

    // Ovulation day
    if (dayOfCycle === ovulationDay) return 'ovulation';

    // Fertile window: 5 days before ovulation to 1 day after
    if (dayOfCycle >= ovulationDay - 5 && dayOfCycle <= ovulationDay + 1) return 'fertile';

    return 'normal';
}

export function getDayOfCycle(date: Date, lastPeriodDate: Date): number {
    const diffTime = date.getTime() - lastPeriodDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
}

export function getPhaseColor(phase: CyclePhase): string {
    switch (phase) {
        case 'period': return 'var(--period-red)';
        case 'ovulation': return 'var(--ovulation-purple)';
        case 'fertile': return 'var(--fertile-green)';
        default: return 'transparent';
    }
}

export function getPhaseLabel(phase: CyclePhase): string {
    switch (phase) {
        case 'period': return 'Period';
        case 'ovulation': return 'Ovulation';
        case 'fertile': return 'Fertile Window';
        default: return '';
    }
}
