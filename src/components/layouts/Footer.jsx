import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div>
            <p className='text-white text-center py-3'>
                Creado por Jake Fernandez B |Todos los derechos reservados &copy; {new Date(Date.now()).getFullYear()}
            </p>
        </div>
    </footer>
  )
}

export default Footer