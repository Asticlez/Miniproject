import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // Minimum 6 characters
  name: z.string().min(1),  // Must fill up the name in there  
});

export async function POST(req: Request) {
  console.log("DATABASE_URL in API:", process.env.DATABASE_URL);
  console.log("Incoming registration request"); 

  try {
    const { email, password, name } = registerSchema.parse(await req.json());
    console.log("Parsed request data:", { email, name });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser.email); 
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: { email, password, name },
    });

    console.log("User created successfully:", user); 
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error during user registration:", error); 

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}