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

interface INivel4 {
  nivel: Nivel;
  calificacion?: Calificacion;
}

const Nivel4: FunctionComponent<INivel4> = ({nivel, calificacion}) => {
  const {descripcionPractica} = nivel;
  useSocket();
  const {state, dispatch} = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const {data, movimiento} = state;

  const RESPUESTAS_CORRECTAS = [
    [54, 126, 102, 60, 80], // Faltan q4 y q5
    [54, 134, 78, 60, 80], // Faltan q4 y q5
  ];

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
    const hayCorrecto = RESPUESTAS_CORRECTAS.find((r, j) => {
      const incorrecto = motores.slice(0, 5).some((pos, i) => {
        console.log({pos, r: r[i], i, j, diff: Math.abs(pos - r[i])});
        return Math.abs(pos - r[i]) > 6;
      });
      console.log('INCORRECTO', j, incorrecto);
      return !incorrecto;
    });

    const calificacionPractica = hayCorrecto
      ? 100
      : MIN_CALIFICACION_APROBADA - 10;

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
          El objetivo de este ejercicio es calcular el conjunto de ángulos de
          articulación para un vector de posición dado del efector final (garra)
          (x,y,z,𝜓,𝜑) del brazo robótico. Debes aplicar el método de cinemática
          inversa con las ecuaciones proporcionadas. Recuerda que no hay una
          única respuesta correcta. Ten en cuenta que los valores de 𝜓 y 𝜑
          proporcionados están en radianes pero las coordernadas articulares se
          maneja en grados.
        </Text>

        <Text style={s.text}>
          <Text style={s.boldtext}>Vector (x,y,z,𝜓,𝜑): </Text>
          (73; 5; 66; 0.25; -0.1)
        </Text>

        <Text style={s.titulo2}>
          Vector del centro de muñeca en relación a la posición del efector
          final por desacoplo cinemático
        </Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: 250,
              height: 80,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel4-1.png`)}
            resizeMode="contain"
          />
        </View>

        <Text style={s.titulo2}>
          Parámetros q1, q2 y q3 en función del vector posición de la muñeca
        </Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: '100%',
              height: 200,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel4-2.png`)}
            resizeMode="contain"
          />
        </View>
        <Text style={s.titulo2}>
          Relación de matrices para la obtención de los parámetros q4 y q5
        </Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: 370,
              height: 250,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel4-3.png`)}
            resizeMode="contain"
          />
        </View>

        <Text style={s.titulo2}>
          Parámetros q4 y q5 en función de parámetros de la matriz de rotación
        </Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: 200,
              height: 80,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel4-4.png`)}
            resizeMode="contain"
          />
        </View>

        <Text style={s.titulo2}>Leyenda</Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: 400,
              height: 180,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel4-5.png`)}
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

export default Nivel4;
