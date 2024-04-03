import "keen-slider/keen-slider.min.css";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { Product } from "@/models/product";
import { ProductFilter } from "../components/ProductFilter";
import { TShirtCard } from "../components/TshirtCard";
import { CarouselCard } from "../components/CarouselCard";
import { useMediaQuery } from "react-responsive";

import Stripe from "stripe";

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
            <CarouselCard key={product.id} product={product} />
          ))}
        </main>
      )}

      <ProductFilter
        products={products}
        setFilteredProducts={setFilteredProducts}
      />

      <section className="flex flex-wrap justify-center gap-8 mt-8 mb-10">
        {filteredProducts.map((product) => (
          <TShirtCard key={product.id} product={product} />
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
