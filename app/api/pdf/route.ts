import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const document = await prisma.document.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!document) {
      return new NextResponse('No PDF found', { status: 404 });
    }

    const buf = document.fileData as unknown as Buffer;
    const arrayBuffer = buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength
    ) as ArrayBuffer;

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': document.mimeType,
        'Content-Disposition': `inline; filename="${document.fileName}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
