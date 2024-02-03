import * as React from 'react';
import {globalReducer} from './reducer';
import {GlobalContextType, IGlobalProvider, IGlobalState} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: IGlobalState = {
  conectado: false,
  data: null,
  error: null,
  movimiento: null,
  rutinas: [],
};

const GlobalContext = React.createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => null,
});

const GlobalProvider: React.FunctionComponent<IGlobalProvider> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);

  React.useEffect(() => {
    const cargarRutinas = async () => {
      console.log('CARGANDO RUTINAS');
      const rutinasGuardadas = await AsyncStorage.getItem('rutinas');
      if (rutinasGuardadas) {
        dispatch({
          type: 'CARGAR_RUTINAS',
          payload: JSON.parse(rutinasGuardadas),
        });
      }
    };
    cargarRutinas();
  }, []);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export {GlobalProvider, GlobalContext};
