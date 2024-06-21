// 'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";

interface Product {
  id: number;
  title: string;
  description: string;
  rating: number;
  thumbnail: string;
}

const fetchProduct = async (id: number) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      if (typeof id === "string") {
        const productId = parseInt(id, 10);
        try {
          const productData = await fetchProduct(productId);
          setProduct(productData);
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("Failed to fetch product data");
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="container max-w-[1200px] m-auto mt-[100px]">
      <div className="max-w-[700px] m-auto bg-white flex items-center flex-col gap-[20px] p-[30px]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={500}
          height={500}
          className="rounded-lg"
        />
        <h1 className="text-3xl text-green-700 font-bold flex items-center gap-2">
          {product.title}
          <span className="text-xl text-black flex items-center gap-2">
            {product.rating} <FaRegStar />
          </span>
        </h1>
        <p className="text-black font-medium">{product.description}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
