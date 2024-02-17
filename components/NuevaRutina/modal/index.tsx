import React, {FunctionComponent, useContext, useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import s from './styles';
import {GlobalContext} from '../../../context/global';

interface IModalForm {
  defaultName: string;
  visible: boolean;
  guardar: (name: string) => void;
  cancelar: () => void;
}

const ModalForm: FunctionComponent<IModalForm> = ({
  defaultName,
  visible,
  guardar,
  cancelar,
}) => {
  const [name, setName] = useState(defaultName);
  const [error, setError] = useState('');
  const {state} = useContext(GlobalContext);
  const {rutinas} = state;

  const guardarRutinaConNombre = () => {
    if (!name.trim()) {
      setError('Indique un nombre valido para la rutina');
      return;
    }
    if (rutinas.find(e => e.nombre === name)) {
      setError('Ya existe una rutina con ese nombre');
    }
    guardar(name);
  };

  return (
    <Modal
      style={s.modal}
      visible={visible}
      transparent={true}
      animationType="fade">
      <View style={s.wrapper}>
        <View style={s.formWrapper}>
          <Text style={s.descripcion}>Guardar como:</Text>
          <TextInput
            style={s.input}
            placeholderTextColor="#BDBDBD"
            placeholder="Indique el nombre de la rutina"
            value={name}
            onChangeText={setName}
          />
          {error && <Text style={s.error}>{error}</Text>}
          <TouchableOpacity style={s.button} onPress={guardarRutinaConNombre}>
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
