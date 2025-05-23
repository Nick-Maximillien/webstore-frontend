'use client';
import Image from 'next/image';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string; // ✅ Matches CartContext interface
  removeFromCart: (id: number) => void;
}

export default function CartItem({ id, name, price, quantity, image, removeFromCart }: CartItemProps) {
  return (
    <div key={id} className="cart-item d-flex align-items-center gap-3 mb-3">
      <Image src={image} alt={name} width={100} height={100} className="rounded shadow-sm" />
      <div>
        <div className="fw-bold">{name}</div>
        <div>Price: ${price}</div>
        <div>Quantity: {quantity}</div>
        <button onClick={() => removeFromCart(id)} className="btn btn-danger btn-sm mt-2">
          Remove
        </button>
      </div>
    </div>
  );
}
