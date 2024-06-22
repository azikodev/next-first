import { FaRegStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
interface ParamsInterface {
  params: {
    id: number;
  };
}

const request = async (id: number) => {
  const req = await fetch(`${"https://dummyjson.com/products/" + id}`, {
    next: {
      revalidate: 1,
    },
  });
  const data = await req.json();

  return data;
};

async function SingleProduct(params: ParamsInterface) {
  const product = await request(params.params.id);
  console.log(product);
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
            <span className="font-[700]">Product's category:</span>{" "}
            {product.category}
          </p>
          <p className="">
            <span className="font-[700]">Price: </span>
            {product.price} $
          </p>
        </div>
      </div>
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={500}
        height={500}
      />
      <Link href="/"></Link>
    </div>
  );
}

export default SingleProduct;
