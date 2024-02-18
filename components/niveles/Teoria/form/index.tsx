import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Pregunta} from '../..';
import s from './styles';

interface IPreguntaForm extends Pregunta {
  callback: (respuestaCorrecta: boolean) => void;
}

const PreguntaForm: FunctionComponent<IPreguntaForm> = ({
  pregunta,
  opciones,
  respuesta,
  callback,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');

  const handleSelection = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!opciones.includes(selectedOption)) {
      setError('Selección inválida');
      return;
    }
    const correcto =
      opciones.findIndex(e => e === selectedOption) === respuesta;
    callback(correcto);
  };

  useEffect(() => {
    if (selectedOption && error) {
      setError('');
    }
  }, [selectedOption]);

  return (
    <View style={s.container}>
      <Text style={s.question}>{pregunta}</Text>
      <View
        style={{
          borderColor: error ? '#a62216' : '#00000000',
          borderRadius: 10,
          padding: 5,
          borderWidth: 2,
        }}>
        {opciones.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              s.optionButton,
              {
                borderWidth: option === selectedOption ? 2 : 0,
              },
            ]}
            onPress={() => handleSelection(option)}>
            <Text style={s.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={s.error}>{error}</Text>}

      <TouchableOpacity style={s.submitButton} onPress={handleSubmit}>
        <Text style={s.submitButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreguntaForm;
