"use server";
import { UseFetchProducts } from "@utils/useFetchProducts";
import ProductCard from "../components/ProductCard";

// Define the Product type
interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  rating: string;
  images?: { image: string }[];
}

export default async function Products() {
  const products: Product[] = await UseFetchProducts();

  return (
    <section className="container py-5 products">
      <h2 className="text-center fw-bold mb-4">Assorted Products</h2>
      <div className="row assorted">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
