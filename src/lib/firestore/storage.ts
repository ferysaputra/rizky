import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export interface StorageFile {
    name: string;
    url: string;
    path: string;
}

// --- PDF functions now use Cloudflare R2 via API routes ---

export async function uploadPDF(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/pdf/upload', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('PDF upload failed');
    }

    const data = await res.json();
    return data.url;
}

export async function listPDFs(): Promise<StorageFile[]> {
    try {
        const res = await fetch('/api/pdf/list');
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

// --- Image functions still use Firebase Storage ---

export async function uploadImage(file: File): Promise<string> {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}
