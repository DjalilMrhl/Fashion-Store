import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
    cartTotalQuantity: localStorage.getItem('cartTotalQuantity')? JSON.parse(localStorage.getItem('cartTotalQuantity')): 0,
    cartTotalPrice : localStorage.getItem('cartTotalPrice')? JSON.parse(localStorage.getItem('cartTotalPrice')): 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action)=> {
        const index = state.cartItems.findIndex(item => item.id === action.payload.id)
        if (index === -1) {
            state.cartItems.push(action.payload)
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            state.cartTotalQuantity += action.payload.cartQuantity
            localStorage.setItem('cartTotalQuantity',JSON.stringify(state.cartTotalQuantity))
            state.cartTotalPrice += action.payload.attributes.price * action.payload.cartQuantity
            localStorage.setItem('cartTotalPrice',JSON.stringify(state.cartTotalPrice))
        } else if (index >= 0) {
            state.cartItems[index].cartQuantity += action.payload.cartQuantity
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            state.cartTotalQuantity += action.payload.cartQuantity
            localStorage.setItem('cartTotalQuantity',JSON.stringify(state.cartTotalQuantity))
            state.cartTotalPrice += state.cartItems[index].attributes.price * action.payload.cartQuantity
            localStorage.setItem('cartTotalPrice',JSON.stringify(state.cartTotalPrice))
        }
    },
    removefromCart : (state, action)=> {
        state.cartItems = state.cartItems.filter(item=> item.id !== action.payload.id)
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        state.cartTotalQuantity -= action.payload.cartQuantity
        localStorage.setItem('cartTotalQuantity',JSON.stringify(state.cartTotalQuantity))
        state.cartTotalPrice = state.cartTotalPrice - (action.payload.cartQuantity * action.payload.attributes.price)
        localStorage.setItem('cartTotalPrice',JSON.stringify(state.cartTotalPrice))
    },
    increaseQuantity: (state, action) => {
        const index = state.cartItems.findIndex(item => item.id === action.payload.id)
        state.cartItems[index].cartQuantity++
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        state.cartTotalQuantity++
        localStorage.setItem('cartTotalQuantity',JSON.stringify(state.cartTotalQuantity))
        state.cartTotalPrice += state.cartItems[index].attributes.price
        localStorage.setItem('cartTotalPrice',JSON.stringify(state.cartTotalPrice))
    },
    decreaseQuantity: (state, action) => {
        const index = state.cartItems.findIndex(item => item.id === action.payload.id)
        state.cartItems[index].cartQuantity--
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        state.cartTotalQuantity--
        localStorage.setItem('cartTotalQuantity',JSON.stringify(state.cartTotalQuantity))
        state.cartTotalPrice -= state.cartItems[index].attributes.price
        localStorage.setItem('cartTotalPrice',JSON.stringify(state.cartTotalPrice))

    },
    clearCart: state => {
        state.cartItems = []
        state.cartTotalQuantity = 0
        state.cartTotalPrice = 0
        localStorage.clear()
    }
  }
});

export const {addToCart, removefromCart, increaseQuantity, decreaseQuantity, clearCart, openCartMenu} = cartSlice.actions

export default cartSlice.reducer