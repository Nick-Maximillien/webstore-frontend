'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../../context/CartProvider'; // Adjust this import path if needed

const ProductCard = ({ product, showQuantityInput = true }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const qty = parseInt(String(quantity), 10);

    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.images?.[0]?.image || '',
    });
  };

  return (
    <div className="card" style={{ width: '20rem' }}>
      <Link href={`/products/${product.slug}`} className="text-decoration-none text-dark">
        <div className="position-relative productCard" style={{ width: '100%', height: '250px' }}>
          <Image
            src={product.images?.[0]?.image || '/placeholder.png'}
            alt={product.name}
            width={250}
            height={200}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="productImage"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title productName">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">${product.price}</p>
          <p className="card-text">Rating: {product.rating}</p>
        </div>
      </Link>

      {showQuantityInput && (
        <div className="card-footer text-center">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-control mb-2 cartForm cartInput"
            placeholder="Quantity"
          />
          <button onClick={handleAddToCart} className="btn btn-primary w-100 cartForm">
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
