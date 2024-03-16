import React, {FunctionComponent} from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import s from './styles';
import Layout from '../Layout';
import niveles from '../niveles';
import Nivel from './nivel';

const SubmenuNivelesProfesor: FunctionComponent = () => {
  return (
    <Layout title="Niveles">
      <View style={s.imageWrapper}>
        <Image
          style={s.image}
          source={require(`../../assets/user-graduate.png`)}
          resizeMode="contain"
        />
        <Text style={s.imageTitle}>Niveles Disponibles</Text>
      </View>
      <Text style={s.descripcion}>
        Seleccione un nivel para obtener información
      </Text>
      <ScrollView style={s.niveles}>
        {niveles.map(nivel => (
          <Nivel {...nivel} key={`nivel${nivel.index}`} />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default SubmenuNivelesProfesor;
