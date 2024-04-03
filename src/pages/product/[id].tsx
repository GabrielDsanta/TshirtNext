import { useState } from "react";
import { Product as ProductType } from "@/models/product";
import { stripe } from "../../lib/stripe";
import { GetStaticPaths, GetStaticProps } from "next";

import Image from "next/image";
import Stripe from "stripe";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] mx-auto">
      <div className="w-full max-w-[576px] h-[656px] bg-gradient-to-t from-[#1ea483] to-[#7465d4] p-1 flex items-center justify-center rounded-lg">
        <Image
          className="object-cover"
          src={product.imageUrl}
          width={520}
          height={480}
          alt="Foto da camisa"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl text-[#C4C4CC] font-bold">{product.name}</h1>
        <span className="mt-4 block text-3xl text-[#00B37E]">
          {product.price}
        </span>

        <p className="mt-10 text-base text-[#C4C4CC]">{product.description}</p>

        <div className="flex items-center gap-4 mt-6">
          <span className="text-[#E1E1E6]">Tamanhos:</span>
          {product.sizes.map((size) => (
            <strong
              key={size}
              className={`text-xs text-[#E1E1E6] border-[1px] border-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                selectedSize === size ? "bg-gray-500" : ""
              }`}
              onClick={() => handleSizeSelection(size)}
            >
              {size}
            </strong>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-4">
          <span className="text-[#E1E1E6]">Cores disponíveis:</span>
          {product.colors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full ${
                selectedColor === color ? "ring-2 ring-[#00B37E]" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelection(color)}
              title={color}
            ></button>
          ))}
        </div>

        <button className="mt-auto bg-[#00875F] border-o text-white rounded-lg p-5 cursor-pointer font-bold text-lg hover:bg-[#438F79]">
          Comprar agora
        </button>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_PrD44BYWZVW1n0" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pr-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        sizes: product.metadata.sizes.split(","),
        colors: product.metadata.colors.split(","),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
