import { Product } from "@/models/product";

import Image from "next/image";
import Link from "next/link";

interface CarouselCardProps {
    product: Product;
  }

export function CarouselCard({ product }: CarouselCardProps) {
  return (
    <Link href={`product/${product.id}`} prefetch={false}>
      <div
        key={product.id}
        className="keen-slider__slide group relative bg-gradient-to-t from-[#1ea483] to-[#7465d4] rounded-xl p-1 cursor-pointer overflow-hidden h-auto"
      >
        <Image
          className="object-contain"
          alt="Foto de uma camisa"
          src={product.imageUrl}
          width={520}
          height={480}
        />

        <footer className="absolute bottom-1 left-1 right-1 rounded-lg flex flex-col items-center justify-between bg-black bg-opacity-60 p-8 transition-all duration-200 ease-in-out transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-col items-center justify-center">
            <strong className="text-lg text-[#E1E1E6] mb-2">
              {product.name}
            </strong>
            <div className="flex items-center gap-4 mb-4">
              {product.sizes.map((size) => (
                <strong
                  key={size}
                  className="text-xs text-[#E1E1E6] border-[1px] border-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {size}
                </strong>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#E1E1E6]">Cores disponíveis:</span>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => {
                  return (
                    <button
                      key={color}
                      style={{ backgroundColor: color }}
                      className="w-6 h-6 rounded-full"
                    ></button>
                  );
                })}
              </div>
            </div>
          </div>
          <span className="text-xl font-bold text-white mt-1">
            {product.price}
          </span>
        </footer>
      </div>
    </Link>
  );
}
