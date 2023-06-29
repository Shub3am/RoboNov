import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
interface product {
  products: [
    {
      title: String;
      price: number;
      description: String;
      rating: number;
      thumbnail: String;
      category: String;
    }
  ];
}

export async function GET() {
  const res: product = await fetch("https://dummyjson.com/products").then(
    (res) => res.json()
  );

  const products = await res.products.map((product) => {
    return {
      title: product.title,
      price: Math.floor(product.price),
      description: product.description,
      thumbnail: product.thumbnail,
      category: product.category,
      rating: Math.floor(product.rating),
    };
  });

  // console.log(products);
  const result = await prisma.products.createMany({
    data: products,
    skipDuplicates: true,
  });
  return NextResponse.json("Done");
}
