import React from 'react'
import foto from '../../img/acercamiento.webp';

const Banner = () => {
  return (
    <div className='content-banner'>
        <div className='info'>
            <h1>ESTACIÓN ESPACIAL SOFKA</h1>
            <h2>Naves espaciales que pasaron a la historia.</h2>
            
        </div>
        <div className='foto'>
            <img src={foto} alt='espacio'/>
        </div>
    </div>
  )
}

export default Banner