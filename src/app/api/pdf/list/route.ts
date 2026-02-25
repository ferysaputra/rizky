import { NextResponse } from 'next/server';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { r2, R2_BUCKET, R2_PUBLIC_URL } from '@/lib/r2';

export async function GET() {
    try {
        const result = await r2.send(
            new ListObjectsV2Command({
                Bucket: R2_BUCKET,
                Prefix: 'pdfs/',
            })
        );

        const files = (result.Contents || [])
            .filter((obj) => obj.Key && obj.Key !== 'pdfs/')
            .map((obj) => ({
                name: obj.Key!.replace('pdfs/', '').replace(/^\d+_/, ''),
                url: `${R2_PUBLIC_URL}/${obj.Key}`,
                path: obj.Key!,
            }));

        return NextResponse.json(files);
    } catch (error) {
        console.error('R2 list error:', error);
        return NextResponse.json([], { status: 200 });
    }
}
