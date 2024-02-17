import React, {FunctionComponent, useContext, useState} from 'react';
import {TouchableOpacity, Text, View, ScrollView} from 'react-native';
import s from './styles';
import Layout from '../Layout';
import {GlobalContext} from '../../context/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Rutina} from '../../context/types';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface IRutinasGuardadas {
  navigation: NavigationProp<ParamListBase, 'rutinas-guardadas'>;
}

const RutinasGuardadas: FunctionComponent<IRutinasGuardadas> = ({
  navigation,
}) => {
  const {state} = useContext(GlobalContext);
  const {rutinas} = state;

  const truncName = (str: string) =>
    str.length > 18 ? str.slice(0, 15) + '...' : str;

  const ejecutarRutina = async (rutina: Rutina) => {
    await AsyncStorage.setItem('exec-rutina', JSON.stringify(rutina));
    navigation.navigate('ejecutar-rutina');
  };

  return (
    <Layout title="Rutinas">
      <Text style={s.descripcion}>Seleccione una rutina para ejecutarla</Text>
      <ScrollView style={s.rutinasWrapper}>
        {rutinas.map(({nombre, operaciones}, i) => (
          <TouchableOpacity
            style={s.rutinaContainer}
            key={`Rutina-${i}`}
            onPress={() => ejecutarRutina({nombre, operaciones})}>
            <View style={s.rutinaWrapper}>
              <Text style={s.nombre}>{truncName(nombre)}</Text>
              <View style={s.ops}>
                {operaciones.length > 10 ? (
                  <>
                    <Text style={s.lenght}>{operaciones.length}</Text>
                    <View style={s.op} />
                  </>
                ) : (
                  operaciones.map((_, i) => (
                    <View style={s.op} key={`Op-${i}`} />
                  ))
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default RutinasGuardadas;
