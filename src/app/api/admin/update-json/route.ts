import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Simple token validation middleware
function validateToken(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  
  // In production, implement proper JWT validation
  // For now, just check if token exists and is not expired
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, timestamp] = decoded.split(':');
    const tokenAge = Date.now() - parseInt(timestamp);
    return tokenAge < 24 * 60 * 60 * 1000; // 24 hours
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    if (!validateToken(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { filePath, data } = await request.json();

    if (!filePath || !data) {
      return NextResponse.json(
        { error: 'File path and data are required' },
        { status: 400 }
      );
    }

    // Convert API path to file system path
    // /api/data/pages.json -> src/data/pages.json
    const apiPathRegex = /^\/api\/data\/([a-zA-Z0-9\-_]+\.json)$/;
    const match = filePath.match(apiPathRegex);
    
    if (!match) {
      return NextResponse.json(
        { error: 'Invalid API path format' },
        { status: 400 }
      );
    }

    const filename = match[1];
    const systemPath = `src/data/${filename}`;

    // Security: Ensure we're only writing to allowed directories
    const allowedPaths = [
      'src/data/pages.json',
      'src/data/services.json',
      'src/data/fleet.json',
      'src/data/gallery.json',
      'src/data/ratings.json',
      'src/data/partners.json',
      'src/data/contact.json',
      'src/data/sightseeing.json',
      'src/data/pricing.json',
      'src/data/newsletter.json',
      'src/data/navigation.json',
      'src/data/meta-content.json',
      'src/data/company-info.json',
      'src/data/site-config.json',
    ];

    if (!allowedPaths.includes(systemPath)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      );
    }

    const fullPath = path.join(process.cwd(), systemPath);

    // Ensure directory exists
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });

    // Write the file
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({
      message: 'File updated successfully',
      path: systemPath,
    });
  } catch (error) {
    console.error('Update JSON error:', error);
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    );
  }
}