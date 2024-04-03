import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { TShirtCard } from "../components/TshirtCard";
import { Product } from "@/models/product";

import Stripe from "stripe";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
    }
  });

  return (
    <main
      ref={sliderRef}
      className="keen-slider flex gap-12 w-[50%] self-center min-h-[400px] px-[2%]"
    >
      {products.map((product) => {
        return <TShirtCard key={product.id} product={product} />;
      })}
    </main>
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
