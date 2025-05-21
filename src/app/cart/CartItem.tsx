'use client';
import Image from 'next/image';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CartItem({ id, name, price, quantity, imageUrl }: CartItemProps) {
  return (
    <div key={id} className="cart-item">
      <Image src={imageUrl} alt={name} width={100} height={100} />
      <div>{name}</div>
      <div>${price}</div>
      <div>Qty: {quantity}</div>
    </div>
  );
}
