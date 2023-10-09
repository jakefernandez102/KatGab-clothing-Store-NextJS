import Layaout from '@/components/layouts/Layaout';
import Main from '../pages/main';
import ProductsCarousel from '../components/layouts/ProductsCarousel';
import Link from 'next/link';



export default function Home ( { products } )
{
  console.log( products );
  return (
    <>
      {/* <StoreProvider> */}

      <Layaout>
        <Main />

        <h2 className='text-xl mt-5 mb-5 capitalize text-center' >Productos para ti.</h2>

        <ProductsCarousel products={products} />

        <div className='bg-red-600 flex flex-col justify-evenly h-44 text-center mt-5 mb-5'>
          <div className=''>
            <h2 className='text-xl uppercase'>Promocion por tiempo limitado</h2>
            <h2 className='text-xs text-black uppercase font-bold'>Apurate, estas ofertas suelen irse rapido!</h2>
          </div>
          <h2>Recógelo hoy donde quiera que estés!</h2>

          <Link href='/' className='underline leading-tight'>
            Oferta por tiempo limitado
          </Link>
        </div>

        <hr />

        <div className='mt-5 mb-5 h-44 flex flex-col justify-evenly text-center'>
          <h2>
            CELEBRANDO EL MES DE LA HERENCIA HISPANA Y LATINA
          </h2>

          <p>
            Únete a nosotros para honrar y elevar las vibrantes culturas y contribuciones de las comunidades hispanas y latinas junto a nuestros empleados, clientes y socios. Este mes y durante todo el año, busque oportunidades para comprar marcas de propiedad o fundadas por hispanos y latinos.
          </p>
          <div className='flex justify-around'>
            <Link href='/' className='underline'>
              Ver más
            </Link>
            <Link href='/' className='underline'>
              Comprar ahora
            </Link>
          </div>
        </div>

      </Layaout>

      {/* </StoreProvider> */}
    </>
  );
}


export async function getStaticProps ()
{
  const response = await fetch( 'http://127.0.0.1:1337/api/products?populate=productImage' );
  const { data: products } = await response.json();
  return {
    props: {
      products
    }
  };
}