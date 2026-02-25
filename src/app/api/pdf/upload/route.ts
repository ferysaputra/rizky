import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2, R2_BUCKET, R2_PUBLIC_URL } from '@/lib/r2';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const key = `pdfs/${Date.now()}_${file.name}`;

        await r2.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET,
                Key: key,
                Body: buffer,
                ContentType: file.type || 'application/pdf',
            })
        );

        const url = `${R2_PUBLIC_URL}/${key}`;

        return NextResponse.json({ url, name: file.name, path: key });
    } catch (error) {
        console.error('R2 upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
