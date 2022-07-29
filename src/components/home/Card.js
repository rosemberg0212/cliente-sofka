import React from 'react'

const Card = ({tipo}) => {
  return (
    <div className='carta'>
        <h3>{tipo.nombre}</h3>
    </div>
  )
}

export default Card