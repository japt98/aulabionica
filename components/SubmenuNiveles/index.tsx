import React, {FunctionComponent, useCallback, useState} from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import s from './styles';
import Layout from '../Layout';
import niveles, {Calificacion, MIN_CALIFICACION_APROBADA} from '../niveles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Nivel from './nivel';
import {useFocusEffect} from '@react-navigation/native';

const SubmenuNiveles: FunctionComponent = () => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);

  useFocusEffect(
    useCallback(() => {
      const obtenerCalificaciones = async () => {
        const calificaciones_ =
          (await AsyncStorage.getItem('calificaciones')) || '[]';
        console.log('cal', calificaciones_);
        setCalificaciones(JSON.parse(calificaciones_));
      };
      obtenerCalificaciones();
    }, []),
  );

  const obtenerCalificacionDeNivel = (cal: Calificacion[], index: number) =>
    cal.find(e => e.index === index);

  const esCompletado = (cal: Calificacion[], index: number) => {
    const calificacion = obtenerCalificacionDeNivel(cal, index);
    if (!calificacion) return false;
    return (
      calificacion.practica >= MIN_CALIFICACION_APROBADA &&
      calificacion.teoria >= MIN_CALIFICACION_APROBADA
    );
  };

  return (
    <Layout title="Niveles">
      <View style={s.imageWrapper}>
        <Image
          style={s.image}
          source={require(`../../assets/user.png`)}
          resizeMode="contain"
        />
        <Text style={s.imageTitle}>Estudiante</Text>
      </View>
      <Text style={s.descripcion}>Escoja un nivel</Text>
      <ScrollView style={s.niveles}>
        {niveles.map(nivel => (
          <Nivel
            {...nivel}
            key={`nivel${nivel.index}`}
            bloqueado={
              nivel.index !== 0 &&
              !esCompletado(calificaciones, nivel.index - 1)
            }
            calificacion={obtenerCalificacionDeNivel(
              calificaciones,
              nivel.index,
            )}
          />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default SubmenuNiveles;
