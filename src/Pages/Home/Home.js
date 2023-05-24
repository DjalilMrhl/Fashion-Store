import React, { useEffect } from "react";
import "./Home.scss";
import { NewsLetter, Slider } from "../../Components";
import { ShoppingList } from "../../Components";

function Home({products}) {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <main className="home" id="home">
      <Slider/>
      <div className="home--container">
        <ShoppingList products={products}/>
        <NewsLetter/>
      </div>
    </main>
  );
}

export default Home;
