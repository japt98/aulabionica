import React, {FunctionComponent, useContext, useState} from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useRoute,
  useNavigation,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import s from './styles';
import {GlobalContext} from '../../context/global';

const IconWithLabel: FunctionComponent<{
  icon: ImageSourcePropType;
  label: string;
}> = ({icon, label}) => {
  return (
    <View style={s.iconWithLabelContainer}>
      <Image source={icon} style={s.icon} resizeMode="contain" />
      <Text style={s.iconLabel}>{label}</Text>
    </View>
  );
};

const BarraInferior: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase, any>>();
  const route = useRoute();

  const isMenu = route.name === 'menu';
  const {state} = useContext(GlobalContext);
  const {conectado} = state;

  const handleConexion = () => {
    if (conectado) {
      // desconectar();
      // setConectado(false); // TODO: solo por ahora
    } else {
      navigation.navigate('menu-conexion');
      // setConectado(true); // TODO: solo por ahora
    }
  };

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => navigation.navigate('menu')}>
        <IconWithLabel
          icon={
            isMenu
              ? require(`../../assets/house-green.png`)
              : require(`../../assets/house.png`)
          }
          label="Menú"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleConexion} disabled={conectado}>
        <View style={s.centerIconContainer}>
          <View style={s.centerIconWrapper}>
            <Image
              style={s.centerIcon}
              source={
                conectado
                  ? require(`../../assets/circle-check.png`)
                  : require(`../../assets/circle-xmark.png`)
              }
              resizeMode="contain"
            />
          </View>

          <Text style={s.iconLabel}>
            {conectado ? 'Conectado' : 'Desconectado'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={parar}>
        <IconWithLabel
          icon={require('../../assets/triangle-exclamation.png')}
          label="Parada"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BarraInferior;

// TODO: Hacer q esto venga de la API de conexion
// function desconectar() {
//   Alert.alert(
//     'Confirmar desconexión', // Título
//     '¿Estás seguro de que quieres desconectar?', // Mensaje
//     [
//       {
//         text: 'Cancelar',
//         onPress: () => console.log('Cancelado'),
//         style: 'cancel',
//       },
//       {
//         text: 'Desconectar',
//         onPress: () => {
//           // TODO: define this
//           console.log('Desconectado');
//         },
//       },
//     ],
//     {cancelable: true}, // Esta opción evita que se cierre la alerta al tocar fuera de ella
//   );
// }

// TODO: Hacer q esto venga de la API de conexion
function parar() {
  Alert.alert(
    'Confirmar Parada de Emergencia', // Título
    '¿Estás seguro de que quieres detener el sistema?', // Mensaje
    [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancelado'),
        style: 'cancel',
      },
      {
        text: 'Parar',
        onPress: () => console.log('Parar'),
      },
    ],
    {cancelable: true}, // Esta opción evita que se cierre la alerta al tocar fuera de ella
  );
}
