import React, {FunctionComponent, useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import s from './styles';
import {Rutina} from '../../../context/types';

interface IModalForm {
  rutina: Rutina | null;
  ejecutarRutinasNVeces: (n: number, rutina: Rutina) => void;
  cancelar: () => void;
}

const ModalForm: FunctionComponent<IModalForm> = ({
  rutina,
  ejecutarRutinasNVeces,
  cancelar,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    setError('');
    const number = parseInt(value, 10);
    if (!isNaN(number) && number >= 1 && number <= 100 && rutina) {
      ejecutarRutinasNVeces(number, rutina);
      return;
    }
    setError('Indique un entero (1-100');
  };

  return (
    <Modal
      style={s.modal}
      visible={Boolean(rutina)}
      transparent={true}
      animationType="fade">
      <View style={s.wrapper}>
        <View style={s.formWrapper}>
          <Text style={s.descripcion}>
            Indique cuántas veces se ejecutará la rutina:
          </Text>
          <TextInput
            style={s.input}
            placeholderTextColor="#BDBDBD"
            placeholder="Repeticiones de Rutina"
            value={value}
            onChangeText={e => setValue(e)}
            keyboardType="numeric"
          />
          {error && <Text style={s.error}>{error}</Text>}
          <TouchableOpacity style={s.button} onPress={submit}>
            <Text style={s.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.cancelButton} onPress={cancelar}>
            <Text style={s.cancelButtonText}>Atrás</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalForm;
