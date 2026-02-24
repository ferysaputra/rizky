'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface UserData {
    uid: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    avatar: string;
    cycleSettings?: {
        lastDate: Date;
        length: number;
        periodLength: number;
    };
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                // Fetch user profile from Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData({
                        uid: firebaseUser.uid,
                        email: data.email,
                        name: data.name,
                        role: data.role || 'user',
                        avatar: data.avatar || '👩',
                        cycleSettings: data.cycleSettings
                            ? {
                                lastDate: data.cycleSettings.lastDate?.toDate?.() || new Date(),
                                length: data.cycleSettings.length || 28,
                                periodLength: data.cycleSettings.periodLength || 5,
                            }
                            : undefined,
                    });
                    // Update last login
                    await setDoc(
                        doc(db, 'users', firebaseUser.uid),
                        { lastLogin: serverTimestamp() },
                        { merge: true }
                    );
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const register = async (email: string, password: string, name: string) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        // Create user profile in Firestore
        await setDoc(doc(db, 'users', credential.user.uid), {
            email,
            name,
            role: 'user',
            avatar: '👩',
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
        });
    };

    const logout = async () => {
        await signOut(auth);
        setUserData(null);
    };

    const isAdmin = userData?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, userData, loading, isAdmin, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
