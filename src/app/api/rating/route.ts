import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface RatingData {
  name: string;
  rating: number;
  comment: string;
}

interface RatingsFile {
  count: number;
  average: number;
  items: Array<{
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: RatingData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Valid name and rating (1-5) are required' },
        { status: 400 }
      );
    }

    // Read current ratings data
    const ratingsPath = path.join(process.cwd(), 'data', 'ratings.json');
    const ratingsData: RatingsFile = JSON.parse(
      await fs.readFile(ratingsPath, 'utf-8')
    );

    // Create new rating entry
    const newRating = {
      id: ratingsData.items.length + 1,
      name: body.name,
      rating: body.rating,
      comment: body.comment || '',
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };

    // Add new rating to items
    ratingsData.items.push(newRating);

    // Update count and average
    ratingsData.count += 1;
    const totalRating = ratingsData.items.reduce((sum, item) => sum + item.rating, 0);
    ratingsData.average = Number((totalRating / ratingsData.count).toFixed(1));

    // Save updated ratings data
    await fs.writeFile(ratingsPath, JSON.stringify(ratingsData, null, 2));

    console.log('New rating submitted:', newRating);

    return NextResponse.json({
      message: 'Rating submitted successfully',
      newCount: ratingsData.count,
      newAverage: ratingsData.average,
    });
  } catch (error) {
    console.error('Error processing rating:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ratingsPath = path.join(process.cwd(), 'data', 'ratings.json');
    const ratingsData: RatingsFile = JSON.parse(
      await fs.readFile(ratingsPath, 'utf-8')
    );

    return NextResponse.json(ratingsData);
  } catch (error) {
    console.error('Error reading ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}