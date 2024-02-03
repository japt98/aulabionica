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

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
