import './NewsLetter.scss'
import React from 'react'
import { Button } from '@mui/material'
import { MarkEmailReadOutlined } from '@mui/icons-material'

function NewsLetter() {
  return (
    <section className="newsletter" id="newsletter">
        <div className="newsletter--container">
          <MarkEmailReadOutlined/>
          <h1>Subscribe To Our NewsLetter</h1>
          <p>and receive $25 coupon for your first order when checkout</p>
          <div className="cta">
              <input name='email' type='email' placeholder='Enter email'/>
              <Button>Subscribe</Button>
          </div>
        </div>
    </section>
  )
}

export default NewsLetter