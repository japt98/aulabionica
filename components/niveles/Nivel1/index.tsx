import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {Calificacion, MIN_CALIFICACION_APROBADA, Nivel} from '..';
import s from './styles';
import LoadingModal from '../../ControlAdmin/loading';
import useSocket from '../../../hooks/useSocket';
import {GlobalContext} from '../../../context/global';
import {Movimiento, Operacion} from '../../../context/types';
import Status from '../../shared/status';
import Motor from '../../ControlAdmin/motor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../../App';

interface INivel1 {
  nivel: Nivel;
  calificacion?: Calificacion;
}

const Nivel1: FunctionComponent<INivel1> = ({nivel, calificacion}) => {
  useSocket();
  const {state, dispatch} = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const {data, movimiento} = state;

  const RESPUESTA_CORRECTA = [0, 180, 90, 90, 180, 180];

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
    operacion
      .filter(op => op.posicion !== data?.[`pos_motor${op.motor}`])
      .map(op => ({...op, velocidad}));

  const [velocidad, setVelocidad] = useState(50);
  const incrementVel = () => setVelocidad(prev => prev + 10);
  const decrementVel = () => setVelocidad(prev => prev - 10);

  const handlePress = async () => {
    const movimientosAGuardar = filtrarMovimientosNecesarios(operacion);
    setOps(movimientosAGuardar.slice(1));
    dispatch({type: 'SET_MOVIMIENTO', payload: movimientosAGuardar[0]});
  };

  const enviarRespuesta = async () => {
    const incorrecto = motores.some(
      (pos, i) => Math.abs(pos - RESPUESTA_CORRECTA[i]) > 6 && i !== 0,
    );

    const calificacionPractica = incorrecto
      ? MIN_CALIFICACION_APROBADA - 10
      : 100;

    const aprobado = calificacionPractica >= MIN_CALIFICACION_APROBADA;

    const nuevaCalificacionPractica = Math.max(
      calificacion?.practica || 0,
      calificacionPractica,
    );

    let calificaciones_ = JSON.parse(
      (await AsyncStorage.getItem('calificaciones')) || '[]',
    ) as Calificacion[];

    const newCalificacion: Calificacion = {
      index: nivel.index,
      teoria: calificaciones_.find(e => e.index === nivel.index)?.teoria || 0,
      practica: nuevaCalificacionPractica,
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
      aprobado
        ? ''
        : 'Lo sentimos, tu respuesta no es correcta por favor inténtalo de nuevo y si hay alguna confusión o problema, consúltalo con tu docente.',
    );

    navigation.navigate('submenu-niveles');
  };

  const handleSubmit = () => {
    const movimientosAGuardar = filtrarMovimientosNecesarios(operacion);
    setOps(movimientosAGuardar.slice(1));
    dispatch({type: 'SET_MOVIMIENTO', payload: movimientosAGuardar[0]});
    Alert.alert(
      '¿Enviar respuesta?',
      'Por favor verifica que esté todo bien antes de enviar la respuesta.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Enviar Respuesta',
          style: 'default',
          onPress: enviarRespuesta,
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
    <>
      <View style={s.textWrapper}>
        <Text style={s.text}>
          En este nivel inicial, tu objetivo será guiar al brazo robótico hacia
          una posición específica, donde su garra esté orientada verticalmente
          hacia el cielo, manteniéndose completamente recta y abierta, tal como
          se ilustra en las figuras.
        </Text>

        <Text style={s.text}>
          Esta configuración inicial no solo sirve como tu primer desafío, sino
          que también te brinda la oportunidad de familiarizarte con los
          controles y la gama de movimientos posibles del brazo robótico. Te
          animamos a explorar y experimentar con diferentes movimientos antes de
          fijar tu respuesta final.
        </Text>
        {/* <TouchableOpacity style={s.button} onPress={() => {}}>
        <Text style={s.buttonText}>Iniciar</Text>
      </TouchableOpacity> */}

        <Text style={s.titulo}>Figuras</Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: 175,
              height: 250,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel1-1.png`)}
            resizeMode="contain"
          />
          <Image
            style={{
              width: 220,
              height: 500,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel1-2.png`)}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={s.wrapper}>
        <LoadingModal visible={loading} />
        <Status
          data={data}
          vel={velocidad / 10}
          incrementVel={incrementVel}
          decrementVel={decrementVel}
        />
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
          <Text style={s.buttonText}>Mover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.button2} onPress={handleSubmit}>
          <Text style={s.buttonText2}>Enviar respuesta</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </>
  );
};

export default Nivel1;
