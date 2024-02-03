import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import s from './styles';
import Layout from '../Layout';
import {Coordenada, coordenadas, getRandomCoordinateValue} from './coordenadas';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILoginProfesor {
  navigation: NavigationProp<ParamListBase, 'submenu-profesor'>;
}

const LoginProfesor: FunctionComponent<ILoginProfesor> = ({navigation}) => {
  const [coordenadaIngresada, setCoordenadaIngresada] = useState('');
  const [show, setShow] = useState(false);
  const [coordenada, setCoordenada] = useState<Coordenada>({
    col: 'A',
    row: 0,
  });
  const {col, row} = coordenada;

  useEffect(() => {
    setCoordenada(getRandomCoordinateValue());
  }, []);

  const verificarCoordenada = async () => {
    const expected = coordenadas[col][row];
    if (expected === coordenadaIngresada) {
      await AsyncStorage.setItem('session_profesor', `${new Date().getTime()}`);
      Alert.alert('Acceso concedido', 'Bienvenido al panel de administración.');
      navigation.navigate('submenu-profesor');
    } else {
      Alert.alert('Acceso denegado', 'La clave ingresada es incorrecta.');
    }
  };
  return (
    <Layout title="Profesor">
      <View style={s.imageWrapper}>
        <Image
          style={s.image}
          source={require(`../../assets/user-graduate.png`)}
          resizeMode="contain"
        />
        <Text style={s.imageTitle}>Iniciar Sesión</Text>
      </View>
      <View style={s.formWrapper}>
        <Text style={s.descripcion}>
          Indique la siguiente coordenada en su tarjeta de coordenadas:
        </Text>
        <Text style={s.coordenadas}>
          {col}
          {row}
        </Text>
        <View style={s.inputWrapper}>
          <TextInput
            style={s.input}
            keyboardType="numeric"
            placeholderTextColor="#BDBDBD"
            placeholder="Ingrese la coordenada"
            value={coordenadaIngresada}
            onChangeText={setCoordenadaIngresada}
            secureTextEntry={!show}
          />
          <TouchableOpacity
            style={s.showButton}
            onPress={() => setShow(e => !e)}>
            <Text style={s.showButtonText}>{show ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={s.button} onPress={verificarCoordenada}>
          <Text style={s.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default LoginProfesor;
