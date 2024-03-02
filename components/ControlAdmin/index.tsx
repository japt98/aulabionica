import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import s from './styles';
import Layout from '../Layout';
import useSocket from '../../hooks/useSocket';
import {GlobalContext} from '../../context/global';
import {Movimiento, Operacion} from '../../context/types';
import Status from '../shared/status';
import Motor from './motor';
import LoadingModal from './loading';

const ControlAdmin: FunctionComponent = () => {
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

  const filtrarMovimientosNecesarios = (operacion: Operacion): Operacion =>
    operacion.filter(op => op.posicion !== data?.[`pos_motor${op.motor}`]);

  const handlePress = () => {
    const movimientosAGuardar = filtrarMovimientosNecesarios(operacion);
    setOps(movimientosAGuardar.slice(1));
    dispatch({type: 'SET_MOVIMIENTO', payload: movimientosAGuardar[0]});
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
    <Layout title="Control">
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
        {/* <View style={s.buttons}> */}
        {/* <View></View> */}
        <TouchableOpacity style={s.button} onPress={handlePress}>
          <Text style={s.buttonText}>Iniciar</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </Layout>
  );
};

export default ControlAdmin;
