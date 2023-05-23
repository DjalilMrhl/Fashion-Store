import './CartMenu.css'
import React, { useContext } from 'react'
import {Button, Divider, IconButton} from '@mui/material'
import {Close, Add, Remove } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { CartContext } from '../../Context/context'
import { useSelector } from 'react-redux'

function CartMenu({cartMenuOpen,setCartMenuOpen, setAuthOpen}) {

    const navigate = useNavigate()
    const {cartItems, cartTotalPrice, removefromCart, increaseQuantity, decreaseQuantity} = useContext(CartContext)
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

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
    cartItems.length === 0?
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
            <h1>Shopping Cart ({cartItems.length})</h1>
            <Close onClick={()=> setCartMenuOpen(false)}/>                
        </div>
        <div className="cart-menu--container">
            {cartItems.map(item=>
            <div className="card" key={item.id}>
                <IconButton onClick={()=> removefromCart(item)}><Close/></IconButton>
                <img src={`item.thumbnail`} alt={item.title} />
                <div className="card_content">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <div className="wrapper">
                        <div className="count">
                            <Remove onClick={()=> item.cartQuantity > 1 && decreaseQuantity(item)}/>
                            <span>{item.cartQuantity}</span>
                            <Add onClick={()=> increaseQuantity(item)}/>
                        </div>
                        <span>${item.price}</span>
                    </div>
                </div>
            </div>
            )}
            <Divider className='hr'/>
            <div className="subtotal">
                <p>SUBTOTAL</p>
                <span>${cartTotalPrice}</span>
            </div>
            {isLoggedIn?<Button variant='' onClick={handleClick}>Checkout</Button>:<Button variant='' style={{backgroundColor: "slategray"}} onClick={handleClick}>Login to Checkout</Button>}
        </div>
    </aside>)
  )
}

export default CartMenu