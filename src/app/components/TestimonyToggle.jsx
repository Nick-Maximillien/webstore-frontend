'use client';

import { useState } from 'react';
import Testimonials from './Testimonials';

export default function TestimonyToggle() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>What our customers say</button>
      {isOpen && <Testimonials />}
    </div>
  );
}
