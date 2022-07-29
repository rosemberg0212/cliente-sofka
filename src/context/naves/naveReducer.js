import {
  CREAR_NAVE,
  OBTENER_NAVE,
  BORRAR_NAVE,
  OBTENER_TIPO_NAVE,
} from '../../types'

const naveReducer = (state, action) => {
  switch (action.type) {

    case OBTENER_NAVE:
      return {
        ...state,
        naves: action.payload,
      }

      case OBTENER_TIPO_NAVE:
      return {
        ...state,
        tipoNaves: action.payload,
      }

      case CREAR_NAVE:
      return {
        ...state,
        naves: [...state.naves, action.payload]
      }

    case BORRAR_NAVE:
      return {
        ...state,
        naves: state.naves.filter(nave => nave._id !==
          action.payload)
      }

    default:
      return state
  }
}

export default naveReducer