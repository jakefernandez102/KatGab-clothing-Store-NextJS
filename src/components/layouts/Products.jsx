import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';
import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import useStore from '@/hooks/useStore';

const Products = () => {

  const {products}=useStore()

  const router=useRouter()

  const reduceRecipes = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    // console.log(acc)
    return acc;
  };

  const handleClick=(id)=>{
    router.push(`/product/${id}`)
  }
  
  return (
    <Carousel  indicators={true}>
      {products?.reduce(reduceRecipes, []).map((item,idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-center">
            {item.map((item,idx) => {
              return (
                <Card 
                  key={idx} 
                  style={{ width: '18rem' }}
                  className='flex flex-col justify-between'
                >
                  
                  <Card.Img
                    variant="top"
                    src={item.attributes.productImage.data[0].attributes.url}
                    alt={item.attributes.productName}
                  />
                  <Card.Body
                    className='flex flex-col justify-end'
                  >
                    <Card.Title>{item.attributes.productName}</Card.Title>
                    <Card.Subtitle className='text-secondary fs-6'>
                      {item.attributes.brand}
                    </Card.Subtitle>
                    <p className='text-xl font-bold'>{item.attributes.productPrice.toLocaleString('es-CR',{style:'currency',currency:'CRC'})}</p>
                    <Button 
                      type='button'
                      className='block w-100'
                      variant="warning" 
                      onClick={e => handleClick(item.id)}
                    >
                        Ver
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Products