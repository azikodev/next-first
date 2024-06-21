// "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  images: string[];
}

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10 max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            className="card bg-white p-4 rounded-lg shadow-md"
            key={product.id}
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-[300px] object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold mb-2">
              {truncateTitle(product.title, 30)}
            </h2>
            <Link href={`/products/${product.id}`}>
              <a className="text-blue-500">Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
