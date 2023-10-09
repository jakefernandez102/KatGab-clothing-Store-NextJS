import Head from 'next/head';
import React from 'react'
import Header from './Header';
import Categories from './Categories';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from './Footer';

const Layaout = ({children,categoryUrl ='', subCategoryName=''}) => {
  const router = useRouter()
  const [ breadCrumb,setBreadCrumb] = useState('')

  useEffect(()=>{
    if(categoryUrl !== '' || subCategoryName !== ''){
      setBreadCrumb(`Inicio / ${categoryUrl} / ${subCategoryName}`)
    }else{
      setBreadCrumb(`Inicio ${router.pathname.split('/').join('/ ')}`)
    }
  },[router.pathname,categoryUrl,subCategoryName])

  return (
    <div className='container mx-auto'>
        <Head>
            <title>KatGab- ClothinStore</title>
        </Head>
        
        <Header/>
        
        <hr className='w-full mt-3' />
        
        <Categories/>
        
        <h2 className='capitalize my-2'>{breadCrumb}</h2>

        {children}

      <Footer/>
    </div>
  )
}

export default Layaout