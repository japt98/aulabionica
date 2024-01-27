import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    width: 60,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5DB075',
  },
  title: {
    color: '#000',
    fontWeight: '600',
    fontSize: 26,
  },
});
