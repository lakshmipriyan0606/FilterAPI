import axios from "axios";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data));
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== "All") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortBy === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, products, sortBy]);

  const filterList = [
    "All",
    "women's clothing",
    "electronics",
    "jewelery",
    "men's clothing",
  ];

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h2 className="text-lg mr-2 text-red-600 font-semibold">Filters</h2>
        <ul className="flex  flex-col gap-5">
          {filterList.map((category) => (
            <li key={category}  className="p-4">
              <button onClick={() => setSelectedCategory(category)} className={category ===selectedCategory ? "text-lg font-semibold transition-all duration-200 border-b-2 border-red-600" : "text-lg font-semibold"}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <div className="mb-4">
          <label className="text-lg mr-2 font-semibold">Sort By: </label>
          <select className="border-2 border-red-500 p-1 cursor-pointer" onChange={(e) => setSortBy(e.target.value)}>
            <option value="default" >Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredProducts.map((item) => (
            <div key={item.id} className=" p-4">
                <div className="max-w-sm bg-white border h-[500px] flex flex-col items-center justify-center  rounded-lg shadow">
                  <img
                   src={item.image}
                   alt={item.title}
                   className="w-[300px] h-[300px] p-4"
                  />

                <div className="p-5 text-center text-lg font-semibold">
                  <p className="mb-3 font-normal text-gray-700 ">
                  {item.title}
                  </p>
                  <p className="mb-3 font-semibold text-gray-900 ">
                   $ {item.price}
                  </p>
                  <button className="border border-black p-1 rounded-md hover:bg-black  hover:text-white transition-all duration-500">Add To cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
