import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);
  function toggleCart() {
    setShowCart((preStatus) => !preStatus);
    console.log("button pressed");
  }
  return (
    <CartProvider>
      {showCart && <Cart toggleCart={toggleCart} />}
      <Header toggleCart={toggleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
