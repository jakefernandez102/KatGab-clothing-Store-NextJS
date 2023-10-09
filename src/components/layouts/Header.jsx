import React, { useState } from 'react'
import Nav from './Nav';
import Link from 'next/link';

const Header = () => {
  const [search, setSearch]= useState('')
  return (
    <header >
        <div className='flex flex-col md:flex-row md:items-center '>
            <div className='flex flex-col sm:flex-row items-center  w-full'>
              <Link href='/'>
                <h1 className='uppercase font-bold text-4xl p-4'>KatGab</h1>
              </Link>
                {/* <input 
                    type="text" 
                    className="h-2/3 p-2 block w-full sm:w-1/2 bg-[url('/assets/img/search.svg')] bg-no-repeat bg-contain text-center text-black text-xl rounded-sm"
                    placeholder='Busca lo que deseas ver' 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                /> */}
            </div>
            <div>
                <Nav/>
            </div>
        </div>
    </header>
  )
}

export default Header