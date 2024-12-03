import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import Prisma client
import bcrypt from 'bcryptjs'; // For password comparison

export async function POST(req: Request) {
  try {
    // Parse incoming request JSON
    const { email, password } = await req.json();

    // Find the user in the database by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return an error if the user doesn't exist
      return NextResponse.json(
        { success: false, error: 'User not found.' },
        { status: 404 }
      );
    }

    // Compare plain-text password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      // Return an error if the password is invalid
      return NextResponse.json(
        { success: false, error: 'Invalid password.' },
        { status: 401 }
      );
    }

    // If successful, return a success response (add JWT/token logic if needed)
    return NextResponse.json(
      { success: true, message: 'Login successful!', user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}