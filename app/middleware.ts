import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // If no token, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

    // Check for token expiry (optional)
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.error("Middleware error: Token expired");
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (err) {
    // If token is invalid, redirect to login
    console.error("Middleware error: Invalid token", err);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/dashboard/:path*'], // Apply to these routes
};