import React, {FunctionComponent} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IButton} from '../../types';
import s from './styles';

interface IHeader {
  title: string;
  secondaryButton?: IButton;
}

const Header: FunctionComponent<IHeader> = ({title, secondaryButton}) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  return (
    <View style={s.container}>
      <Pressable style={s.button} onPress={() => navigation.goBack()}>
        <Text style={s.buttonText}>{canGoBack ? 'Back' : ''}</Text>
      </Pressable>
      <Text style={s.title}>{title}</Text>
      <Pressable
        style={s.button}
        onPress={secondaryButton?.onPress}
        disabled={!secondaryButton}>
        <Text style={{...s.buttonText, textAlign: 'right'}}>
          {secondaryButton?.title || ''}
        </Text>
      </Pressable>
    </View>
  );
};

export default Header;
