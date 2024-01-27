import {GestureResponderEvent} from 'react-native';

interface IButton {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

interface ILink {
  title: string;
  route: string;
}

export type {IButton, ILink};
