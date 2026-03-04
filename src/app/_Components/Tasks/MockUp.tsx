import React from "react";
import NavBar from "./_Components/NavBar";
import ProductDetails from "./_Components/ProductDetails";
import Product from "./_Components/Product";
import Rating from "./_Components/Rating";
import SmilerProducts from "./_Components/SmilerProducts";
import Footer from "./_Components/Footer";

export default function MockUp() {
  return (
    <>
      <div className="bg-white container mx-auto">
      <NavBar />
        <ProductDetails />
        <Product />
        <Rating />
        <SmilerProducts />
      </div>
      <Footer />
    </>
  );
}
