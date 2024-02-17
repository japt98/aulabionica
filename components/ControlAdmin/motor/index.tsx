import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import Slider from 'react-native-a11y-slider';
import {Operacion} from '../../../context/types';
import s from './styles';

interface IMotor {
  index: number;
  posicion: number;
  operacion: Operacion;
  setOperacion: React.Dispatch<React.SetStateAction<Operacion>>;
}

const Motor: FunctionComponent<IMotor> = ({
  index,
  posicion,
  operacion,
  setOperacion,
}) => {
  const setPosicion = (pos: number) => {
    let newOperacion = operacion;
    newOperacion[index] = {...newOperacion[index], posicion: pos};
    setOperacion(newOperacion);
  };

  return (
    <View style={s.motor}>
      <View style={s.motorNumber}>
        <Text style={s.motorNumberText}>{index + 1}</Text>
      </View>
      <View>
        <Text style={s.title}>Pos. Actual</Text>
        <Text style={s.value}>{Math.round(posicion / 2).toFixed(0)}°</Text>
      </View>
      <Slider
        key={`MotorSlider-${index}`}
        min={0}
        max={90}
        values={[operacion[index].posicion / 2]}
        onChange={(e: number[]) => {
          console.log({e});
          setPosicion(e[0] * 2);
        }}
        markerColor="#5DB075"
        style={s.slider}
        labelStyle={s.sliderLabel}
        labelTextStyle={s.sliderLabelText}
      />
    </View>
  );
};

export default Motor;
