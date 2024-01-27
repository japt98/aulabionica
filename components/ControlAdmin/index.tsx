import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Button, Pressable, Text, TextInput, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Slider from 'react-native-a11y-slider';
import Layout from '../Layout';
import {GlobalContext} from '../../context/global';
import useSocket from '../../hooks/useSocket';
import {Movimiento} from '../../context/types';
import {sleep} from '../../context/helpers';

interface IControlAdmin {
  navigation: NavigationProp<ParamListBase, 'control-admin'>;
}

const ControlAdmin: FunctionComponent<IControlAdmin> = ({navigation}) => {
  useSocket();
  const {state, dispatch} = useContext(GlobalContext);
  const {data, movimiento, error} = state;

  const operacion: Movimiento[] = [
    {
      motor: 5,
      posicion: 180,
      velocidad: 100,
    },
    {
      motor: 4,
      posicion: 180,
      velocidad: 100,
    },
    {
      motor: 5,
      posicion: 0,
      velocidad: 100,
    },
    {
      motor: 4,
      posicion: 0,
      velocidad: 100,
    },
    // {
    //   motor: 3,
    //   posicion: 98,
    //   velocidad: 100,
    // },
    // {
    //   motor: 2,
    //   posicion: 0,
    //   velocidad: 100,
    // },
    // {
    //   motor: 1,
    //   posicion: 180,
    //   velocidad: 100,
    // },
    // {
    //   motor: 0,
    //   posicion: 0,
    //   velocidad: 100,
    // },
    // {
    //   motor: 0,
    //   posicion: 105,
    //   velocidad: 100,
    // },
    // {
    //   motor: 1,
    //   posicion: 23,
    //   velocidad: 100,
    // },
    // {
    //   motor: 2,
    //   posicion: 170,
    //   velocidad: 100,
    // },
    // {
    //   motor: 3,
    //   posicion: 1,
    //   velocidad: 100,
    // },
    // {
    //   motor: 4,
    //   posicion: 34,
    //   velocidad: 100,
    // },
    // {
    //   motor: 5,
    //   posicion: 20,
    //   velocidad: 100,
    // },
    // {
    //   motor: 5,
    //   posicion: 180,
    //   velocidad: 100,
    // },
    // {
    //   motor: 4,
    //   posicion: 104,
    //   velocidad: 100,
    // },
    // {
    //   motor: 3,
    //   posicion: 98,
    //   velocidad: 100,
    // },
    // {
    //   motor: 2,
    //   posicion: 0,
    //   velocidad: 100,
    // },
    // {
    //   motor: 1,
    //   posicion: 180,
    //   velocidad: 100,
    // },
    // {
    //   motor: 0,
    //   posicion: 0,
    //   velocidad: 100,
    // },
    // {
    //   motor: 0,
    //   posicion: 105,
    //   velocidad: 100,
    // },
    // {
    //   motor: 1,
    //   posicion: 23,
    //   velocidad: 100,
    // },
    // {
    //   motor: 2,
    //   posicion: 170,
    //   velocidad: 100,
    // },
    // {
    //   motor: 3,
    //   posicion: 1,
    //   velocidad: 100,
    // },
    // {
    //   motor: 4,
    //   posicion: 34,
    //   velocidad: 100,
    // },
    // {
    //   motor: 5,
    //   posicion: 20,
    //   velocidad: 100,
    // },
  ];

  const [ops, setOps] = useState<Movimiento[]>([]);

  const handleStart = async () => {
    setOps(operacion.slice(1));
    console.log('starting ops');
    dispatch({type: 'SET_MOVIMIENTO', payload: operacion[0]});
  };

  useEffect(() => {
    if (!movimiento && ops.length > 0) {
      console.log('dispatching mov');
      dispatch({type: 'SET_MOVIMIENTO', payload: ops[0]});
      setOps(prevOps => prevOps.slice(1));
    }
  }, [movimiento]);

  return (
    <Layout title="Control">
      <View style={s.container}>
        <View>
          <Text>MOTOR 0: {data?.pos_motor0}</Text>
          <Text>MOTOR 1: {data?.pos_motor1}</Text>
          <Text>MOTOR 2: {data?.pos_motor2}</Text>
          <Text>MOTOR 3: {data?.pos_motor3}</Text>
          <Text>MOTOR 4: {data?.pos_motor4}</Text>
          <Text>MOTOR 5: {data?.pos_motor5}</Text>
          <Text>FSR: {data?.fuerza} N</Text>
        </View>

        <Pressable
          style={{
            ...s.button,
            backgroundColor: '#147efb',
          }}
          onPress={handleStart}>
          <Text style={s.buttonText}>Submit</Text>
        </Pressable>

        {error && (
          <View>
            <Text>ERROR: {error}</Text>
          </View>
        )}

        {movimiento && (
          <View>
            <Text>EN MOVIMIENTO ⚠️</Text>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default ControlAdmin;

function obtenerValoresActuales() {} //WTF
