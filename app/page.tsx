import Link from "next/link";
import Image from "next/image";
interface Product {
  id: number;
  title: string;
  images: string[];
  thumbnail: string;
  description: string;
  price: number;
}

const request = async (url: string) => {
  const req = await fetch(url, {
    next: {
      revalidate: 50,
    },
  });
  const data = await req.json();

  return data;
};

async function Home() {
  const data = await request("https://dummyjson.com/products");
  console.log(data);

  return (
    <div className="container max-w-[1200px] m-auto">
      <div className="grid grid-cols-4 gap-4">
        {data.products.map((item: Product) => {
          return (
            <Link href={`/product/${item.id}`} key={item.id} legacyBehavior>
              <a className="border p-4 block bg-[#fff] hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                  width={400}
                  height={400}
                />
                <h1 className="text-lg font-semibold mt-2">{item.title}</h1>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-lg font-bold mt-2">${item.price}</p>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
