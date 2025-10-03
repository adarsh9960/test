import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Validate filename to prevent directory traversal
    if (!filename.match(/^[a-zA-Z0-9\-_]+\.json$/)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    // Construct the file path
    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read the file
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error serving JSON file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}