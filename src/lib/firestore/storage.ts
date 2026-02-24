import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export interface StorageFile {
    name: string;
    url: string;
    path: string;
}

export async function uploadPDF(file: File): Promise<string> {
    const storageRef = ref(storage, `pdfs/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

export async function getPDFUrl(path: string): Promise<string> {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
}

export async function listPDFs(): Promise<StorageFile[]> {
    const pdfsRef = ref(storage, 'pdfs');
    try {
        const result = await listAll(pdfsRef);
        const files = await Promise.all(
            result.items.map(async (item) => ({
                name: item.name,
                url: await getDownloadURL(item),
                path: item.fullPath,
            }))
        );
        return files;
    } catch {
        return [];
    }
}

export async function uploadImage(file: File): Promise<string> {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}
