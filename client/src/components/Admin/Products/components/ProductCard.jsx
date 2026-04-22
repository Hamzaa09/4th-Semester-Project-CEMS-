import React from "react";
import { Package, ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return Number(price).toLocaleString();
  };

  return (
    <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] xl:w-[calc(25%-0.75rem)] bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.product_img}
          alt={product.product_title}
          className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
        />
        {/* Quality Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 shadow-sm flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold text-gray-700">
            {product.product_quality}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
            {product.product_title}
          </h3>
          <p className="text-sm font-bold text-emerald-600 whitespace-nowrap">
            {formatPrice(product.product_price)} PKR
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-emerald-50 flex items-center justify-center">
              <Package
                className={
                  product.product_stock > 0
                    ? "w-3.5 h-3.5 text-emerald-600"
                    : "w-3.5 h-3.5 text-red-600"
                }
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                Stock
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {product.product_stock ?? 0}
              </p>
            </div>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-blue-50 flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                Orders
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {product.product_stock}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
