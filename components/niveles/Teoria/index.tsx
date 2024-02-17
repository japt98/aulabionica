import React, {FunctionComponent, useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Layout from '../../Layout';
import {ParamList} from '../../../App';
import s from './styles';
import PreguntaForm from './form';
import {Calificacion, MIN_CALIFICACION_APROBADA, Pregunta} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ITeoria {
  navigation: NavigationProp<ParamList, 'teoria'>;
  route: RouteProp<ParamList, 'teoria'>;
}

const Teoria: FunctionComponent<ITeoria> = ({navigation, route}) => {
  const {nivel, calificacion} = route.params;
  const {
    index,
    titulo,
    descripcion,
    validacion,
    objetivo,
    conceptosClave,
    teoria,
    practica: ComponentePractica,
  } = nivel;

  const [pregunta, setPregunta] = useState<Pregunta | null>(null);
  const [correctas, setCorrectas] = useState(0);

  const [indexPregunta, setIndexPregunta] = useState(0);
  const [practica, setPractica] = useState(false); // Si ya pasaste la teoria mandarte a la practica

  // Si ya pasaste la teoria mandarte a la practica
  // Si ya pasaste la practica puedes volverla a hacer y se conservará la mayor nota
  // Mostrar resultados (teoria y practica)
  const iniciarNivel = () => {
    setPregunta(teoria[0]);
  };

  const agregarRespuesta = async (respuestaCorrecta: boolean) => {
    const proximoIndex = indexPregunta + 1;
    if (teoria[proximoIndex]) {
      // Hay proximo
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
      Alert.alert(
        'Resultado',
        `Calificacion: ${calificacionTeoria} (aprobado?: ${aprobado})\n
          Respuestas ${respuestasCorrectas}/${teoria.length}
        `,
      );

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

      //agregar ultima respuesta
      // obtener el resultado
      // decidir si aprobo o no
      // dependiendo de si aprobó, mandar o no a practica
    }
  };

  return (
    <Layout title={`Nivel ${index + 1}`}>
      <View>
        <Text style={s.titulo}>{titulo}</Text>

        {practica ? (
          <ComponentePractica />
        ) : pregunta ? (
          <PreguntaForm {...pregunta} callback={agregarRespuesta} />
        ) : (
          <View>
            <Text style={{color: 'black'}}>Objetivo: {objetivo}</Text>
            <Text style={{color: 'black'}}>Validación: {validacion}</Text>
            <Text style={{color: 'black'}}>
              Conceptos Clave: {conceptosClave}
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
