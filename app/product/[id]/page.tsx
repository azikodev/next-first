import { FaRegStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";

interface ParamsInterface {
  params: {
    id: number;
  };
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

const request = async (id: number): Promise<Product | null> => {
  try {
    const req = await fetch(`https://dummyjson.com/products/${id}`, {
      next: {
        revalidate: 1,
      },
    });
    if (!req.ok) {
      throw new Error(`Error: ${req.status}`);
    }
    const data = await req.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
};

async function SingleProduct({ params }: ParamsInterface) {
  const product = await request(params.id);

  if (!product) {
    return <div>Failed to load product data.</div>;
  }

  return (
    <div className="grid grid-cols-2 items-center justify-between gap-[80px] container max-w-[1200px] m-auto">
      <div>
        <h1 className="font-bold text-3xl mb-10">{product.title}</h1>
        <p className="text-2xl mb-[20px]">{product.description}</p>
        <div className="flex flex-col gap-[8px]">
          <p className="flex items-center gap-[8px]">
            <span className="font-[700]">Rating:</span> {product.rating}{" "}
            <FaRegStar />
          </p>
          <p className="">
            <span className="font-[700]">Product&apos;s category:</span>{" "}
            {product.category}
          </p>
          <p className="">
            <span className="font-[700]">Price: </span> {product.price} $
          </p>
        </div>
      </div>
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={500}
        height={500}
      />
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as ParamsInterface["params"];
  return {
    props: { params: { id } },
  };
}

export default SingleProduct;
