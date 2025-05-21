"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "../../../context/CartProvider";

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://online-store-production-b3b2.up.railway.app/products/${slug}/`, { next: { revalidate: 60 } });
        const data = await res.json();

        if (!data || data.detail === "Not found.") {
          setProduct(null);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p className="text-danger">Product not found</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center">{product.name}</h1>
      <div className="d-flex justify-content-center gap-4 flex-wrap mb-4">
        {product.images?.slice(0, 2).map((img, index) => (
          <Image
            key={index}
            src={`https://online-store-production-b3b2.up.railway.app${img.image}`}
            alt={`${product.name} image ${index + 1}`}
            width={300}
            height={200}
            className="rounded shadow-sm slugImage"
          />
        ))}
      </div>

      <p className="text-center fw-bold">{product.description}</p>
      <p className="text-center fw-bold">Price: ${product.price}</p>
      <p className="text-center fw-bold">Rating: {product.rating}</p>
      <button onClick={() => addToCart(product)} className="btn btn-primary">
        Add to Cart
      </button>
    </div>
  );
}
