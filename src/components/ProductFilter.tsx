import React, { useState } from "react";

import { Product } from "@/models/product";
import { getValueFromString } from "../utils/getValueFromString";
import { useMediaQuery } from "react-responsive";

export function ProductFilter({ products, setFilteredProducts }) {
  const [filter, setFilter] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    size: "",
    color: "",
  });

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (filter.name !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter.minPrice !== "") {
      filtered = filtered.filter(
        (product) =>
          getValueFromString(product.price) >= parseFloat(filter.minPrice)
      );
    }
    if (filter.maxPrice !== "") {
      filtered = filtered.filter(
        (product) =>
          getValueFromString(product.price) <= parseFloat(filter.maxPrice)
      );
    }
    if (filter.size !== "") {
      filtered = filtered.filter((product: Product) =>
        product.sizes.includes(filter.size.toUpperCase())
      );
    }
    if (filter.color !== "") {
      filtered = filtered.filter((product) =>
        product.colors.includes(filter.color)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleColorClick = (color: string) => {
    setFilter({ ...filter, color });
    applyFilter();
  };

  const defaultColors = ["#EF4444", "#3B82F6", "#22C55E", "#EAB308"];

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 mt-10">
      <input
        type="text"
        placeholder="Pesquisar por nome"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-[#438F79]"
        name="name"
        value={filter.name}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        min={0}
        placeholder="Preço mínimo"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-[#438F79]"
        name="minPrice"
        value={filter.minPrice}
        onChange={handleFilterChange}
      />
      <input
        min={0}
        type="number"
        placeholder="Preço máximo"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-[#438F79]"
        name="maxPrice"
        value={filter.maxPrice}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        placeholder="Tamanho"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-[#438F79]"
        name="size"
        value={filter.size}
        onChange={handleFilterChange}
      />
      <div className={`flex items-center gap-4 ${isMobile && 'w-full justify-center items-center'}`}>
        {defaultColors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="w-5 h-5 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
      <button
        className="px-4 py-2 text-white font-bold bg-[#438F79] rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
        onClick={applyFilter}
      >
        Filtrar
      </button>
    </div>
  );
}
