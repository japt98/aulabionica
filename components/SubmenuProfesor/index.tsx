import React, {FunctionComponent, useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Layout from '../Layout';
import SubMenu from '../SubMenu';
import {ILink} from '../../types';

const SubmenuProfesor: FunctionComponent = () => {
  const links: ILink[] = [
    {
      route: 'control-admin',
      title: 'Control del Robot',
    },
    {
      route: 'nueva-rutina',
      title: 'Nueva Rutina',
    },
    {
      route: 'rutinas-guardadas',
      title: 'Rutinas Guardadas',
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
