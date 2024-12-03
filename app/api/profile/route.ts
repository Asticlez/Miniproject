import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Adjust the path based on your setup

// GET: Fetch Profile
export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { id: 2 }, // Use logged-in user's ID here
      select: { id: true, name: true, email: true }, // Exclude the password field
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching profile" }, { status: 500 });
  }
}

// PUT: Update Profile
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: 1 }, // Use logged-in user's ID here
      data: {
        name: data.name,
        email: data.email,
      },
      select: { id: true, name: true, email: true }, // Exclude the password field
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Error updating profile" }, { status: 500 });
  }
}
