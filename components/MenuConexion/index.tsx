import React, {FunctionComponent} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import useSocket from '../../hooks/useSocket';

interface IMenuConexion {
  navigation: NavigationProp<ParamListBase, 'menu-conexion'>;
}

const MenuConexion: FunctionComponent<IMenuConexion> = ({navigation}) => {
  const {conectar} = useSocket();
  const handlePress = () => {
    // TODO: Enviar mensaje y establecer conexion
    conectar();
    navigation.navigate('menu');
  };

  return (
    <View style={s.container}>
      <View style={s.imageWrapper}>
        <Image
          style={s.image}
          source={require('../../aulabionica-high-resolution-logo.png')}
        />
      </View>
      <View style={s.card}>
        <Text style={s.titulo}>Conéctate al dispositivo</Text>
        <Text style={s.texto}>
          1. Inicia el Robot y espera que la luz de conexión encienda.
        </Text>
        <Text style={s.texto}>
          2. Conéctate a la red WiFi interna del Robot y asegúrate de que tu
          teléfono no se intente desconectar. No tendrás conexión a Internet por
          medio de esta red.
        </Text>
        <Text style={s.texto}>
          3. Una vez conectado presiona el siguiente botón para empezar el
          enlace. Si alguien ya estableció la conexión no podrás enlazarte.
        </Text>
        <TouchableOpacity style={s.button} onPress={handlePress}>
          <Text style={s.buttonText}>Empezar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuConexion;
