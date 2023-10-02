import Layaout from '@/components/layouts/Layaout';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const signIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [allowSignIn, setAllowSignIn] = useState(false)
  const router = useRouter()
  const {validateUser,signIn}=useAuth()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(email === ''){
      return
    }

    if(await validateUser(email)){
      setAllowSignIn(true)

    }else{
      router.push(`/create-account/${email}`)
      setAllowSignIn(false)
    }
    

  }

  const handleSignIn = async (e)=>{
    e.preventDefault();

    signIn({identifier:email,password})

  }

  return (
    <Layaout>
      <div className='flex flex-col justify-evenly w-1/2 h-[250px]  mx-auto mt-10'>
        <h1 className='text-2xl font-bold'>
          Inicia Sesion | Crear Cuenta
        </h1>

        <p>Ingresa tu correo electrónico para empezar.</p>

        <form 
          className='form'
          onSubmit={allowSignIn ? handleSignIn : handleSubmit}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>
          {
            allowSignIn && (
              <div>
                <label htmlFor="password" className='font-bold'>Password</label>
                <input 
                  required={true} 
                  type="password" 
                  className='form-control' 
                  placeholder='Tu Contraseña' 
                  name='password' 
                  id='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  
                />
              </div>
            )
          }
          {
            allowSignIn ? (
              <input type="submit" value='Iniciar sesion' className='uppercase px-1 py-2 border-1 border-yellow-500  hover:bg-yellow-500 font-bold transition-all duration-300 mt-2 w-full' />
            ) : (
              <input type="submit" value='Siguiente' className='uppercase px-1 py-2 border-1 border-yellow-500  hover:bg-yellow-500 font-bold transition-all duration-300 mt-2 w-full' />
            )
          }
        </form>

      </div>
    </Layaout>
  )
}

export default signIn