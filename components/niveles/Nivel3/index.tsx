import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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

interface INivel3 {
  nivel: Nivel;
  calificacion?: Calificacion;
}

const Nivel3: FunctionComponent<INivel3> = ({nivel, calificacion}) => {
  const {descripcionPractica} = nivel;
  useSocket();
  const {state, dispatch} = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const {data, movimiento} = state;

  const RESPUESTA_CORRECTA = {
    x: 184.78,
    y: 81.03,
    z: 126.62,
    psi: 2.34,
    phi: -0.16,
  };

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
    if (!data) return;

    const incorrecto =
      Math.abs(x - RESPUESTA_CORRECTA.x) > 0.02 ||
      Math.abs(y - RESPUESTA_CORRECTA.y) > 0.02 ||
      Math.abs(z - RESPUESTA_CORRECTA.z) > 0.02 ||
      Math.abs(psi - RESPUESTA_CORRECTA.psi) > 0.02 ||
      Math.abs(phi - RESPUESTA_CORRECTA.phi) > 0.02;

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
    if (x === 0 && y === 0 && z === 0 && psi === 0 && phi === 0) {
      // TODOS son 0 para solo validar que no se haya hecho nada, en realidad los valores si podrian ser 0
      setError('Por favor, introduzca todos los valores');
      return;
    }

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

  const [error, setError] = useState('');
  const [respuesta, setRespuesta] = useState({
    x: 0,
    y: 0,
    z: 0,
    psi: 0,
    phi: 0,
  });
  const {x, y, z, psi, phi} = respuesta;

  const setValor = (name: 'x' | 'y' | 'z' | 'psi' | 'phi', value: string) => {
    setRespuesta(e => ({
      ...e,
      [name]: Number(value),
    }));
  };

  return (
    <>
      <View style={s.textWrapper}>
        <Text style={s.text}>
          El objetivo de este ejercicio es calcular la posición y orientación
          del efector final (garra) (x,y,z,𝜓,𝜑) del brazo robótico dado un
          conjunto de ángulos de articulación. Debes aplicar las ecuaciones de
          la cinemática directa para determinar el vector de posición y
          orientación del efector final.
        </Text>

        <Text style={s.text}>
          <Text style={s.boldtext}>Contexto: </Text>
          La cinemática directa es un enfoque fundamental en robótica que nos
          permite deducir la ubicación del efector final de un robot (por
          ejemplo, una pinza o garra) basándonos en las posiciones angulares de
          las articulaciones del brazo robótico.
        </Text>

        <Text style={s.text}>
          <Text style={s.boldtext}>Posiciones Articulares: </Text>
          El conjunto de ángulos articulares (q1,q2,q3,q4,q5) dado es
          (60°,70°,60°,90°,60°). Te aconsejamos que para tener una guía visual,
          lleves el robot a esta posición, como lo hemos hecho en niveles
          anteriores.
        </Text>

        <Text style={s.text}>
          <Text style={s.boldtext}>Ecuaciones de Transformación: </Text>
          Utiliza las ecuaciones de transformación suministradas para determinar
          la posición del efector final en el espacio tridimensional y su
          orientación. Ten en cuenta que los valores de 𝜓 y 𝜑 se requieren en
          radianes.
        </Text>

        <Text style={s.titulo}>
          Elementos de la matriz de transformación homogénea en función de las
          articulaciones
        </Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: '100%',
              height: 250,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel3-3.png`)}
            resizeMode="contain"
          />
        </View>

        <Text style={s.titulo}>
          Valores 𝜓 y 𝜑 en función de los parámetros de la matriz de rotación
        </Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: 150,
              height: 70,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel3-1.png`)}
            resizeMode="contain"
          />
        </View>
        <Text style={s.titulo}>Leyenda</Text>

        <View style={s.imageWrapper}>
          <Image
            style={{
              width: 370,
              height: 250,
              marginBottom: 40,
            }}
            source={require(`../../../assets/nivel3-2.png`)}
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

        <Text style={s.titulo}>Coloque acá los valores del efector final</Text>
        <View
          style={{
            borderColor: error ? '#a62216' : '#00000000',
            borderRadius: 10,
            padding: 5,
            borderWidth: 2,
          }}>
          <View style={s.inputWrapper}>
            <Text style={s.descripcion}>X: </Text>
            <TextInput
              style={s.input}
              keyboardType="numeric"
              placeholderTextColor="#BDBDBD"
              placeholder="Coordenada X"
              onChangeText={e => setValor('x', e)}
            />
          </View>
          <View style={s.inputWrapper}>
            <Text style={s.descripcion}>Y: </Text>
            <TextInput
              style={s.input}
              keyboardType="numeric"
              placeholderTextColor="#BDBDBD"
              placeholder="Coordenada Y"
              onChangeText={e => setValor('y', e)}
            />
          </View>
          <View style={s.inputWrapper}>
            <Text style={s.descripcion}>Z: </Text>
            <TextInput
              style={s.input}
              keyboardType="numeric"
              placeholderTextColor="#BDBDBD"
              placeholder="Coordenada Z"
              onChangeText={e => setValor('z', e)}
            />
          </View>
          <View style={s.inputWrapper}>
            <Text style={s.descripcion}>𝜓: </Text>
            <TextInput
              style={s.input}
              keyboardType="numeric"
              placeholderTextColor="#BDBDBD"
              placeholder="Ángulo 𝜓"
              onChangeText={e => setValor('psi', e)}
            />
          </View>
          <View style={s.inputWrapper}>
            <Text style={s.descripcion}>ϕ: </Text>
            <TextInput
              style={s.input}
              keyboardType="numeric"
              placeholderTextColor="#BDBDBD"
              placeholder="Ángulo ϕ"
              onChangeText={e => setValor('phi', e)}
            />
          </View>
        </View>
        {error && <Text style={s.error}>{error}</Text>}
        <TouchableOpacity style={s.button2} onPress={handleSubmit}>
          <Text style={s.buttonText2}>Enviar respuesta</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </>
  );
};

export default Nivel3;
