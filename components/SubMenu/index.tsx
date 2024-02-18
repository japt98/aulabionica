import React, {FunctionComponent} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import s from './styles';
import {ILink} from '../../types';
import {ParamList} from '../../App';

interface ISubMenu {
  title: string;
  links: ILink[];
}

const SubMenu: FunctionComponent<ISubMenu> = ({title, links}) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  return (
    <ScrollView style={s.container}>
      {links.map(({title, route}, i) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(route as any)}
          style={s.link}
          key={`${title}-links-${route}-${i}`}>
          <Text style={s.linkText}>{title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SubMenu;
