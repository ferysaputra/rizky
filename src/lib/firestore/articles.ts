import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const articlesRef = collection(db, 'articles');

export async function getArticles(): Promise<Article[]> {
    const q = query(articlesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate?.() || new Date(),
    })) as Article[];
}

export async function getArticle(id: string): Promise<Article | null> {
    const snap = await getDoc(doc(db, 'articles', id));
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
        id: snap.id,
        ...data,
        createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
    } as Article;
}

export async function createArticle(data: Omit<Article, 'id' | 'createdAt'>) {
    return await addDoc(articlesRef, {
        ...data,
        createdAt: serverTimestamp(),
    });
}

export async function updateArticle(id: string, data: Partial<Omit<Article, 'id'>>) {
    const ref = doc(db, 'articles', id);
    await updateDoc(ref, data);
}

export async function deleteArticle(id: string) {
    await deleteDoc(doc(db, 'articles', id));
}
