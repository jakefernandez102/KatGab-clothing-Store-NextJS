import Layaout from '@/components/layouts/Layaout';
import SideBarFilters from '@/components/layouts/SideBarFilters';
import { useRouter } from 'next/router';
import React from 'react';

const Category = ( { categoryUrl, subCategoryUrl, products } ) =>
{

    const subCategoryName = subCategoryUrl.split( '-' ).join( ' ' );

    return (
        <Layaout
            categoryUrl={categoryUrl}
            subCategoryName={subCategoryName}
        >
            <SideBarFilters
                subCategoryName={subCategoryName}
                products={products}
            />

        </Layaout>
    );
};

export default Category;

export async function getStaticPaths ()
{
    const resp = await fetch( `${ process.env.NEXT_PUBLIC_STRAPI_URL }/categories?populate=sub_categories_id` );
    const { data } = await resp.json();

    const paths = [];
    for ( const category of data )
    {
        for ( const product of category?.attributes?.sub_categories_id?.data )
        {
            paths.push( {
                params: {
                    categoryUrl: category?.attributes?.categoryUrl,
                    subCategoryUrl: product?.attributes?.subCategoryUrl
                }
            } );
        }
    }
    console.log( paths );
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps ( { params: { categoryUrl, subCategoryUrl } } )
{

    console.log( categoryUrl );
    console.log( subCategoryUrl );

    const resp = await fetch( `${ process.env.NEXT_PUBLIC_STRAPI_URL }/products?populate=productImage&populate=sub_category_id&filters[sub_category_id][subCategoryUrl][$eq]=${ subCategoryUrl }` );
    const { data: products } = await resp.json();

    console.log( products );

    return {
        props: {
            categoryUrl,
            subCategoryUrl,
            products,
        }
    };
}