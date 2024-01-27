import * as React from 'react';
import {globalReducer} from './reducer';
import {GlobalContextType, IGlobalProvider, IGlobalState} from './types';

const initialState: IGlobalState = {
  conectado: false,
  data: null,
  error: null,
  movimiento: null,
  rutina: null,
  logged: false,
};

const GlobalContext = React.createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => null,
});

const GlobalProvider: React.FunctionComponent<IGlobalProvider> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export {GlobalProvider, GlobalContext};
