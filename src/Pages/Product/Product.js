import React, { useContext, useEffect, useState } from 'react'
import './Product.scss'
import { Button } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useParams } from 'react-router'
import {products} from './../../data'
import { CartContext } from '../../Context/context'


function Product() {

    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [cartQuantity, setCartQuantity] = useState(1)
    const {addToCart} = useContext(CartContext)

    useEffect(() => {
      window.scrollTo(0,0)
      setProduct(products.filter(item=> item.id === id))
    }, [id])

    const handleAddToCart = () => {
      addToCart({...product, cartQuantity})
      console.log({...product, cartQuantity});
      setCartQuantity(1)
    }

  return (
    <main className="product" id="product">
        <div className="product--container">
        <img src={product.thumbnail} alt=""/>
            <div className="content">
                <h1>{product?.title}</h1>
                <span>${product?.price}</span>
                <p>{product?.description}.</p>
                <div className="wrapper">
                  <div className="count">
                    <Remove onClick={()=> cartQuantity > 1 && setCartQuantity(prev=> prev-1)}/>
                    <span>{cartQuantity}</span>
                    <Add onClick={()=> setCartQuantity(prev=> prev+1)}/>
                  </div>
                  <Button variant='' onClick={handleAddToCart}>Add to Cart</Button>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Product
