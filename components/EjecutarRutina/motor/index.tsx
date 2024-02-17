import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import s from './styles';

interface IMotor {
  index: number;
  posicion: number;
}

const Motor: FunctionComponent<IMotor> = ({index, posicion}) => {
  return (
    <View style={s.motor}>
      <View style={s.motorNumber}>
        <Text style={s.motorNumberText}>{index + 1}</Text>
      </View>
      <View>
        <Text style={s.title}>Posición</Text>
        <Text style={s.value}>{Math.round(posicion / 2).toFixed(0)}°</Text>
      </View>
    </View>
  );
};

export default Motor;
