import { NextResponse, NextRequest } from 'next/server'
import { join } from 'path'
import { writeFile } from 'fs/promises'

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file found' }, { status: 400 })
  }

  // Check the MIME type of the file
  if (file.type !== 'video/mp4') {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can now do anything you want with it,
  // For this, we will just write it to a filesystem un a new location

  console.log('Writing file to filesystem')
  const path = `./public/video.mp4`
  await writeFile(path, buffer)
  console.log('File written to', path)

  return NextResponse.json({ success: true })

}