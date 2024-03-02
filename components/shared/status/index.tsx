import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {Data} from '../../../context/types';
import s from './styles';

interface IStatus {
  data: Data | null;
}

const Status: FunctionComponent<IStatus> = ({data}) => {
  if (!data) return null;
  return (
    <View style={s.status}>
      <View style={s.fuerzaWrapper}>
        <Text style={s.fuerzaTitle}>Fuerza</Text>
        <Text style={s.fuerzaValue}>{data?.fuerza?.toFixed(0)}N</Text>
      </View>

      <View style={s.fuerzaWrapper}>
        <Text style={s.fuerzaTitle}>Inclinación 1</Text>
        <Text style={s.fuerzaValue}>
          {data?.pos_motor1 > 100
            ? (180 - data?.param_y_giro0)?.toFixed(0)
            : data?.param_y_giro0?.toFixed(0)}
          °
        </Text>
      </View>

      <View style={s.fuerzaWrapper}>
        <Text style={s.fuerzaTitle}>Inclinación 2</Text>
        <Text style={s.fuerzaValue}>{data?.param_y_giro1?.toFixed(0)}°</Text>
      </View>
    </View>
  );
};

export default Status;
