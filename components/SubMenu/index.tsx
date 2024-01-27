import React, {FunctionComponent} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import s from './styles';
import {ILink} from '../../types';

interface ISubMenu {
  title: string;
  links: ILink[];
}

const SubMenu: FunctionComponent<ISubMenu> = ({title, links}) => {
  const navigation = useNavigation<NavigationProp<ParamListBase, any>>();

  return (
    <ScrollView style={s.container}>
      {links.map(({title, route}, i) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(route)}
          style={s.link}
          key={`${title}-links-${route}-${i}`}>
          <Text style={s.linkText}>{title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SubMenu;
