import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET || "default-secret";

interface JwtPayload {
  id: number;
}

export async function GET(req: Request) {
  try {
    // Extract token from cookies
    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { name: true, email: true }, // Only return necessary fields
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Error in GET /api/profile:", error.message || error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
