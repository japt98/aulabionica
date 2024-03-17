import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {Calificacion, MIN_CALIFICACION_APROBADA, Nivel} from '..';
import s from './styles';
import LoadingModal from '../../ControlAdmin/loading';
import useSocket from '../../../hooks/useSocket';
import {GlobalContext} from '../../../context/global';
import {Movimiento, Operacion} from '../../../context/types';
import Status from '../../shared/status';
import Motor from '../../ControlAdmin/motor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../../App';
import {ILink} from '../../../types';
import SubMenu from '../../SubMenu';

interface INivel5 {
  nivel: Nivel;
  calificacion?: Calificacion;
}

const Nivel5: FunctionComponent<INivel5> = ({nivel, calificacion}) => {
  const links: ILink[] = [
    {
      route: 'nueva-rutina',
      title: 'Nueva Rutina',
    },
    {
      route: 'rutinas-guardadas',
      title: 'Rutinas Guardadas',
    },
  ];
  return (
    <>
      <View style={s.textWrapper}>
        <Text style={s.text}>
          ¡Felicidades por haber llegado al último nivel de los ejercicios! Tu
          dedicación y esfuerzo han demostrado que posees una comprensión sólida
          de la robótica y las habilidades necesarias para manejar complejas
          tareas de control.
        </Text>
        <Text style={s.text}>
          Al adentrarte en el menú de rutinas, tendrás la libertad de crear y
          ejecutar secuencias de movimientos que tú mismo diseñes y guardarlas
          para uso futuro. Esta es tu oportunidad de experimentar con prácticas
          más avanzadas, donde puedes programar al robot para que ejecute
          cualquier conjunto de movimientos que podrían ser requeridos en
          entornos reales o desafíos planteados por tus profesores.
        </Text>
        <Text style={s.text}>
          Te animamos a seguir aprendiendo, explorando y empujando los límites
          de lo que puedes lograr con tu robot. ¡Sigue adelante, el campo de la
          robótica está esperando por tus futuras contribuciones!
        </Text>
        {/* <TouchableOpacity style={s.button} onPress={() => {}}>
        <Text style={s.buttonText}>Iniciar</Text>
      </TouchableOpacity> */}
      </View>
      <SubMenu links={links} title="Nivel 5" />
      <Text style={s.text2}>
        Selecciona una de las opciones listadas arriba.
      </Text>
    </>
  );
};

export default Nivel5;
