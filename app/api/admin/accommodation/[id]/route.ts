import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE Accommodation Record
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.accommodation.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting record:", error.message);
      return NextResponse.json(
        { error: "Failed to delete record.", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}

// PUT (Update) Accommodation Record
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await req.json();
    const { firstName, lastName, nationality } = body;

    // Validation: Ensure all required fields are provided
    if (!firstName || !lastName || !nationality) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, nationality" },
        { status: 400 }
      );
    }

    const updatedAccommodation = await prisma.accommodation.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        nationality,
      },
    });

    return NextResponse.json(updatedAccommodation);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating record:", error.message);
      return NextResponse.json(
        { error: "Failed to update record.", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}