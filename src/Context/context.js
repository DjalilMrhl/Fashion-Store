import React, { createContext, useState } from 'react'


export const CartContext = createContext()

export function Context({children}) {

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)

  const addToCart = (item) => {
    // if (cartItems instanceof Array) {
        const index = cartItems.findIndex(i => i.id === item.id)
        if (index === -1) {
            cartItems.push(item)
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            setCartTotalQuantity(prev=>prev + item.cartQuantity)
            // localStorage.setItem('cartTotalQuantity',JSON.stringify(cartTotalQuantity))
            setCartTotalPrice(prev=>prev + (item?.price * item?.cartQuantity))
            // localStorage.setItem('cartTotalPrice',JSON.stringify(cartTotalPrice))
            console.log("🚀 ~ file: cartSlice.js:19 ~ cartItems:", cartItems)
        } else if (index >= 0) {
            cartItems[index].cartQuantity += item?.cartQuantity
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            setCartTotalQuantity(prev=>prev + item?.cartQuantity)
            // localStorage.setItem('cartTotalQuantity',JSON.stringify(cartTotalQuantity))
            setCartTotalPrice(prev=>prev + (item?.price * item?.cartQuantity))
            // localStorage.setItem('cartTotalPrice',JSON.stringify(cartTotalPrice))
            console.log("🚀 ~ file: cartSlice.js:19 ~ cartItems:", cartItems)
        }
      // } else {
        // const index = Array.from(cartItems).findIndex(i => i.id === item.id)
        // if (index === -1) {
          // setCartItems(Array.from(cartItems).push(item))
          // localStorage.setItem('cartItems',JSON.stringify(cartItems))
          // console.log("🚀 ~ file: cartSlice.js:19 ~ cartItems:", cartItems)
          // setCartTotalQuantity(prev=>prev + item.cartQuantity)
          // localStorage.setItem('cartTotalQuantity',JSON.stringify(cartTotalQuantity))
          // setCartTotalPrice(prev=>prev + (item?.price * item?.cartQuantity))
          // localStorage.setItem('cartTotalPrice',JSON.stringify(cartTotalPrice))
        // } else if (index >= 0) {
        //     setCartItems(cartItems[index].cartQuantity + item?.cartQuantity)
            // localStorage.setItem('cartItems',JSON.stringify(cartItems))
        //     setCartTotalQuantity(prev=>prev + item?.cartQuantity)
            // localStorage.setItem('cartTotalQuantity',JSON.stringify(cartTotalQuantity))
        //     setCartTotalPrice(prev=>prev + (item?.price * item?.cartQuantity))
            // localStorage.setItem('cartTotalPrice',JSON.stringify(cartTotalPrice))
        //     console.log("🚀 ~ file: cartSlice.js:19 ~ cartItems:", cartItems)
        // }
      }
  // };
  const removefromCart = (item)=> {
    cartItems = cartItems?.filter(i=> i.id !== item.id)
    console.log(cartItems);
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
    setCartTotalQuantity(prev=>prev - item.cartQuantity)
    // localStorage.setItem('cartTotalQuantity',JSON.stringify(setCartTotalQuantity))
    setCartTotalPrice(prev=>prev - (item.cartQuantity * item.price))
    // localStorage.setItem('cartTotalPrice',JSON.stringify(setCartTotalPrice))
}
  const increaseQuantity = (item) => {
    const index = cartItems?.findIndex(i => i.id === item.id)
    cartItems[index].cartQuantity++
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
    setCartTotalQuantity(cartTotalQuantity + 1)
    // localStorage.setItem('cartTotalQuantity',JSON.stringify(setCartTotalQuantity))
    setCartTotalPrice(cartTotalPrice + cartItems[index].price)
    // localStorage.setItem('cartTotalPrice',JSON.stringify(setCartTotalPrice))
}
  const decreaseQuantity = (item) => {
    const index = cartItems?.findIndex(i => i.id === item.id)
    cartItems[index].cartQuantity -= 1
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
    setCartTotalQuantity(cartTotalQuantity - 1)
    // localStorage.setItem('cartTotalQuantity',JSON.stringify(setCartTotalQuantity))
    setCartTotalPrice(cartTotalPrice - cartItems[index].price)
    // localStorage.setItem('cartTotalPrice',JSON.stringify(setCartTotalPrice))
}
  const clearCart = _ => {
    cartItems([])
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