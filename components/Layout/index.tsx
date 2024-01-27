import React, {FunctionComponent, ReactNode} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import BarraInferior from '../BarraInferior';
import Header from '../Header';
import {IButton} from '../../types';
// import s from './styles';

interface ILayout {
  title: string;
  children: ReactNode;
  secondaryButton?: IButton;
}

const Layout: FunctionComponent<ILayout> = ({
  title,
  children,
  secondaryButton,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={title} secondaryButton={secondaryButton} />
      <View style={{backgroundColor: '#fafafa', flex: 1}}>{children}</View>
      <BarraInferior />
    </SafeAreaView>
  );
};

export default Layout;
