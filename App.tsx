import React, {FunctionComponent} from 'react';
import {GlobalProvider} from './context/global';
import MenuConexion from './components/MenuConexion';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ControlAdmin from './components/ControlAdmin';
import MenuPrincipal from './components/MenuPrincipal';
import SubmenuProfesor from './components/SubmenuProfesor';
import LoginProfesor from './components/LoginProfesor';
import NuevaRutina from './components/NuevaRutina';
import RutinasGuardadas from './components/RutinasGuardadas';
import EjecutarRutina from './components/EjecutarRutina';
import Teoria from './components/niveles/Teoria';
import SubmenuNiveles from './components/SubmenuNiveles';
import {Calificacion, Nivel} from './components/niveles';
import VistaProfesor from './components/niveles/VistaProfesor';
import SubmenuNivelesProfesor from './components/SubmenuNivelesProfesor';

export type ParamList = {
  'menu-conexion': undefined;
  menu: undefined;
  'control-admin': undefined;
  'login-profesor': undefined;
  'submenu-profesor': undefined;
  'submenu-niveles-profesor': undefined;
  'nueva-rutina': undefined;
  'rutinas-guardadas': undefined;
  'ejecutar-rutina': undefined;
  'submenu-niveles': undefined;
  teoria: {nivel: Nivel; calificacion?: Calificacion};
  'vista-profesor': {nivel: Nivel};
};

const Stack = createNativeStackNavigator<ParamList>();

const App: FunctionComponent = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="menu-conexion"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="menu-conexion" component={MenuConexion} />
          <Stack.Screen name="menu" component={MenuPrincipal} />
          <Stack.Screen name="control-admin" component={ControlAdmin} />
          <Stack.Screen name="login-profesor" component={LoginProfesor} />
          <Stack.Screen name="submenu-profesor" component={SubmenuProfesor} />
          <Stack.Screen name="nueva-rutina" component={NuevaRutina} />
          <Stack.Screen name="rutinas-guardadas" component={RutinasGuardadas} />
          <Stack.Screen name="ejecutar-rutina" component={EjecutarRutina} />
          <Stack.Screen name="teoria" component={Teoria} />
          <Stack.Screen name="submenu-niveles" component={SubmenuNiveles} />
          <Stack.Screen name="vista-profesor" component={VistaProfesor} />
          <Stack.Screen
            name="submenu-niveles-profesor"
            component={SubmenuNivelesProfesor}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
