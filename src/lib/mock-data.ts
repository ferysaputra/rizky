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
        title: 'Understanding Your Menstrual Cycle',
        content: '<p>Your menstrual cycle is a monthly process that prepares your body for pregnancy. Understanding each phase helps you better manage your health and well-being.</p>',
        excerpt: 'Learn about the four phases of your menstrual cycle and how to track them effectively.',
        youtubeId: 'dQw4w9WgXcQ',
        createdAt: new Date('2026-02-15'),
        category: 'Health',
        imageUrl: '/images/article1.jpg',
    },
    {
        id: '2',
        title: 'Nutrition Tips During Your Period',
        content: '<p>Eating the right foods during your period can help alleviate cramps, reduce bloating, and improve your mood.</p>',
        excerpt: 'Discover the best foods to eat during your period for comfort and energy.',
        youtubeId: 'dQw4w9WgXcQ',
        createdAt: new Date('2026-02-12'),
        category: 'Nutrition',
        imageUrl: '/images/article2.jpg',
    },
    {
        id: '3',
        title: 'Exercise and Your Cycle',
        content: '<p>Adjusting your workout routine to match your cycle phase can optimize your performance and recovery.</p>',
        excerpt: 'How to adapt your exercise routine to each phase of your menstrual cycle.',
        youtubeId: 'dQw4w9WgXcQ',
        createdAt: new Date('2026-02-10'),
        category: 'Fitness',
        imageUrl: '/images/article3.jpg',
    },
    {
        id: '4',
        title: 'Managing PMS Symptoms Naturally',
        content: '<p>Natural remedies and lifestyle changes can significantly reduce PMS symptoms and improve your quality of life.</p>',
        excerpt: 'Natural approaches to managing premenstrual syndrome symptoms.',
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
        title: 'Doctor Appointment',
        body: 'Schedule checkup with Dr. Sarah next week. Remember to ask about vitamin D levels and sleep issues.',
        createdAt: new Date('2026-02-18'),
        color: '#fce4ec',
    },
    {
        id: '2',
        userId: 'user1',
        title: 'Symptoms Log',
        body: 'Mild cramps today, lower back pain. Took ibuprofen at 2pm. Feeling better by evening.',
        createdAt: new Date('2026-02-17'),
        color: '#f3e5f5',
    },
    {
        id: '3',
        userId: 'user1',
        title: 'Meal Plan Ideas',
        body: 'Iron-rich foods: spinach, lentils, dark chocolate. Add more omega-3s (salmon, walnuts).',
        createdAt: new Date('2026-02-16'),
        color: '#e8f5e9',
    },
    {
        id: '4',
        userId: 'user1',
        title: 'Self Care Reminder',
        body: 'Take warm baths, drink herbal tea, practice deep breathing exercises when feeling stressed.',
        createdAt: new Date('2026-02-14'),
        color: '#fff3e0',
    },
];

// === CHAT MESSAGES ===
export const mockChatMessages: ChatMessage[] = [
    {
        id: '1',
        senderId: 'admin1',
        text: 'Hi! Welcome to Smart Haid support. How can I help you today? 😊',
        timestamp: new Date('2026-02-19T09:00:00'),
        isRead: true,
    },
    {
        id: '2',
        senderId: 'user1',
        text: 'Hi! I have a question about the calendar feature. How do I set my cycle length?',
        timestamp: new Date('2026-02-19T09:02:00'),
        isRead: true,
    },
    {
        id: '3',
        senderId: 'admin1',
        text: 'Great question! Go to the Calendar tab, then tap the settings icon at the top. You can enter your average cycle length there.',
        timestamp: new Date('2026-02-19T09:03:00'),
        isRead: true,
    },
    {
        id: '4',
        senderId: 'user1',
        text: 'Found it! Thank you so much 💕',
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
        lastMessage: 'Found it! Thank you so much 💕',
        updatedAt: new Date('2026-02-19T09:05:00'),
        unreadCount: 0,
        avatar: '👩',
    },
    {
        id: 'thread2',
        participants: ['user2', 'admin1'],
        participantName: 'Dewi Lestari',
        lastMessage: 'Can I export my calendar data?',
        updatedAt: new Date('2026-02-19T08:30:00'),
        unreadCount: 1,
        avatar: '👩‍🦱',
    },
    {
        id: 'thread3',
        participants: ['user3', 'admin1'],
        participantName: 'Siti Rahma',
        lastMessage: 'The PDF viewer is not loading for me',
        updatedAt: new Date('2026-02-18T16:20:00'),
        unreadCount: 2,
        avatar: '👩‍🦰',
    },
    {
        id: 'thread4',
        participants: ['user4', 'admin1'],
        participantName: 'Nur Fadilah',
        lastMessage: 'Thanks for the help!',
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
