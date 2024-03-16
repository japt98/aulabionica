import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Data} from '../../../context/types';
import s from './styles';

interface IStatus {
  vel: number;
  incrementVel?: () => void;
  decrementVel?: () => void;
  data: Data | null;
}

const Status: FunctionComponent<IStatus> = ({
  data,
  vel,
  incrementVel,
  decrementVel,
}) => {
  if (!data) return null;
  return (
    <View style={s.status}>
      <View style={s.fuerzaWrapper}>
        <Text style={s.fuerzaTitle}>Fuerza</Text>
        <Text style={s.fuerzaValue}>{data?.fuerza?.toFixed(0)}N</Text>
      </View>
      <View>
        <View style={s.inclWrapper}>
          <Text style={s.inclTitle}>Inclinación 1</Text>
          <Text style={s.inclValue}>
            {data?.pos_motor1 > 100
              ? (180 - data?.param_y_giro0)?.toFixed(0)
              : data?.param_y_giro0?.toFixed(0)}
            °
          </Text>
        </View>

        <View style={s.inclWrapper}>
          <Text style={s.inclTitle}>Inclinación 2</Text>
          <Text style={s.inclValue}>{data?.param_y_giro1?.toFixed(0)}°</Text>
        </View>
      </View>

      <View style={s.velWrapper}>
        <Text style={s.velTitle}>Velocidad</Text>

        <View style={s.velInner}>
          <View style={s.velocidad}>
            <Text style={s.fuerzaValue}>{vel}</Text>
          </View>
          {incrementVel && decrementVel && (
            <View style={s.velControls}>
              <TouchableOpacity
                style={s.velControl}
                onPress={incrementVel}
                disabled={vel === 9}>
                <Text style={s.velText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.velControl}
                onPress={decrementVel}
                disabled={vel === 1}>
                <Text style={s.velText}>-</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Status;
