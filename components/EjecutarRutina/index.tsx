import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Layout from '../Layout';
import useSocket from '../../hooks/useSocket';
import {GlobalContext} from '../../context/global';
import {Operacion, Rutina} from '../../context/types';
import Status from './status';
import Motor from './motor';
import LoadingModal from './loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IEjecutarRutina {
  navigation: NavigationProp<ParamListBase, 'ejecutar-rutina'>;
}

const EjecutarRutina: FunctionComponent<IEjecutarRutina> = ({navigation}) => {
  useSocket();
  const {state, dispatch} = useContext(GlobalContext);
  const {data, movimiento} = state;

  const motores = [
    data?.pos_motor0 || 0,
    data?.pos_motor1 || 0,
    data?.pos_motor2 || 0,
    data?.pos_motor3 || 0,
    data?.pos_motor4 || 0,
    data?.pos_motor5 || 0,
  ];

  const filtrarOperacionesInnecesarias = ({
    nombre,
    operaciones,
  }: Rutina): Rutina => {
    const operacionesFiltradas = [operaciones[0]];

    for (let i = 1; i < operaciones.length; i++) {
      const operacionActual = operaciones[i];
      const operacionPrevia =
        operacionesFiltradas[operacionesFiltradas.length - 1];

      const movimientosNecesarios = operacionActual.filter(movActual => {
        const movPrevia = operacionPrevia.find(
          mov => mov.motor === movActual.motor,
        );
        return !movPrevia || movPrevia.posicion !== movActual.posicion;
      });

      if (movimientosNecesarios.length > 0) {
        operacionesFiltradas.push(movimientosNecesarios);
      }
    }

    return {nombre, operaciones: operacionesFiltradas};
  };

  const [rutina, setRutina] = useState<Rutina | null>(null);
  const [index, setIndex] = useState(0);
  const [ops, setOps] = useState<Operacion>([]);

  useEffect(() => {
    const initRutina = async () => {
      const rutina = JSON.parse(
        (await AsyncStorage.getItem('exec-rutina')) || '',
      ) as Rutina;
      setRutina(filtrarOperacionesInnecesarias(rutina));
      const primeraOperacion = rutina.operaciones[0];
      dispatch({type: 'SET_MOVIMIENTO', payload: primeraOperacion[0]});
      setOps(primeraOperacion.slice(1));
    };
    initRutina();
  }, []);

  useEffect(() => {
    try {
      if (!movimiento && rutina) {
        if (ops.length > 0) {
          dispatch({type: 'SET_MOVIMIENTO', payload: ops[0]});
          setOps(prevOps => prevOps.slice(1));
        } else if (rutina?.operaciones[index + 1]) {
          dispatch({
            type: 'SET_MOVIMIENTO',
            payload: rutina.operaciones[index + 1][0],
          });
          setOps(rutina.operaciones[index + 1].slice(1));
          setIndex(index + 1);
        } else {
          setIndex(index + 1);
          navigation.navigate('rutinas-guardadas');
          Alert.alert('Rutina finalizada');
        }
      }
    } catch (error) {
      console.log(JSON.stringify(error), (error as Error)?.message);
      throw error;
    }
  }, [movimiento]);

  const loading = Boolean(
    ops.length > 0 && rutina && rutina.operaciones.length > index,
  );

  return (
    <Layout title={rutina?.nombre || 'Rutina'}>
      <View style={s.wrapper}>
        {/* TODO: Make this shared */}
        <LoadingModal visible={loading} />
        {/* TODO: Make this shared */}
        <Status data={data} />
        <Text style={s.motoresTitle}>Motores</Text>
        <View>
          {motores.map((pos, i) => (
            <Motor index={i} posicion={pos} key={`Motor-${i}`} />
          ))}
        </View>
        <View style={s.buttons}>
          <View>
            <Text style={s.progresoTexto}>Progreso de la Rutina</Text>
            <View style={s.ops}>
              {Array.from({length: index}).map((_, i) => (
                <View style={s.op} key={`Op-${i}`} />
              ))}
              {index < (rutina?.operaciones?.length || 0) && (
                <View style={s.opActive} key={`Op-New`} />
              )}
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default EjecutarRutina;
