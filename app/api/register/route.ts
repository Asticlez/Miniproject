import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schema for validating request data
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // Minimum 6 characters
  name: z.string().min(1), // Name must not be empty
});

export async function POST(req: Request) {
  try {
    // Parse and validate input data
    const { email, password, name } = registerSchema.parse(await req.json());

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    // Handle specific errors (e.g., validation)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }

    // Log unexpected errors for debugging
    console.error("Error during user registration:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}