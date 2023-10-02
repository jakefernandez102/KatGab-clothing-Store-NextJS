import Layaout from '@/components/layouts/Layaout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const signIn = ( { email } ) =>
{
    console.log( email );
    const [emailInput, setEmailInput] = useState( '' );
    const [passwordInput, setPasswordInput] = useState( '' );
    const router = useRouter();

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        if ( emailInput === '' )
        {
            return;
        }
        router.push( `/create-account/${ emailInput }` );
    };

    return (
        <Layaout>
            <div className='flex flex-col justify-evenly w-1/2 h-[250px]  mx-auto mt-10'>
                <h1 className='text-2xl font-bold'>
                    Inicia Sesion | Crear Cuenta
                </h1>

                <p>Ingresa tu correo electrónico para empezar.</p>

                <form
                    className='form'
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="email" className='font-bold'>Email</label>
                        <input
                            required={true}
                            type="email"
                            className='form-control'
                            placeholder='Tu Email'
                            name='email'
                            id='email'
                            value={!email ? emailInput : email}
                            onChange={( e ) => setEmailInput( e.target.value )}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className='font-bold'>Password</label>
                        <input
                            required={true}
                            type="password"
                            className='form-control'
                            placeholder='Tu Contraseña'
                            name='password'
                            id='password'
                            value={passwordInput}
                            onChange={( e ) => setPasswordInput( e.target.value )}
                        />
                    </div>

                    <input type="submit" value='Siguiente' className='uppercase px-1 py-2 border-1 border-yellow-500  hover:bg-yellow-500 font-bold transition-all duration-300 mt-2 w-full' />
                </form>

            </div>
        </Layaout>
    );
};

export default signIn;