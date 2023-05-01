import './CartMenu.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removefromCart } from '../../Redux/Slices/cartSlice'
import {Button, Divider, IconButton} from '@mui/material'
import {Close, Add, Remove } from '@mui/icons-material'
import { useNavigate } from 'react-router'

function CartMenu({cartMenuOpen,setCartMenuOpen, setAuthOpen}) {

    const navigate = useNavigate()
    const cart = useSelector(state=> state.cart)
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const handleClick = ()=> {
        if (isLoggedIn) {
            navigate('/checkout')
            setCartMenuOpen(false)
        } else {
            setCartMenuOpen(false)
            setAuthOpen(true)
        }
    }

  return (
    cart.cartItems.length === 0?
    (cartMenuOpen &&
    <aside className="cart-menu" id="cart-menu">
        <span className='modal'></span>
        <div className="header">
            <h1>Cart Empty</h1>
            <Close onClick={()=> setCartMenuOpen(false)}/>
        </div>
    </aside>):

    (cartMenuOpen &&
    <aside className="cart-menu" id="cart-menu">
        <span className='modal' onClick={()=> setCartMenuOpen(false)}></span>
        <div className="header">
            <h1>Shopping Cart ({cart.cartItems.length})</h1>
            <Close onClick={()=> setCartMenuOpen(false)}/>                
        </div>
        <div className="cart-menu--container">
            {cart.cartItems.map(item=>
            <div className="card" key={item.id}>
                <IconButton onClick={()=> dispatch(removefromCart(item))}><Close/></IconButton>
                <img src={`http://localhost:1337${item.attributes.thumbnail.data?.attributes?.formats?.small?.url}`} alt={item.attributes.title} />
                <div className="card_content">
                    <h2>{item.attributes.title}</h2>
                    <p>{item.attributes.description}</p>
                    <div className="wrapper">
                        <div className="count">
                            <Remove onClick={()=> item.cartQuantity > 1 && dispatch(decreaseQuantity(item))}/>
                            <span>{item.cartQuantity}</span>
                            <Add onClick={()=> dispatch(increaseQuantity(item))}/>
                        </div>
                        <span>${item.attributes.price}</span>
                    </div>
                </div>
            </div>
            )}
            <Divider className='hr'/>
            <div className="subtotal">
                <p>SUBTOTAL</p>
                <span>${cart.cartTotalPrice}</span>
            </div>
            {isLoggedIn?<Button variant='' onClick={handleClick}>Checkout</Button>:<Button variant='' style={{backgroundColor: "slategray"}} onClick={handleClick}>Login to Checkout</Button>}
        </div>
    </aside>)
  )
}

export default CartMenu