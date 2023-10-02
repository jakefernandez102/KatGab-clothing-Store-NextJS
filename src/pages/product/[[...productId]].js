import Layaout from '@/components/layouts/Layaout';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Check from '@/components/ui/Check';
import axiosClient from '@/config/axios';
import StoreContext from '@/context/StoreProvider';
import AuthContext from '@/context/AuthProvider';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


const ProductDetail = () =>
{
    const [selectedProduct, setSelectedProduct] = useState( {} );
    const [color, setColor] = useState( '' );
    const [colorList, setColorList] = useState( [] );
    const [size, setSize] = useState( 'XS' );
    const [quantity, setQuantity] = useState( 1 );
    const [products, setProducts] = useState( [] );
    const [sizeSelect, setSizeSelect] = useState( [] );

    const authContext = useContext( AuthContext );
    const storeContext = useContext( StoreContext );

    const router = useRouter();
    const productId = router.query.productId;

    useEffect( () =>
    {
        const getProducts = async () =>
        {
            try
            {
                const { data } = await axiosClient( '/products/?populate=productImage' );
                setProducts( data.data );
            } catch ( error )
            {
                console.log( error );
            }
        };
        getProducts();
    }, [] );

    useEffect( () =>
    {
        setSelectedProduct( products?.filter( product => product?.id == productId )[0] );
        setColor( selectedProduct?.attributes?.productImage?.data[0]?.attributes?.name?.split( '_' )[1].split( '.' )[0] );
    }, [products] );

    useEffect( () =>
    {
        const getSizeSelectValues = () =>
        {
            const arraySize = selectedProduct?.attributes?.productSize?.split( ',' );
            setSizeSelect( arraySize );
        };
        const getColorValues = () =>
        {
            const arrayColor = selectedProduct?.attributes?.color?.split( ',' );
            setColorList( arrayColor );
        };
        getSizeSelectValues();
        getColorValues();
    }, [products] );

    const handleSelectColorClick = ( color ) =>
    {
        setColor( color );
    };

    const handleAddToCart = ( productId ) =>
    {
        if ( !authContext.authUser )
        {
            Swal.fire( {
                icon: 'error',
                title: 'Oops...',
                text: 'Debes de regustrarte o iniciar sesion para agregar productos a la bolsa de compras!',
            } );
            return;
        }

        const productToAdd = { ...selectedProduct };
        productToAdd.attributes.productSize = size.trim();

        if ( storeContext.cart.some( item => item.id === +productId ) )
        {
            storeContext.setItemsInCart( quantity );
            localStorage.setItem( 'itemsAdded', JSON.stringify( storeContext.itemsInCart + 1 ) );

            const itemUpdated = storeContext.cart.filter( item => item.id === +productId );
            itemUpdated[0].attributes.quantity = quantity;

            const updatedCart = storeContext.cart.map( item =>
            {
                if ( item.id === productId )
                {
                    item.attributes.quantity = storeContext.itemsInCart;
                }
                return item;
            } );
            storeContext.setCart( [...updatedCart] );

            localStorage.setItem( 'productToAddCart', JSON.stringify( storeContext.cart ) );
        } else
        {
            if ( colorList.length >= 1 )
            {
                productToAdd.attributes.color = color;
            }

            storeContext.setItemsInCart( storeContext.itemsInCart + 1 );
            localStorage.setItem( 'itemsAdded', JSON.stringify( storeContext.itemsInCart + 1 ) );

            productToAdd.attributes.quantity = quantity;
            storeContext.setCart( [...storeContext.cart, productToAdd] );
            localStorage.setItem( 'productToAddCart', JSON.stringify( storeContext.cart ) );

            Swal.fire( {
                position: 'top-end',
                icon: 'success',
                title: 'Articulo agregado al carrito existosamente!',
                showConfirmButton: false,
                timer: 1500
            } );
        }

    };
    return (
        <Layaout>
            <div className='w-full flex gap-5 mt-5'>

                <div className='w-1/2 flex flex-col gap-2 justify-center items-center'>
                    {
                        selectedProduct?.attributes?.productImage?.data?.map( image => (
                            color === image?.attributes?.name?.split( '_' )[1].split( '.' )[0] &&
                            <Image key={image.id} width={350} height={350} src={image.attributes.formats.medium.url} alt={image?.attributes?.name} />
                        ) )
                    }
                </div>

                <div className='w-1/2 flex flex-col gap-3'>
                    <div>
                        <h1 className='font-bold text-2xl'>{selectedProduct?.attributes?.productName}</h1>
                    </div>
                    <div>
                        <h3 className='uppercase underline text-sm'>{selectedProduct?.attributes?.brand}</h3>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='font-bold text-3xl text-yellow-600'>{selectedProduct?.attributes?.productPrice.toLocaleString( 'es-CR', { style: 'currency', currency: 'CRC' } )}</p>
                        </div>
                        <div>
                            <p className='font-bold'>Stock: <span className='font-normal'>{selectedProduct?.attributes?.stock}</span> </p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div>
                        <p className='mb-4'>Color: <span className='font-bold'>{selectedProduct?.attributes?.color}</span></p>
                        <div className=' flex gap-3'>
                            {
                                selectedProduct?.attributes?.productImage?.data?.map( image => (

                                    <div key={image.id} className='relative'
                                        onClick={() => handleSelectColorClick( image.attributes.name.split( '_' )[1].split( '.' )[0] )}
                                    >
                                        <Image
                                            className={color === image?.attributes?.name?.split( '_' )[1].split( '.' )[0] ? 'cursor-pointer border-3 rounded-md border-yellow-500' : 'cursor-pointer'}
                                            src={image.attributes.formats.thumbnail.url}
                                            width={70}
                                            height={70}
                                            alt={image?.attributes?.name}
                                        />
                                        {color === image?.attributes?.name?.split( '_' )[1].split( '.' )[0] && <Check />}
                                    </div>
                                ) )
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p>Talla: <span className='font-bold'></span></p>
                            <select
                                className='form-control'
                                name="size"
                                id="size"
                                defaultValue='N'
                                value={size}
                                onChange={( e ) => setSize( e.target.value )}
                            >
                                <option value='N' selected disabled={true}>- Seleccionar -</option>
                                {
                                    sizeSelect?.map( size => (
                                        <>
                                            <option
                                                key={size}
                                                value={size}
                                            >
                                                {size}
                                            </option>
                                        </>
                                    ) )
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label
                                htmlFor='quantity'
                            >
                                Cantidad
                            </label>
                            <input
                                className='form-control'
                                type='number'
                                id='quantity'
                                name='quantity'
                                min='1'
                                value={quantity}
                                onChange={e => setQuantity( e.target.value )}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <button type='button'
                            className='flex justify-center items-center gap-2 border-1 border-yellow-500 w-full py-3 hover:bg-yellow-500 duration-300'
                            onClick={() => handleAddToCart( productId )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Agregar a la bolsa de compras
                        </button>

                        <button type='button' className='flex justify-center items-center gap-2 border-1  w-full py-3 hover:bg-rose-500 duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            Agregar a la favoritos
                        </button>
                    </div>

                </div>
            </div>
        </Layaout>
    );
};

export default ProductDetail;