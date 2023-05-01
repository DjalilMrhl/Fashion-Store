import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Checkout, Home, Product } from "./Pages";
import { CartMenu, Footer, NavBar, NotFound, Auth, SideMenu } from "./Utilities";
import { Confirmation } from "./Components";
import { useState } from "react";

function App() {

  const [cartMenuOpen, setCartMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar setCartMenuOpen={setCartMenuOpen} setAuthOpen={setAuthOpen} setMenuOpen={setMenuOpen}/>
        <CartMenu cartMenuOpen={cartMenuOpen} setCartMenuOpen={setCartMenuOpen} setAuthOpen={setAuthOpen}/>
        <Auth authOpen={authOpen} setAuthOpen={setAuthOpen}/>
        <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />}/>
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Checkout/success" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
       </Routes>
       <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
