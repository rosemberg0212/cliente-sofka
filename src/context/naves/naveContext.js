import { createContext, useContext } from 'react'

const NaveContext = createContext()

export function useNave() {
  const context = useContext(NaveContext)
  
  if (!context) {
    throw new Error('useNave debe ser usado por un componente envuelto por NaveState')
  }

  return context
}

export default NaveContext
