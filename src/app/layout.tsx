
import type { Metadata } from "next";
import React from "react";
import "./globals.css"
import Header from "./components/Header";
import Footer from "./components/Footer"
import { CartProvider } from "../context/CartProvider";
import { AuthProvider } from "context/AuthContext";

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your Site Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="body">
        <div className="container">
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>       
        </div>
      </body>
    </html>
  );
}
