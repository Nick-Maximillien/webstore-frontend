'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { UseFetchCategories } from '@/utils/UseFetchCategories';

export default function CategoryPage() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      if (!slug) {
        notFound();
        return;
      }

      try {
        const categories = await UseFetchCategories();
        const matchedCategory = categories.find((cat) => cat.slug === slug);

        if (!matchedCategory) {
          notFound();
          return;
        }

        setCategory(matchedCategory);

        const res = await fetch(
          `https://online-store-production-b3b2.up.railway.app/categories/${slug}/products/`,
          { next: { revalidate: 60 } }
        );
        const data = await res.json();

        if (!data || data.length === 0) {
          notFound();
          return;
        }

        setProducts(data);
      } catch (error) {
        console.error('Error fetching category or products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center">{category?.name || slug}</h1>
      {category?.description && <p className="text-center">{category.description}</p>}

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <Image
                src={
                  product.images?.[0]?.image
                    ? `https://online-store-production-b3b2.up.railway.app${product.images[0].image}`
                    : '/placeholder.png'
                }
                alt={product.name}
                width={400}
                height={250}
                className="card-img-top"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <Link href={`/products/${product.slug}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
