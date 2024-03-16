import React, {FunctionComponent, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Layout from '../../Layout';
import {ParamList} from '../../../App';
import s from './styles';
import PreguntaForm from './form';
import {Calificacion, MIN_CALIFICACION_APROBADA, Pregunta, practicas} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ITeoria {
  navigation: NavigationProp<ParamList, 'teoria'>;
  route: RouteProp<ParamList, 'teoria'>;
}

const Teoria: FunctionComponent<ITeoria> = ({navigation, route}) => {
  const {nivel, calificacion} = route.params;
  const {index, titulo, validacion, objetivo, conceptosClave, teoria} = nivel;

  const [pregunta, setPregunta] = useState<Pregunta | null>(null);
  const [correctas, setCorrectas] = useState(0);

  const [indexPregunta, setIndexPregunta] = useState(0);
  const [practica, setPractica] = useState(false);

  const iniciarNivel = () => {
    if (
      calificacion?.teoria &&
      calificacion.teoria >= MIN_CALIFICACION_APROBADA
    ) {
      setPractica(true);
    } else {
      setPregunta(teoria[0]);
    }
  };

  const agregarRespuesta = async (respuestaCorrecta: boolean) => {
    const proximoIndex = indexPregunta + 1;
    if (teoria[proximoIndex]) {
      if (respuestaCorrecta) {
        setCorrectas(correctas + 1);
      }
      setIndexPregunta(proximoIndex);
      setPregunta(teoria[proximoIndex]);
    } else {
      let respuestasCorrectas = correctas;
      respuestaCorrecta && respuestasCorrectas++;
      const calificacionTeoria = (100 * respuestasCorrectas) / teoria.length;

      const aprobado = calificacionTeoria >= MIN_CALIFICACION_APROBADA;

      const nuevaCalificacionTeorica = Math.max(
        calificacion?.teoria || 0,
        calificacionTeoria,
      );

      let calificaciones_ = JSON.parse(
        (await AsyncStorage.getItem('calificaciones')) || '[]',
      ) as Calificacion[];

      const newCalificacion: Calificacion = {
        index: nivel.index,
        practica:
          calificaciones_.find(e => e.index === nivel.index)?.practica || 0,
        teoria: nuevaCalificacionTeorica,
      };

      await AsyncStorage.setItem(
        'calificaciones',
        JSON.stringify([
          ...calificaciones_.filter(e => e.index !== nivel.index),
          newCalificacion,
        ]),
      );

      Alert.alert(
        aprobado ? 'Felicitaciones 🎉' : 'Inténtalo de nuevo 😢',
        `Preguntas Correctas: ${respuestasCorrectas}/${teoria.length}`,
      );

      if (aprobado) {
        // mandar a practica
        setPractica(true);
      } else {
        navigation.navigate('submenu-niveles');
      }
    }
  };

  const ComponentePractica = practicas[nivel.index];

  return (
    <Layout title={`Nivel ${index + 1}`}>
      <View>
        <Text style={s.titulo}>{titulo}</Text>

        {practica ? (
          <ComponentePractica nivel={nivel} calificacion={calificacion} />
        ) : pregunta ? (
          <PreguntaForm {...pregunta} callback={agregarRespuesta} />
        ) : (
          <View style={s.textWrapper}>
            <Text style={s.text}>
              <Text style={s.boldtext}>Objetivo: </Text>
              {objetivo}
            </Text>
            <Text style={s.text}>
              <Text style={s.boldtext}>Validación: </Text>
              {validacion}
            </Text>
            <Text style={s.text}>
              <Text style={s.boldtext}>Conceptos Clave: </Text>
              {conceptosClave}
            </Text>
            <TouchableOpacity style={s.button} onPress={iniciarNivel}>
              <Text style={s.buttonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default Teoria;
