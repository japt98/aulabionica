import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  text: {
    color: '#444',
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  wrapper: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 17,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44444488',
  },
});
