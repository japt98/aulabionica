import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import Layout from '../../Layout';
import {ParamList} from '../../../App';
import s from './styles';

interface IVistaProfesor {
  route: RouteProp<ParamList, 'vista-profesor'>;
}

const VistaProfesor: FunctionComponent<IVistaProfesor> = ({route}) => {
  const {nivel} = route.params;
  const {
    index,
    titulo,
    validacion,
    objetivo,
    conceptosClave,
    teoria,
    descripcion,
    descripcionPractica,
  } = nivel;

  return (
    <Layout title={`Nivel ${index + 1}`}>
      <View>
        <Text style={s.titulo}>{titulo}</Text>
        <View style={s.textWrapper}>
          <Text style={s.text}>
            <Text style={s.boldtext}>Descripción: </Text>
            {descripcion}
          </Text>
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
          <Text style={s.titulo}>Práctica</Text>
          <Text style={s.text}>
            {descripcionPractica}
            {validacion}
          </Text>
          <Text style={s.titulo}>Preguntas de teoría</Text>
          {teoria.map(e => (
            <View key={`teoria-${e.pregunta}`}>
              <Text style={s.text}>
                <Text style={s.boldtext}>{e.pregunta}</Text>
              </Text>
              {e.opciones.map((op, i) => (
                <Text
                  style={s.text}
                  key={`opciones-teoria-${e.pregunta}-${op}`}>
                  {i + 1} - {op}
                </Text>
              ))}
              <Text style={[s.text, s.pregunta]}>
                <Text style={s.boldtext}>Respuesta correcta: </Text>[
                {e.respuesta + 1}] {e.opciones[e.respuesta]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Layout>
  );
};

export default VistaProfesor;
