import React, {FunctionComponent} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Nivel as INivel} from '../../niveles';
import {ParamList} from '../../../App';
import s from './styles';

const Nivel: FunctionComponent<INivel> = ({...nivel}) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const {titulo, descripcion} = nivel;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('vista-profesor', {nivel})}
      style={s.container}>
      <View style={s.wrapper}>
        <View style={s.index}>
          <Text style={s.indexText}>{nivel.index + 1}</Text>
        </View>
        <View style={s.textWrapper}>
          <Text style={s.titulo}>{titulo}</Text>
          <Text style={s.descripcion}>{descripcion}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Nivel;
