import React, { useEffect, useState } from 'react'
import  Link  from 'next/link';
import { useRouter } from 'next/router';
import axiosClient from '@/config/axios';

const Categories = () => {
    const router = useRouter()
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        const getCategories = async () => {
            const {data} = await axiosClient('/categories/?populate=sub_categories_id')
            setCategories(data.data)
        }
        getCategories()
    },[])

  return (
    <div className='w-full'>
        <ul className='text-center sm:flex sm:justify-between'>
            {
                categories.map(category =>(
                    <li key={category?.id} className=' group  relative dropdown  px-4  cursor-pointer text-base  tracking-wide'>
                            <p className={router.pathname === category?.attributes?.categoryUrl  ? 'text-amber-400  underline nav-item' : 'nav-item'}>
                                {category?.attributes?.categoryName} 
                            </p>
                        <div className="group-hover:block dropdown-menu absolute hidden h-auto">

                            <ul className="top-0 w-48 bg-white shadow px-6 py-8">
                                {
                                    category?.attributes?.sub_categories_id?.data?.map(subcategory =>(
                                        <li 
                                            key={subcategory.id} 
                                            className="py-1"
                                        >
                                            <Link href={`/categories/${category.attributes.categoryUrl}/${subcategory.attributes.subCategoryUrl}`} passHref legacyBehavior >
                                                <a 
                                                    className="nav-item block cursor-pointer "
                                                >   
                                                    {subcategory.attributes.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ))
                                }
                                {/* <li className="py-1"><a className="nav-item block cursor-pointer ">Pantalones</a></li>
                                <li className="py-1"><a className="nav-item block cursor-pointer ">Conjuntos Deportivos</a></li>
                                <li className="py-1"><a className="nav-item block cursor-pointer ">Snickers</a></li>
                                <li className="py-1"><a className="nav-item block cursor-pointer ">Zapatos</a></li> */}
                            </ul>
                        </div>
                    </li>
                ))
            }
            {/* <li className=' group  relative dropdown  px-4  cursor-pointer text-base  tracking-wide'>
                <Link href="/mujer" passHref legacyBehavior>
                    <a className={router.pathname === '/mujer' ? 'text-amber-400 nav-item' : 'nav-item'}>
                        Mujer 
                    </a>
                </Link>
                <div className="group-hover:block dropdown-menu absolute hidden h-auto">

                    <ul className="top-0 w-48 bg-white shadow px-6 py-8">
                        <li className="py-1"><a className="nav-item block cursor-pointer ">Camisas</a></li>
                        <li className="py-1"><a className="nav-item block cursor-pointer ">Pantalones</a></li>
                        <li className="py-1"><a className="nav-item block cursor-pointer ">Conjuntos Deportivos</a></li>
                        <li className="py-1"><a className="nav-item block cursor-pointer ">Snickers</a></li>
                        <li className="py-1"><a className="nav-item block cursor-pointer ">Zapatos</a></li>
                    </ul>
                </div>
            </li>
            <li className='nav-item'>
                <Link href="/zapatos" passHref legacyBehavior>
                    <a className={router.pathname === '/zapatos' ? 'text-amber-400' : ''}>
                        Zapatos 
                    </a>
                </Link> 
            </li>
            <li className='nav-item'>
                <Link href="/snickers" passHref legacyBehavior>
                    <a className={router.pathname === '/snikers' ? 'text-amber-400' : ''}>
                        Snickers
                    </a>
                </Link> 
            </li>
            <li className='nav-item'>
                <Link href="/proximamente" passHref legacyBehavior>
                    <a className={router.pathname === '/proximamente' ? 'text-amber-400' : ''}>
                        Proximamente 
                    </a>
                </Link> 
            </li>
            <li className='nav-item'>
                <Link href="/deporitvo" passHref legacyBehavior>
                    <a className={router.pathname === '/deportivo' ? 'text-amber-400' : ''}>
                        Deportivo 
                    </a>
                </Link> 
            </li> */}
        </ul>
    </div>
  )
}

export default Categories;