import React from "react";
import "./NavBar.scss";
import { Badge, IconButton } from '@mui/material'
import {PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

function NavBar({setCartMenuOpen, setAuthOpen, setMenuOpen}) {

  const cartTotalQuantity = useSelector(state=> state.cart.cartTotalQuantity)
  const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

  return (
    <nav className="nav">
      <div className="nav--container">
        <Link to='/'>ECOMMERCE</Link>
        <ul>
          <li><IconButton><SearchOutlined/></IconButton></li>
          {!isLoggedIn &&<li><IconButton onClick={()=> setAuthOpen(true)}><PersonOutline/></IconButton></li>}
          <li><Badge badgeContent={cartTotalQuantity} ><IconButton onClick={()=> setCartMenuOpen(true)}><ShoppingBagOutlined/></IconButton></Badge></li>
          {isLoggedIn &&<li><IconButton onClick={()=> setMenuOpen(true)}><MenuOutlined/></IconButton></li>}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
