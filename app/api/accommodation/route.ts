import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET handler: Fetch accommodations
export async function GET(req: Request) {
  const url = new URL(req.url);
  const passportNo = url.searchParams.get("passportNo");

  try {
    const accommodations = passportNo
      ? // If `passportNo` is provided, fetch specific data
        await prisma.accommodation.findMany({
          where: { passportNo },
          select: {
            id: true,
            checkInDate: true,
            checkOutDate: true,
            firstName: true,
            lastName: true,
            nationality: true,
          },
        })
      : // If no `passportNo`, fetch all accommodations (for admin)
        await prisma.accommodation.findMany({
          select: {
            id: true,
            checkInDate: true,
            checkOutDate: true,
            firstName: true,
            lastName: true,
            nationality: true,
          },
        });

    return NextResponse.json(accommodations, { status: 200 });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return NextResponse.json(
      { error: "Failed to fetch accommodations" },
      { status: 500 }
    );
  }
}

// POST handler: Save new accommodation
export async function POST(req: Request) {
  try {
    const {
      checkInDate,
      checkOutDate,
      informDate,
      firstName,
      middleName,
      lastName,
      passportNo,
      nationality,
      gender,
      birthDate,
      phoneNo,
      nights,
    } = await req.json();

    // Ensure all required fields are present
    if (
      !checkInDate ||
      !informDate ||
      !firstName ||
      !lastName ||
      !passportNo ||
      !nationality ||
      !gender ||
      !birthDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to the database
    const newAccommodation = await prisma.accommodation.create({
      data: {
        checkInDate: new Date(checkInDate),
        checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
        informDate: new Date(informDate),
        firstName,
        middleName: middleName || null,
        lastName,
        passportNo,
        nationality,
        gender,
        birthDate: new Date(birthDate),
        phoneNo: phoneNo || null,
        nights,
      },
    });

    return NextResponse.json(newAccommodation, { status: 201 });
  } catch (error) {
    console.error("Error saving accommodation:", error);
    return NextResponse.json(
      { error: "Failed to save accommodation data." },
      { status: 500 }
    );
  }
}