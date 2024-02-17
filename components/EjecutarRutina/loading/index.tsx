import React, {FunctionComponent} from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import s from './styles';

interface ILoadingModal {
  visible: boolean;
}

const LoadingModal: FunctionComponent<ILoadingModal> = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={s.container}>
        <View style={s.wrapper}>
          <Text style={s.text}>Robot en Movimiento</Text>
          <ActivityIndicator size={50} color="#5DB075" />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
