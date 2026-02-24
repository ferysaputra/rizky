import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    orderBy,
    query,
    where,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const chatsRef = collection(db, 'chats');

// Get or create a chat thread between user and admin
export async function getOrCreateThread(
    userId: string,
    userName: string,
    userAvatar: string
): Promise<string> {
    // Check if thread exists for this user
    const q = query(chatsRef, where('participants', 'array-contains', userId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        return snapshot.docs[0].id;
    }

    // Create new thread
    const newThread = await addDoc(chatsRef, {
        participants: [userId],
        participantName: userName,
        lastMessage: '',
        updatedAt: serverTimestamp(),
        unreadCount: 0,
        avatar: userAvatar,
    });

    return newThread.id;
}

// Subscribe to all threads (admin view)
export function subscribeToThreads(callback: (threads: ChatThread[]) => void) {
    const q = query(chatsRef, orderBy('updatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const threads = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            updatedAt: (doc.data().updatedAt as Timestamp)?.toDate?.() || new Date(),
        })) as ChatThread[];
        callback(threads);
    });
}

// Subscribe to messages in a thread (real-time)
export function subscribeToMessages(threadId: string, callback: (messages: ChatMessage[]) => void) {
    const messagesRef = collection(db, 'chats', threadId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: (doc.data().timestamp as Timestamp)?.toDate?.() || new Date(),
        })) as ChatMessage[];
        callback(messages);
    });
}

// Send a message
export async function sendMessage(threadId: string, senderId: string, text: string) {
    const messagesRef = collection(db, 'chats', threadId, 'messages');
    await addDoc(messagesRef, {
        senderId,
        text,
        timestamp: serverTimestamp(),
        isRead: false,
    });

    // Update thread's last message
    const threadRef = doc(db, 'chats', threadId);
    await updateDoc(threadRef, {
        lastMessage: text,
        updatedAt: serverTimestamp(),
    });
}

// Get user's thread (for user view)
export async function getUserThread(userId: string): Promise<ChatThread | null> {
    const q = query(chatsRef, where('participants', 'array-contains', userId), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    return {
        id: d.id,
        ...d.data(),
        updatedAt: (d.data().updatedAt as Timestamp)?.toDate?.() || new Date(),
    } as ChatThread;
}
