import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
  },
  motoresTitle: {
    color: '#000',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 0,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#5DB075',
    padding: 16,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  ops: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
  },
  op: {
    borderRadius: 15,
    width: 20,
    height: 20,
    backgroundColor: '#5DB075',
    opacity: 1,
  },
  opActive: {
    borderRadius: 15,
    width: 20,
    height: 20,
    backgroundColor: '#5DB075',
    opacity: 0.5,
  },
  progresoTexto: {
    fontSize: 10,
    lineHeight: 11,
    textAlign: 'left',
    color: '#777',
    marginBottom: 10,
    marginLeft: 2,
    marginTop: 10,
  },
});
