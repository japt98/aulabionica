import React, {FunctionComponent, useContext} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Layout from '../Layout';
import {GlobalContext} from '../../context/global';

interface IMenuPrincipal {
  navigation: NavigationProp<ParamListBase, 'menu-principal'>;
}

const MenuPrincipal: FunctionComponent<IMenuPrincipal> = ({navigation}) => {
  const {
    state: {conectado, error, logged},
  } = useContext(GlobalContext);

  const toggle = () => {
    if (!conectado) {
      navigation.navigate('menu-conexion');
    }
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
            <TouchableOpacity
              style={s.item}
              onPress={() =>
                navigation.navigate(logged ? 'control-admin' : 'login-profesor')
              }>
              <Image
                style={s.itemImage}
                source={require(`../../assets/user-graduate.png`)}
                resizeMode="contain"
              />
              <Text style={s.texto}>Profesor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.item}>
              <Image
                style={s.itemImage}
                source={require(`../../assets/user.png`)}
                resizeMode="contain"
              />
              <Text style={s.texto}>Alumno</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default MenuPrincipal;
