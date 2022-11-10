import React from 'react'

const SingleProductViewCard = (props) => {
  return (
    <div>
      <div className='card' data-aos="zoom-in"
      data-aos-duration="1500">
      <img className='card_image' src={props.imageURL}></img>
      <div className='card_body'>
        <h2 className='card_name'>{props.name}</h2>
        <h3 className='card_price'>{props.price}</h3>
        <h4 className='card_description'>{props.description}</h4>
      <button className='card_button'>Add to Cart</button>
      </div>
    </div>
    </div>
    
  )
}

export default SingleProductViewCard