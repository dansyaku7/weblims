import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  // Ambil nama file dari URL, contoh: /api/upload?filename=ttd.png
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Pastikan ada nama file dan body request
  if (!filename || !request.body) {
    return NextResponse.json(
      { message: 'Nama file tidak ditemukan.' },
      { status: 400 },
    );
  }

  try {
    // Unggah file ke Vercel Blob
    // `request.body` adalah file yang di-stream langsung
    const blob = await put(filename, request.body, {
      access: 'public', // Membuat file dapat diakses secara publik
    });

    // `blob.url` adalah URL publik yang akan kita simpan di database
    // Contoh: "https://<id>.public.blob.vercel-storage.com/ttd-123.png"
    return NextResponse.json(blob);

  } catch (error) {
    console.error('Upload Error to Vercel Blob:', error);
    return NextResponse.json(
      { message: 'Gagal mengunggah file ke Vercel Blob.' },
      { status: 500 },
    );
  }
}
