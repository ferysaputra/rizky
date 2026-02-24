import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface UserProfile {
    uid: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    lastLogin: Date;
    avatar: string;
    cycleSettings?: {
        lastDate: Date;
        length: number;
        periodLength: number;
    };
}

const usersRef = collection(db, 'users');

export async function getUsers(): Promise<UserProfile[]> {
    const q = query(usersRef, orderBy('lastLogin', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            uid: doc.id,
            email: data.email,
            name: data.name,
            role: data.role || 'user',
            lastLogin: (data.lastLogin as Timestamp)?.toDate?.() || new Date(),
            avatar: data.avatar || '👩',
            cycleSettings: data.cycleSettings
                ? {
                    lastDate: (data.cycleSettings.lastDate as Timestamp)?.toDate?.() || new Date(),
                    length: data.cycleSettings.length || 28,
                    periodLength: data.cycleSettings.periodLength || 5,
                }
                : undefined,
        };
    });
}

export async function getUser(uid: string): Promise<UserProfile | null> {
    const snap = await getDoc(doc(db, 'users', uid));
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
        uid: snap.id,
        email: data.email,
        name: data.name,
        role: data.role || 'user',
        lastLogin: (data.lastLogin as Timestamp)?.toDate?.() || new Date(),
        avatar: data.avatar || '👩',
        cycleSettings: data.cycleSettings
            ? {
                lastDate: (data.cycleSettings.lastDate as Timestamp)?.toDate?.() || new Date(),
                length: data.cycleSettings.length || 28,
                periodLength: data.cycleSettings.periodLength || 5,
            }
            : undefined,
    };
}

export async function updateCycleSettings(
    uid: string,
    settings: { lastDate: Date; length: number; periodLength: number }
) {
    const ref = doc(db, 'users', uid);
    await setDoc(
        ref,
        {
            cycleSettings: {
                lastDate: settings.lastDate,
                length: settings.length,
                periodLength: settings.periodLength,
            },
        },
        { merge: true }
    );
}
