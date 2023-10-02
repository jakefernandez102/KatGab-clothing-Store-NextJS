'use client'
import useStore from '@/hooks/useStore';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';
import  Image  from 'next/image';
import useAuth from '@/hooks/useAuth';

let itemAdded  = 0;
const Nav = () => {

    const {itemsInCart,setItemsInCart,cart} = useStore()
    const [correctImage,setCorrectImage] = useState()
    const {authUser,setAuthUser,userInfo,setUserInfo} = useAuth()

    useEffect(()=>{
        const _userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(_userInfo){
            setUserInfo(_userInfo)
        }
    },[])

    const getCorrectImage = color =>{
        return cart?.map(item => {
            return item?.attributes?.productImage?.data.filter(image => image?.attributes?.name?.split('_')[1].split('.')[0] === color)
        })[0][0]?.attributes?.formats?.thumbnail?.url
        
    }


    const handleSignOut = () =>{
        localStorage.removeItem('token')
        setAuthUser(false)
    }

  return (
    <nav className='flex gap-2 items-center'>
        <div className=' md:w-[150px]'>
            {
                authUser ? (
                    <div className="flex gap-2 items-center">
                        <p className='w-full' >Hola,{' '} <span className='font-bold text-yellow-500'> {userInfo?.username} </span> </p>
                        <button 
                            type='button'
                            onClick={handleSignOut}
                        >
                            Cerrar Sesion
                        </button>
                    </div>
                ) : (
                    <Link href='/sign-in'>
                        Inicia Sesion
                    </Link>
                )
            }
        </div>
        <div>
            <ul className='flex gap-2 items-center'>
                <li>
                    <Link href='/' className='flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                        Tienda
                    </Link>
                </li>
                <li>
                    <Link href='/' className='flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>

                        Compras
                    </Link>
                </li>
                <li className='group relative dropdown'>
                    <div>
                    <Link href='/'>
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </Link>
                    <div className='flex justify-center items-center text-[8px] absolute w-[10px] h-[10px] bg-red-500 -top-1 -right-1 rounded-full'>
                        {itemsInCart}
                    </div>
                        <div className="group-hover:block dropdown-menu absolute  hidden w-[600px] h-auto -left-[550px]">
                            <table className='w-full'>
                                <tbody className='w-full'>
                                    {
                                        cart.length > 0 && cart?.map(item => (
                                            <tr className='px-2 flex  justify-between items-center w-full'>
                                                <td>
                                                    <Image src={getCorrectImage(item?.attributes?.color)} width={100} height={100} alt={item?.attributes?.productName}/>
                                                </td>
                                                <td>
                                                    {item?.attributes?.productName}
                                                </td>
                                                <td>
                                                    {item?.attributes?.brand}
                                                </td>
                                                <td className='font-bold text-yellow-500'>
                                                    {item?.attributes?.productPrice.toLocaleString('es-CR',{style:'currency',currency:'CRC'})}
                                                </td>
                                                <td>
                                                    {item?.attributes?.color}
                                                </td>
                                                <td>
                                                    {item?.attributes?.productSize}
                                                </td>
                                                <td className='flex gap-2 items-center'>
                                                    <button 
                                                        className='text-lg'
                                                        onClick={()=> setItemsInCart(+itemsInCart -1)}
                                                        disabled={+itemsInCart === 1}
                                                        >
                                                        -
                                                    </button>
                                                    {itemsInCart <= 1 ? 1 : itemsInCart}
                                                    <button 
                                                        className='text-lg'
                                                        onClick={()=> setItemsInCart(+itemsInCart + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td className='flex justify-between gap-3'>
                                                    <button 
                                                        type='button'
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fcba03" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </button>
                                                    
                                                    <button 
                                                        type='button'
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                    <tfoot className=' w-full mx-auto'>
                                        <tr className='flex justify-center '>
                                            <td>
                                                <button className='flex gap-2 text-center border-2 border-green-500 py-2 px-1 hover:bg-green-300 duration-300 rounded-lg font-bold'>
                                                <Image src='/assets/img/whatsapp.png'width={20} height={20} alt='whatsapp imagen' />
                                                    Contactar via Whatsapp
                                                </button>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Nav