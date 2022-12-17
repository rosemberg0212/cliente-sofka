import React, { Suspense, lazy } from 'react'
// import Nave from '../components/resto/Nave'
const Nave = lazy(() => import('../components/resto/Nave'))

const Naves = () => {
  return (
    <div>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Nave />
      </Suspense>
    </div>
  )
}

export default Naves