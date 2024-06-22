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
    <div className="grid grid-cols-2 items-center justify-center">
      <div>
        <h1 className="font-bold text-3xl mb-10">{product.title}</h1>
        <p className="text-2xl">{product.description}</p>
      </div>
      <img
        src={product.thumbnail}
        alt={product.title}
        width={500}
        height={500}
      />
    </div>
  );
}

export default SingleProduct;
