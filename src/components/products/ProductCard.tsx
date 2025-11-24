"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { renderStars } from "@/helpers/rating";
import { formatPrice } from "@/helpers/currency";
import { useState } from "react";
import AddToCartBtn from "./addToCartBtn";
import toast from "react-hot-toast";
import { apiServices } from "@/services/api";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [AddTOCartLoading, setAddTOCartLoading] = useState(false);
  async function handleAddToCart() {
    setAddTOCartLoading(true)
    const data = await apiServices.addProducrtToCart(product!._id)
    toast.success(data.message);
    setAddTOCartLoading(false)
  }

  // الصورة اللي هتظهر
  const displayImage =
    hovered && product.images && product.images.length > 0
      ? product.images[product.images.length - 1]
      : product.imageCover;

  return (
    <div
      className={`group justify-between bg-white border hover:shadow-lg relative flex flex-col overflow-hidden rounded-2xl transition-all duration-700 ${viewMode === "list"
        ? "flex-row gap-6 p-5"
        : "p-0"
        } bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Section */}
      <div
        className={`relative ${viewMode === "list"
          ? "w-48 h-48 flex-shrink-0"
          : "aspect-square"
          } overflow-hidden rounded-2xl`}
      >
        {/* الصورة بتتبدل هنا */}
        <Image
          src={displayImage}
          alt={product.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>

        {/* Heart Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 dark:bg-gray-700/70 rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500"
        >
          <Heart className="h-4 w-4 text-primary" />
        </Button>

        {/* Badge */}
        {product.sold > 5000 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
            🔥 Bestseller
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div
        className={`flex flex-col justify-between ${viewMode === "list" ? "flex-1" : "p-5"
          }`}
      >
        <div>
          <p className="text-xs uppercase text-muted-foreground tracking-widest mb-1">
            <Link
              href={``}
              className="hover:text-primary hover:underline transition-colors"
            >
              {product.brand.name}
            </Link>
          </p>

          <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-500">
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </h3>

          {viewMode === "list" && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-1 mb-2">
            {renderStars(product.ratingsAverage)}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.ratingsQuantity})
            </span>
          </div>

          <p className="text-xs text-muted-foreground mb-3">
            <Link
              href={``}
              className="hover:text-primary hover:underline transition-colors"
            >
              {product.category.name}
            </Link>
          </p>
        </div>

        <div
          className={`flex ${viewMode === "list"
            ? "flex-col justify-between items-start mt-3 sm:flex-row"
            : "flex-col gap-3 mt-4"
            }`}
        >
          <div className="max-sm:pb-2 flex items-start flex-col">
            <span className="text-2xl font-extrabold text-primary">
              {formatPrice(product.price)}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              {product.sold} sold
            </p>
          </div>
          {/* <Button
            className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-500 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all group-hover:translate-y-[-2px] hover:bg-gradient-to-l hover:from-primary hover:to-blue-500 duration-700 hover:scale-105"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700"></span>
          </Button> */}
          <AddToCartBtn UI="" productQuantity={product.quantity} handleAddToCart={handleAddToCart} AddTOCartLoading={AddTOCartLoading} />


        </div>
      </div>
    </div>
  );
}
