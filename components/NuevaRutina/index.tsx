import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Layout from '../Layout';
import useSocket from '../../hooks/useSocket';
import {GlobalContext} from '../../context/global';
import {Movimiento, Operacion} from '../../context/types';
import Status from './status';
import Motor from './motor';

interface INuevaRutina {
  navigation: NavigationProp<ParamListBase, 'nueva-rutina'>;
}
// TODO: Importante: quitar movimientos innecesarios
const NuevaRutina: FunctionComponent<INuevaRutina> = ({navigation}) => {
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

  const [operacion, setOperacion] = useState<Operacion>(
    motores.map(
      (posicion, i) =>
        ({
          motor: i,
          posicion,
          velocidad: 100,
        } as Movimiento),
    ),
  );
  const [ops, setOps] = useState<Operacion>([]);

  const agregarOperacion = () => {};

  const guardarRutina = () => {};

  const handlePress = () => {
    setOps(operacion.slice(1));
    dispatch({type: 'SET_MOVIMIENTO', payload: operacion[0]});
    Alert.alert(
      'La operación se esta ejecutando',
      'Agregue una nueva operación o termine la rutina para continuar o bien cancele para seguir editando esta operación.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Agregar Operación',
          style: 'default',
          onPress: agregarOperacion,
        },
        {
          text: 'Terminar Rutina',
          style: 'default',
          onPress: guardarRutina,
        },
      ],

      {cancelable: false},
    );
  };

  useEffect(() => {
    if (!movimiento && ops.length > 0) {
      dispatch({type: 'SET_MOVIMIENTO', payload: ops[0]});
      setOps(prevOps => prevOps.slice(1));
    }
  }, [movimiento]);

  const loading = ops.length > 0;

  return (
    <Layout title="Nueva Rutina">
      <View style={s.wrapper}>
        {loading && <Text style={{color: 'blue'}}>En Movimiento</Text>}
        <Status data={data} />
        <Text style={s.motoresTitle}>Motores</Text>
        <View>
          {motores.map((pos, i) => (
            <Motor
              index={i}
              posicion={pos}
              key={`Motor-${i}`}
              operacion={operacion}
              setOperacion={setOperacion}
            />
          ))}
        </View>
        <View style={s.buttons}>
          <TouchableOpacity style={s.button}>
            <Text style={s.buttonText}>Aqui bichitas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button} onPress={handlePress}>
            <Text style={s.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default NuevaRutina;
