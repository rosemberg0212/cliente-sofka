import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import { useNave } from '../../context/naves/naveContext'

const Content = () => {
  //extreamos del state global los metodos a utilizar
  const { getNavesTipo, tipoNaves } = useNave()

  //metodo para llamar a la funcion de obtener todos los tipos de naves cada que cargue la pagina
  useEffect(() => {
    getNavesTipo()
  }, [getNavesTipo])

  return (
    <div className='content-info'>
      <h2>Tipos de Naves</h2>
      <div className='cartas'>
        {tipoNaves.map(tipo => (
          <Link to={`/naves/${tipo._id}`}>
            <Card
              tipo={tipo}
              key={tipo._id}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Content