import React, { createContext, useState } from 'react'


const CartContext = createContext()

function Context({children}) {

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])
  const [cartTotalQuantity, setCartTotalQuantity] = useState(JSON.parse(localStorage.getItem('cartTotalQuantity')) || 0)
  const [cartTotalPrice, setCartTotalPrice] = useState(JSON.parse(localStorage.getItem('cartTotalPrice')) || 0)

  const addToCart = (item) => {
    const index = cartItems.findIndex(i => i.id === item.id)
        if (index === -1) {
            setCartItems(prev=>prev.push(item))
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            console.log("🚀 ~ file: cartSlice.js:19 ~ cartItems:", cartItems)
            setCartTotalQuantity(prev=>prev + item.cartQuantity)
            localStorage.setItem('cartTotalQuantity',JSON.stringify(cartTotalQuantity))
            setCartTotalPrice(prev=>prev + (item?.price * item?.cartQuantity))
            localStorage.setItem('cartTotalPrice',JSON.stringify(cartTotalPrice))
        } else if (index >= 0) {
            setCartItems(prev=>prev[index].cartQuantity + item?.cartQuantity)
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            setCartTotalQuantity(prev=>prev + item?.cartQuantity)
            localStorage.setItem('cartTotalQuantity',JSON.stringify(cartTotalQuantity))
            setCartTotalPrice(prev=>prev + (item?.price * item?.cartQuantity))
            localStorage.setItem('cartTotalPrice',JSON.stringify(cartTotalPrice))
            console.log("🚀 ~ file: cartSlice.js:19 ~ cartItems:", cartItems)
        }
  };
  const removefromCart = (item)=> {
    setCartItems(prev=>prev.filter(i=> i.id !== item.id))
    console.log(cartItems);
    localStorage.setItem('cartItems',JSON.stringify(setCartItems))
    setCartTotalQuantity(prev=>prev - item.cartQuantity)
    localStorage.setItem('cartTotalQuantity',JSON.stringify(setCartTotalQuantity))
    setCartTotalPrice(prev=>prev - (item.cartQuantity * item.price))
    localStorage.setItem('cartTotalPrice',JSON.stringify(setCartTotalPrice))
}
  const increaseQuantity = (item) => {
    const index = cartItems.findIndex(i => i.id === item.id)
    setCartItems(prev=>prev[index].cartQuantity++)
    localStorage.setItem('cartItems',JSON.stringify(setCartItems))
    setCartTotalQuantity(prev=>prev++)
    localStorage.setItem('cartTotalQuantity',JSON.stringify(setCartTotalQuantity))
    setCartTotalPrice(prev=>prev + cartItems[index].price)
    localStorage.setItem('cartTotalPrice',JSON.stringify(setCartTotalPrice))
}
  const decreaseQuantity = (item) => {
    const index = cartItems.findIndex(i => i.id === item.id)
    setCartItems(prev=>prev[index].cartQuantity--)
    localStorage.setItem('cartItems',JSON.stringify(setCartItems))
    setCartTotalQuantity(prev=>prev--)
    localStorage.setItem('cartTotalQuantity',JSON.stringify(setCartTotalQuantity))
    setCartTotalPrice(prev=>prev - cartItems[index].price)
    localStorage.setItem('cartTotalPrice',JSON.stringify(setCartTotalPrice))
}
  const clearCart = state => {
    setCartItems([])
    setCartTotalQuantity(0)
    setCartTotalPrice(0)
    localStorage.clear()
}


  return (
    <CartContext.Provider value={{cartItems, cartTotalPrice, cartTotalQuantity, addToCart, increaseQuantity, decreaseQuantity, removefromCart, clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

export {Context,CartContext}
