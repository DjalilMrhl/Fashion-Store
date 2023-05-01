import React, { useEffect } from "react";
import "./Home.scss";
import { NewsLetter, Slider } from "../../Components";
import { ShoppingList } from "../../Components";

function Home() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <main className="home" id="home">
      <Slider/>
      <div className="home--container">
        <ShoppingList/>
        <NewsLetter/>
      </div>
    </main>
  );
}

export default Home;
