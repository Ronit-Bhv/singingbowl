import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replaceAll(/\s+/g, "-"),
        description: body.description,
        price: Number.parseFloat(body.price),
        imageUrl: body.imageUrl,
        imageHint: body.imageHint || "product image",
        audioUrl: body.audioUrl || "",
        tag: body.tag || "singing-bowl",
      },
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
