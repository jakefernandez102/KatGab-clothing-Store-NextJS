import axiosClient from '@/config/axios';
import {createContext, useEffect, useState} from 'react'

const StoreContext = createContext()

const StoreProvider = ({children})=>{

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [itemsInCart, setItemsInCart] = useState(0)

    // useEffect(()=>{
    //     const getProducts = async ()=>{
    //         try {
    //             const {data} = await axiosClient('/products?populate=productImage')
    //             setProducts(data.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getProducts()
    // },[])

    return (
        <StoreContext.Provider
            value={{
                products,
                setProducts,
                itemsInCart,
                setItemsInCart,
                cart,
                setCart
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContext;
export {
    StoreProvider
}

