import Head from 'next/head';
import React from 'react'
import Header from './Header';
import Categories from './Categories';

const Layaout = ({children}) => {
  return (
    <div className='container mx-auto'>
        <Head>
            <title>KatGab- ClothinStore</title>
        </Head>
        
        <Header/>
        
        <hr className='w-full mt-3' />
        
        <Categories/>
        
        {children}

    </div>
  )
}

export default Layaout