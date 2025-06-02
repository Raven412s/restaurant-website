import { NextResponse } from 'next/server';
import { connectToDb } from '@/lib/mongoDb';
import { MenuSection } from '@/models/MenuSection';

export async function GET() {
    try {
        await connectToDb()

        const sections = await MenuSection.find()

        return NextResponse.json(sections)
    } catch (error) {
        console.error("Error fetching menu sections:", error)
        return new NextResponse("Failed to fetch menu sections", { status: 500 })
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Connect to the database
    await connectToDb();

    // Create a new menu section
    const menuSection = await MenuSection.create(body);

    return NextResponse.json(menuSection, { status: 201 });
  } catch (error) {
    console.error('Error creating menu section:', error);
    return NextResponse.json(
      { error: 'Failed to create menu section' },
      { status: 500 }
    );
  }
}
