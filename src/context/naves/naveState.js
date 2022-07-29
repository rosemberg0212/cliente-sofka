import React, { useReducer, useCallback } from 'react'
import NaveContext from './naveContext'
import NaveReducer from './naveReducer'
import axios from 'axios'
import Swal from 'sweetalert2'

import {
  CREAR_NAVE,
  OBTENER_NAVE,
  BORRAR_NAVE,
  OBTENER_TIPO_NAVE,
} from '../../types'


const INITIAL_STATE = {
  nave: null,
  naves: [],
  tipoNaves: []
}

const NaveState = (props) => {
  const [state, dispatch] = useReducer(NaveReducer, INITIAL_STATE)

  //Registrar nueva nave
  const registrarNave = useCallback(async (datos) => {
    try {
      const res = await axios.post('https://treaning-sofka.herokuapp.com/api/naves', datos);
      console.log(res.data);
      dispatch({
        type: CREAR_NAVE,
        payload: res.data
      })
      Swal.fire({
        icon: 'success',
        title: 'Nave creada con éxito.',
        showConfirmButton: true,
        // timer: 1800
      }) 
    } catch (error) {
      console.log(error.response.data)
      // dispatch({
      // 	type: REGISTRO_ERROR,
      // 	payload: error.response.data.errors
      // })
    }
  }, [])

  //metodo para obtener naves
  const getNaves = useCallback(async () => {
    try {
      const res = await axios.get('https://treaning-sofka.herokuapp.com/api/naves');
      console.log(res.data);
      dispatch({
        type: OBTENER_NAVE,
        payload: res.data
      })
    } catch (error) {
      console.log(error.response.data.errors)
    }
  }, [])


  //metodo para obtener los tipos de naves
  const getNavesTipo = useCallback(async () => {
    try {
      const res = await axios.get('https://treaning-sofka.herokuapp.com/api/tipos');
      console.log(res.data);
      dispatch({
        type: OBTENER_TIPO_NAVE,
        payload: res.data
      })
    } catch (error) {
      console.log(error.response.data.errors)
    }
  }, [])

  //metodo para borrar naves
  const deleteNaves = useCallback(async (id) => {
    try {
      const res = await axios.delete(`https://treaning-sofka.herokuapp.com/api/naves/${id}`);
      console.log(res.data);
      dispatch({
        type: BORRAR_NAVE,
        payload: id
      })
      Swal.fire({
        icon: 'success',
        title: 'Nave borrada con éxito.',
        showConfirmButton: true,
        // timer: 1800
      })
    } catch (error) {
      console.log(error.response.data.errors)
    }
  }, [])



  const { nave, naves, tipoNaves } = state
  const values = {
    nave,
    naves,
    tipoNaves,
    registrarNave,
    getNaves,
    getNavesTipo,
    deleteNaves
  }

  return (
    <NaveContext.Provider
      value={values}
    >
      {props.children}
    </NaveContext.Provider>
  )
}

export default NaveState
