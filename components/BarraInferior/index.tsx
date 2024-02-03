import React, {FunctionComponent, useContext, useEffect} from 'react';
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
  const {conectado, error} = state;

  const handleConexion = () => {
    if (conectado) {
      // desconectar();
      // setConectado(false); // TODO: solo por ahora
    } else {
      navigation.navigate('menu-conexion');
      // setConectado(true); // TODO: solo por ahora
    }
  };

  const showError = () => {
    if (error) {
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'Entendido',
            style: 'default',
          },
        ],
        {cancelable: false},
      );
    }
  };

  useEffect(() => {
    showError();
  }, [error]);

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

      <TouchableOpacity onPress={showError} disabled={!error}>
        <IconWithLabel
          icon={
            error
              ? require('../../assets/triangle-exclamation-solid.png')
              : require('../../assets/triangle-exclamation.png')
          }
          label={error ? 'Error' : 'Sin errores'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BarraInferior;
