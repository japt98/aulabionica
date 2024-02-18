import React, {FunctionComponent} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Calificacion,
  MIN_CALIFICACION_APROBADA,
  Nivel as _Nivel,
} from '../../niveles';
import {ParamList} from '../../../App';
import s from './styles';

interface INivel extends _Nivel {
  bloqueado: boolean;
  calificacion?: Calificacion;
}

const Nivel: FunctionComponent<INivel> = ({
  bloqueado,
  calificacion,
  ...nivel
}) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const {titulo, descripcion} = nivel;

  const calificacion_teoria = calificacion?.teoria || 0;
  const calificacion_practica = calificacion?.practica || 0;

  const generarColorCalificacion = (cal: number) =>
    cal >= MIN_CALIFICACION_APROBADA ? '#42d4fa' : '#fe8686';

  const completado =
    calificacion_practica >= MIN_CALIFICACION_APROBADA &&
    calificacion_teoria >= MIN_CALIFICACION_APROBADA;

  return (
    <TouchableOpacity
      disabled={bloqueado}
      onPress={() => navigation.navigate('teoria', {nivel, calificacion})}
      style={s.container}>
      <View style={[s.wrapper, {opacity: bloqueado ? 0.6 : 1}]}>
        {completado && (
          <Image
            style={s.completado}
            source={require(`../../../assets/circle-check.png`)}
            resizeMode="contain"
          />
        )}

        <View style={s.index}>
          <Text style={s.indexText}>{nivel.index + 1}</Text>
        </View>
        <View style={s.textWrapper}>
          <Text style={s.titulo}>{titulo}</Text>
          <Text style={s.descripcion}>{descripcion}</Text>
        </View>
        <View style={s.status}>
          {bloqueado ? (
            <Image
              style={s.image}
              source={require(`../../../assets/lock-solid.png`)}
              resizeMode="contain"
            />
          ) : (
            <>
              <View style={s.progressCont}>
                <Text style={s.descripcionProg}>Teoría</Text>
                <View style={s.progressWrapper}>
                  <View
                    style={[
                      s.progress,
                      {
                        width: `${calificacion_teoria}%`,
                        backgroundColor:
                          generarColorCalificacion(calificacion_teoria),
                      },
                    ]}></View>
                </View>
              </View>
              <View style={s.progressCont}>
                <Text style={s.descripcionProg}>Práctica</Text>
                <View style={s.progressWrapper}>
                  <View
                    style={[
                      s.progress,
                      {
                        width: `${calificacion_practica}%`,
                        backgroundColor: generarColorCalificacion(
                          calificacion_practica,
                        ),
                      },
                    ]}></View>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Nivel;
