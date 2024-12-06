import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const accommodations = await prisma.accommodation.findMany();
  return NextResponse.json(accommodations);
}