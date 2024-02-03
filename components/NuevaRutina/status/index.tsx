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
        <Text style={s.fuerzaValue}>{data?.fuerza?.toFixed(1)}N</Text>
      </View>

      <View style={s.accWrapper}>
        <Text style={s.accTitle}>Aceleración</Text>
        <View>
          <View style={s.acc}>
            <View style={s.accValue}>
              <Text style={s.accLabel}>x </Text>
              <Text style={s.accValueItem}>
                {data?.param_x_giro0.toFixed(1)}g
              </Text>
            </View>
            <View style={s.accValue}>
              <Text style={s.accLabel}>y </Text>
              <Text style={s.accValueItem}>
                {data?.param_y_giro0.toFixed(1)}g
              </Text>
            </View>
            <View style={s.accValue}>
              <Text style={s.accLabel}>z </Text>
              <Text style={s.accValueItem}>
                {data?.param_z_giro0.toFixed(1)}g
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={s.acc}>
            <View style={s.accValue}>
              <Text style={s.accLabel}>x </Text>
              <Text style={s.accValueItem}>
                {data?.param_x_giro1.toFixed(1)}g
              </Text>
            </View>
            <View style={s.accValue}>
              <Text style={s.accLabel}>y </Text>
              <Text style={s.accValueItem}>
                {data?.param_y_giro1.toFixed(1)}g
              </Text>
            </View>
            <View style={s.accValue}>
              <Text style={s.accLabel}>z </Text>
              <Text style={s.accValueItem}>
                {data?.param_z_giro1.toFixed(1)}g
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Status;
