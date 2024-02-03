import {Action, IGlobalState} from './types';

export const globalReducer = (
  state: IGlobalState,
  action: Action,
): IGlobalState => {
  switch (action.type) {
    case 'SET_DATA':
      return {...state, data: action.payload};
    case 'SET_MOVIMIENTO':
      return {...state, movimiento: action.payload};
    case 'CLEAR_MOVIMIENTO':
      return {...state, movimiento: null};
    case 'SET_ERROR':
      return {...state, error: action.payload};
    case 'CLEAR_ERROR':
      return {...state, error: null};
    case 'SET_CONECTADO':
      return {...state, conectado: action.payload};
    case 'SET_RUTINA':
      return {...state, rutinas: [...state.rutinas, action.payload]};
    case 'CARGAR_RUTINAS':
      return {...state, rutinas: action.payload};
    default:
      return state;
  }
};
