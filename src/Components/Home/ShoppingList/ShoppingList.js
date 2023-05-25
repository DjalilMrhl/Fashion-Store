import React, { useState, useContext } from "react";
import "./ShoppingList.scss";
import { useNavigate } from 'react-router-dom'
import { Button, Tab, Tabs } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
// import {products} from './../../../data'
import { CartContext } from "../../../Context/context";

function ShoppingList({products}) {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1)
  const [values, setValues] = useState(0)
  const navigate = useNavigate()
  const {addToCart, setProduct} = useContext(CartContext)

  const categories = [
    "all",
    ...new Set(products.map((item) => item.category)),
  ];

  const handleFilter = (category, index) => {
    setActive(index);
    setValues(index)
    console.log(values);
    setFilter(products.filter((item) => item.category === category));
  }
  const handleAddToCart = (item) => {
    addToCart({...item,cartQuantity})
    console.log({...item,cartQuantity});
    setCartQuantity(1)
  }

  return (
    <section className="shopping-list" id="shopping-list">
      <div className="shopping-list--container">
        <h1>
          Our Featured <strong>Products</strong>
        </h1>
        <Tabs value={values} centered>
          {categories?.map((cat, index) => (
            <Tab label={cat} className={active === index ? "btn active-btn" : "btn"}  onClick={() => handleFilter(cat, index)} key={index}/>
          ))}
        </Tabs>
        <div className="cards">
          {active === 0
            ? products?.map((item) => (
                  <div className="card" key={item.id}>
                    <div className="image">
                      <img src={item.thumbnail} alt=""/>
                      <span className="view" onClick={()=> {
                        navigate(`/products/${item.id}`)
                        setProduct(item)}
                    }>view product</span>
                      <div className="wrapper">
                        <div className="wrapper">
                          <div className="count">
                            <Remove onClick={()=> cartQuantity > 1 && setCartQuantity(prev=> prev-1)}/>
                            <span>{cartQuantity}</span>
                            <Add onClick={()=> setCartQuantity(prev=> prev+1)}/>
                          </div>
                          <Button variant='' onClick={()=>handleAddToCart(item)}>Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                    <p>
                      <span>{item.category}</span>
                      <span>${item.price}</span>
                    </p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
              ))
            : filter?.map((item) => (
                  <div className="card" key={item.id}>
                    <div className="image">
                      <img src={item.thumbnail} alt=""/>
                      <span className="view" onClick={()=> navigate(`/products/${item.id}`)}>view product</span>
                      <div className="wrapper">
                        <div className="wrapper">
                          <div className="count">
                            <Remove onClick={()=> cartQuantity > 1 && setCartQuantity(prev=> prev-1)}/>
                            <span>{cartQuantity}</span>
                            <Add onClick={()=> setCartQuantity(prev=> prev+1)}/>
                          </div>
                          <Button variant='' onClick={()=>handleAddToCart(item)}>Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                    <p>
                      <span>{item.category}</span>
                      <span>${item.price}</span>
                    </p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default ShoppingList;
