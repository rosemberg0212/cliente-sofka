import React, { Suspense, lazy } from 'react'
import Banner from '../components/home/Banner'
// import Content from '../components/home/Content'
const Content = lazy(() => import('../components/home/Content'))

const Home = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Content />
      </Suspense>
    </div>
  )
}

export default Home