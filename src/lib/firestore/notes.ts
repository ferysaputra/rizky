import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    query,
    where,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Note {
    id: string;
    userId: string;
    title: string;
    body: string;
    createdAt: Date;
    color: string;
}

const notesRef = collection(db, 'notes');
const noteColors = ['#fce4ec', '#f3e5f5', '#e8f5e9', '#fff3e0', '#e3f2fd', '#fce4ec'];

export async function getNotes(userId: string): Promise<Note[]> {
    const q = query(notesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate?.() || new Date(),
    })) as Note[];
}

export async function getAllNotes(): Promise<Note[]> {
    const q = query(notesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate?.() || new Date(),
    })) as Note[];
}

export async function createNote(userId: string, title: string, body: string) {
    const color = noteColors[Math.floor(Math.random() * noteColors.length)];
    return await addDoc(notesRef, {
        userId,
        title,
        body,
        color,
        createdAt: serverTimestamp(),
    });
}

export async function updateNote(id: string, data: { title?: string; body?: string }) {
    const ref = doc(db, 'notes', id);
    await updateDoc(ref, data);
}

export async function deleteNote(id: string) {
    await deleteDoc(doc(db, 'notes', id));
}
