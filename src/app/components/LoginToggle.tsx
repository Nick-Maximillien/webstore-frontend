'use client';

import { useState } from 'react';
import LoginPage from './Login';

export default function LoginToggle() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="loginbtn">
      <button onClick={() => setIsOpen(true)}>Login</button>
      {isOpen && <LoginPage />}
    </div>
  );
}
