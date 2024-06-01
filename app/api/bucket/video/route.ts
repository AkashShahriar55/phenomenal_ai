
import { getS3Client } from '@/app/util/getS3Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const {key} = req.query;

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key as string,
        });

        try {
            const s3Client = await getS3Client()
            const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
            res.status(200).json({ url });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error generating pre-signed URL' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}