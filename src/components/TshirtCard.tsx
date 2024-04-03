import { Product } from "@/models/product";

import Image from "next/image";
import Link from "next/link";

interface TShirtCardProps {
  product: Product;
}

export function TShirtCard({ product }: TShirtCardProps) {
  return (
    <Link key={product.id} href={`product/${product.id}`} prefetch={false}>
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
          <p className="text-gray-700 text-base">Preço: {product.price}</p>
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
  );
}
