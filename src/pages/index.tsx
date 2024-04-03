import "keen-slider/keen-slider.min.css";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { Product } from "@/models/product";
import { ProductFilter } from "../components/ProductFilter";
import { TShirtCard } from "../components/TshirtCard";
import { useMediaQuery } from "react-responsive";

import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
    },
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="container mx-auto">
      {!isMobile && (
        <main
          ref={sliderRef}
          className="keen-slider flex gap-12 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 self-center min-h-[400px] px-4"
        >
          {products.slice(0, 4).map((product) => (
            <TShirtCard key={product.id} product={product} />
          ))}
        </main>
      )}

      <ProductFilter
        products={products}
        setFilteredProducts={setFilteredProducts}
      />

      <section className="flex flex-wrap justify-center gap-8 mt-8 mb-10">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`product/${product.id}`}
            prefetch={false}
          >
            <div
              key={product.id}
              className="cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-sm bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                className="object-cover w-full h-48 sm:h-64 bg-gradient-to-t from-[#1ea483] to-[#7465d4]"
                src={product.imageUrl}
                alt="T-shirt"
                layout="responsive"
                width={400}
                height={400}
              />
              <div className="px-6 py-4">
                <h1 className="font-bold text-lg mb-2">{product.name}</h1>
                <p className="text-gray-700 text-base">
                  Preço: {product.price}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Tamanhos: {product.sizes.join(", ")}
                </span>
                <span className="flex items-center gap-3 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Cores:{" "}
                  {product.colors.map((color) => {
                    return (
                      <div
                        key={color}
                        style={{ backgroundColor: color }}
                        className="w-4 h-4 rounded-full"
                      ></div>
                    );
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pr-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
      sizes: product.metadata.sizes.split(","),
      colors: product.metadata.colors.split(","),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 Hours
  };
};
