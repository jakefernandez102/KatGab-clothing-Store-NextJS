import Layaout from '@/components/layouts/Layaout';
import React, { useState } from 'react'
import Link  from 'next/link';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const CreateAccount = () => {

    const {createUser} =useAuth()
    
    
    const [name,setName] = useState('')
    const [lastName,setLastname] = useState('')
    const [phoneNumer,setPhoneNumer] = useState('')
    const [address,setAdress] = useState('')
    const [password,setPassword] = useState('')
    
    const router = useRouter()
    const email = router.query.email

    const handleCreateAccount = async (e)=>{
        e.preventDefault()

        await createUser({
            email,
            username: name,
            userLastName: lastName,
            phoneNumer,
            userAddress:address,
            password,
            blocked:false,
            isActive:true,
            roles: ['Authenticated']
        })

        router.push('/')
    }
    return (
    <Layaout>
        <div className='w-1/2 mx-auto mt-5'>

            <h1 className='font-bold text-2xl mb-5'>Crear Cuenta</h1>


            <form 
                onSubmit={(handleCreateAccount)}
                className='flex flex-col gap-3'
            >
                <div className='flex justify-between w-full items-center gap-3'>
                    <div className='w-3/4'>
                        <label className='font' htmlFor="email">
                            Email
                        </label>
                        <input 
                            className='form-control' 
                            value={email} 
                            disabled type="text" 
                            id='name' 
                            placeholder='Tu Email' 
                        />
                    </div>
                    <Link href="/sign-in" className="underline text-right w-1/4">
                        Edit
                    </Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font' htmlFor="name">
                        Nombre
                    </label>
                    <input 
                        className='form-control' 
                        type="text" 
                        id='name' 
                        placeholder='Tu Nombre' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}    
                    />

                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font' htmlFor="lastname">
                        Apellido
                    </label>
                    <input 
                        className='form-control' 
                        type="text" 
                        id='lastname' 
                        placeholder='Tu Apellido/s' 
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                    />

                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font' htmlFor="phoneNumber">
                        Numero Telefonico
                    </label>
                    <input 
                        className='form-control' 
                        type="number" 
                        id='phoneNumber' 
                        placeholder='Tu Numero Telefonico' 
                        value={phoneNumer}
                        onChange={(e) => setPhoneNumer(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font' htmlFor="address">
                        Direccion
                    </label>
                    <textarea
                        className='form-control' 
                        id='address' 
                        placeholder='Tu direccion de domicilio' 
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font' htmlFor="password" >
                        Contraseña
                    </label>
                    <input 
                        className='form-control' 
                        type="password" 
                        id='password' 
                        placeholder='Crea una contraseña' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Link href={`/sign-in/${email}`}>
                        Ya tienes una cuenta? <span className='underline'>Iniciar Sesion</span>
                    </Link>
                </div>
                <input type="submit" value="Crear Cuenta " className='uppercase px-1 py-2 border-1 border-yellow-500  hover:bg-yellow-500 font-bold transition-all duration-300 mt-2 w-full' />
            </form>
        </div>
    </Layaout>
  )
}

export default CreateAccount