import React, { useEffect, useState } from 'react'
import './Product.scss'
import { addToCart } from '../../Redux/Slices/cartSlice'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useParams } from 'react-router'
import { useGetProductQuery } from '../../Redux/API/ProductsAPI'

function Product() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {data = []} = useGetProductQuery(id)
    const {data: product = []} = data
    const [cartQuantity, setCartQuantity] = useState(1)

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])

    const handleAddToCart = () => {
      dispatch(addToCart({...product, cartQuantity}))
      console.log({...product, cartQuantity});
      setCartQuantity(1)
    }

  return (
    <main className="product" id="product">
        <div className="product--container">
        <img src={`http://localhost:1337${product?.attributes?.thumbnail?.data?.attributes?.formats?.small?.url}`} alt=""/>
            <div className="content">
                <h1>{product?.attributes?.title}</h1>
                <span>${product?.attributes?.price}</span>
                <p>{product?.attributes?.description}.</p>
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