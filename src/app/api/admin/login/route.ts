import { NextRequest, NextResponse } from 'next/server';

// Admin credentials
const ADMIN_CREDENTIALS = [
  { username: 'avirajjha6114@gmail.com', password: 'Adarsh_1M' },
  { username: 'admin@itzadarsh.co.in', password: 'Adarsh_1M' },
];

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check credentials
    const isValid = ADMIN_CREDENTIALS.some(
      cred => cred.username === username && cred.password === password
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session token (in production, use proper session management)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    const response = NextResponse.json({
      message: 'Login successful',
      user: { username },
      token,
    });

    // Set HTTP-only cookie for session management
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
