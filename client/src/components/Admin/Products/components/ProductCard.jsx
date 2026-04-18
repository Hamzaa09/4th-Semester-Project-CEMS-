import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="w-full md:w-[calc((1/2*100%)-1.25rem)] lg:w-[calc((1/3*100%)-1.25rem)] xl:w-[calc((1/4*100%)-1.25rem)] h-fit bg-white shadow-md rounded-xl overflow-hidden transition duration-200 hover:cursor-pointer p-5 ">
      <div className="w-full h-fit">
        <img
          src={product.product_img}
          alt={product.product_title}
          className="w-full h-75 object-top object-cover rounded-xl border border-gray-300"
        />
      </div>

      <div className="py-4 text-center">
        <div className="w-full flex justify-between items-center gap-3">
          <h3 className="text-md font-bold text-left">{product.product_title}</h3>
          <p className="text-md font-bold">{product.product_price} PKR</p>
        </div>

        <div className="mt-4 w-full flex justify-around items-center">
          <p className="px-4">
            {" "}
            <b>Stock</b> <br /> {product.product_stock}
          </p>
          <p className="px-4 border border-transparent border-l-gray-300 border-r-gray-300">
            {" "}
            <b>Orders</b> <br /> {product.product_stock}
          </p>
          <p className="px-4">
            <b>Quality</b> <br /> {product.product_quality}
          </p>
        </div>
      </div>
    </div>
  );
}
