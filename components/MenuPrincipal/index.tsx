import React, {FunctionComponent, useContext} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './styles';
import Layout from '../Layout';
import * as rutinas from './rutinas';
import {GlobalContext} from '../../context/global';
import {TIEMPO_DE_LA_SESION} from '../LoginProfesor/coordenadas';
import RNRestart from 'react-native-restart';
import {Rutina} from '../../context/types';

interface IMenuPrincipal {
  navigation: NavigationProp<ParamListBase, 'menu-principal'>;
}

const MenuPrincipal: FunctionComponent<IMenuPrincipal> = ({navigation}) => {
  const {
    state: {conectado, error},
  } = useContext(GlobalContext);

  const toggle = () => {
    if (!conectado) {
      RNRestart.restart();
    }
  };

  const handlePress = async () => {
    const sessionItem = await AsyncStorage.getItem('session_profesor');
    const valido =
      sessionItem &&
      new Date().getTime() - Number(sessionItem) < TIEMPO_DE_LA_SESION;
    navigation.navigate(valido ? 'submenu-profesor' : 'login-profesor');
  };

  const setRutina = async (rutina: Rutina) => {
    await AsyncStorage.setItem('exec-rutina', JSON.stringify(rutina));
    navigation.navigate('ejecutar-rutina');
  };

  return (
    <Layout title="Menú">
      <View style={s.container}>
        <View style={s.imageWrapper}>
          <Image
            style={s.image}
            source={require('../../aulabionica-high-resolution-logo.png')}
          />
        </View>
        <View style={s.card}>
          <View style={s.conexionWrapper}>
            <TouchableOpacity onPress={toggle} disabled={conectado}>
              <View style={s.conexionImageWrapper}>
                <Image
                  style={s.conexionImage}
                  source={
                    conectado
                      ? require(`../../assets/circle-check.png`)
                      : require(`../../assets/circle-xmark.png`)
                  }
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <Text style={s.titulo}>
              {conectado ? 'Conectado' : 'Desconectado'}
            </Text>
          </View>
          {error && <Text style={s.error}>{error}</Text>}
          <Text style={s.texto}>Elija el modo de acceso:</Text>
          <View style={s.menuSeleccion}>
            <TouchableOpacity style={s.item} onPress={handlePress}>
              <Image
                style={s.itemImage}
                source={require(`../../assets/user-graduate.png`)}
                resizeMode="contain"
              />
              <Text style={s.texto}>Profesor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.item}
              onPress={() => navigation.navigate('submenu-niveles')}>
              <Image
                style={s.itemImage}
                source={require(`../../assets/user.png`)}
                resizeMode="contain"
              />
              <Text style={s.texto}>Alumno</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={s.posContainer}
              onPress={() => setRutina(rutinas.iniciado)}>
              <Image
                style={s.posImage}
                source={require(`../../assets/arrow-rotate-right-solid.png`)}
                resizeMode="contain"
              />
              <Text style={s.posText}>Posición de inicio</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={s.posContainer}
              onPress={() => setRutina(rutinas.guardado)}>
              <Image
                style={s.posImage}
                source={require(`../../assets/power-off-solid.png`)}
                resizeMode="contain"
              />
              <Text style={s.posText}>Posición de apagado</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default MenuPrincipal;
