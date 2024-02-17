import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Layout from '../Layout';
import useSocket from '../../hooks/useSocket';
import {GlobalContext} from '../../context/global';
import {Movimiento, Operacion, Rutina} from '../../context/types';
import Status from './status';
import Motor from './motor';
import ModalForm from './modal';
import LoadingModal from './loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_RUTINA_NAME = 'Rutina Nueva';

interface INuevaRutina {
  navigation: NavigationProp<ParamListBase, 'nueva-rutina'>;
}

const NuevaRutina: FunctionComponent<INuevaRutina> = ({navigation}) => {
  useSocket();
  const {state, dispatch} = useContext(GlobalContext);
  const {data, movimiento, rutinas} = state;

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

  const [rutina, setRutina] = useState<Rutina>({
    nombre: DEFAULT_RUTINA_NAME,
    operaciones: [],
  });
  const [modalOpen, setModalOpen] = useState(false);

  const filtrarMovimientosNecesarios = (operacion: Operacion): Operacion =>
    operacion.filter(op => op.posicion !== data?.[`pos_motor${op.motor}`]);

  const agregarOperacion = () => {
    const operacionActual = JSON.parse(JSON.stringify(operacion));
    setRutina({
      ...rutina,
      operaciones: [...rutina.operaciones, operacionActual],
    });
  };

  const guardarRutina = async (name: string) => {
    const operacionActual = JSON.parse(JSON.stringify(operacion));
    const rutinaCompleta = {
      nombre: name,
      operaciones: [...rutina.operaciones, operacionActual],
    };
    dispatch({
      type: 'SET_RUTINA',
      payload: rutinaCompleta,
    });
    await AsyncStorage.setItem(
      'rutinas',
      JSON.stringify([...rutinas, rutinaCompleta]),
    );
    navigation.navigate('submenu-profesor');
    // TODO: ver si podemos agregar una alerta de success aca
    Alert.alert('Rutina guardada');
  };

  const handlePress = () => {
    const movimientosAGuardar = filtrarMovimientosNecesarios(operacion);
    setOps(movimientosAGuardar.slice(1));
    dispatch({type: 'SET_MOVIMIENTO', payload: movimientosAGuardar[0]});
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
          onPress: () => setModalOpen(true),
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    // TODO: Encontrar el error al moverse
    try {
      if (!movimiento && ops.length > 0) {
        dispatch({type: 'SET_MOVIMIENTO', payload: ops[0]});
        setOps(prevOps => prevOps.slice(1));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [movimiento]);

  const loading = ops.length > 0;

  return (
    <Layout title="Nueva Rutina">
      <View style={s.wrapper}>
        <LoadingModal visible={loading} />
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
          <View>
            <Text style={s.progresoTexto}>Progreso de la Rutina</Text>
            <View style={s.ops}>
              {rutina.operaciones.map((_, i) => (
                <View style={s.op} key={`Op-${i}`} />
              ))}
              <View style={s.opActive} key={`Op-New`} />
            </View>
          </View>
          <TouchableOpacity style={s.button} onPress={handlePress}>
            <Text style={s.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalForm
        defaultName={DEFAULT_RUTINA_NAME}
        guardar={guardarRutina}
        visible={modalOpen}
        cancelar={() => setModalOpen(false)}
      />
    </Layout>
  );
};

export default NuevaRutina;
