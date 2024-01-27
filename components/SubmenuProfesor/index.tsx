import React, {FunctionComponent, useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Layout from '../Layout';
import SubMenu from '../SubMenu';
import {ILink} from '../../types';

interface ISubmenuProfesor {
  navigation: NavigationProp<ParamListBase, 'submenu-profesor'>;
}

const SubmenuProfesor: FunctionComponent<ISubmenuProfesor> = ({navigation}) => {
  const links: ILink[] = [
    {
      route: 'control-admin',
      title: 'Control del Robot',
    },
    {
      route: 'control-admin',
      title: 'Configuración de Módulos',
    },
    {
      route: 'control-admin',
      title: 'Cambio de Clave',
    },
  ];

  return (
    <Layout title="Profesor">
      <View style={s.imageWrapper}>
        <Image
          style={s.image}
          source={require(`../../assets/user-graduate.png`)}
          resizeMode="contain"
        />
        <Text style={s.imageTitle}>Profesor</Text>
      </View>
      <Text style={s.descripcion}>Escoja una opción</Text>
      <SubMenu links={links} title="Profesor" />
    </Layout>
  );
};

export default SubmenuProfesor;

const nivel = {};

type Rutina = Movimiento[];

interface Movimiento {
  motor1: number; // 0 - 180 grados
  motor2: number; // 0 - 180 grados
  motor3: number; // 0 - 180 grados
  motor4: number; // 0 - 180 grados
  velocidad: number; // 0 - 100 (%)
}
