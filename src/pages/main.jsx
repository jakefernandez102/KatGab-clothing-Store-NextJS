import React from 'react'
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';




const main = () => {
  return (
    
    <CCarousel controls  transition="crossfade" >
        <CCarouselItem  className='h-[500px] relative'>
            <CImage className="d-block w-100  opacity-60" src='/assets/img/banner-carousel/1.jpg' alt="slide 1" />
            <CCarouselCaption className="d-none d-md-block absolute ">
                <h2 className='text-4xl  font-bold'>First slide label</h2>
                <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className='h-[500px]'>
            <CImage className="d-block w-100 opacity-60" src='/assets/img/banner-carousel/2.jpg' alt="slide 2" />
            <CCarouselCaption className="d-none d-md-block">
                <h2 className='text-4xl  font-bold'>First slide label</h2>
                <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
        </CCarouselItem >
        <CCarouselItem className='h-[500px]'>
            <CImage className="d-block w-100 opacity-60" src='/assets/img/banner-carousel/3.jpg' alt="slide 3" />
            <CCarouselCaption className="d-none d-md-block">
                <h2 className='text-4xl  font-bold'>First slide label</h2>
                <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className='h-[500px]'>
            <CImage className="d-block w-100 opacity-60" src='/assets/img/banner-carousel/4.jpg' alt="slide 4" />
            <CCarouselCaption className="d-none d-md-block flex justify-between">
                <h2 className='text-4xl  font-bold md:absolute md:-top-24'>First slide label</h2>
                <p className='absolute md:w-1/2 -right-24 -top-24'>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className='h-[500px]'>
            <CImage className="d-block w-100 opacity-60" src='/assets/img/banner-carousel/5.jpg' alt="slide 4" />
            <CCarouselCaption className="d-none d-md-block">
                <h2 className='text-4xl  font-bold'>First slide label</h2>
                <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
        </CCarouselItem>
    </CCarousel>
  )
}

export default main