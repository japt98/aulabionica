import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: '#5DB075',
    padding: 16,
    marginTop: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  button2: {
    borderRadius: 100,
    backgroundColor: 'white',
    borderColor: '#5DB075',
    borderWidth: 2,
    padding: 16,
    marginTop: 15,
    marginBottom: 50,
  },
  buttonText2: {
    textAlign: 'center',
    color: '#5DB075',
    fontWeight: '500',
  },
  titulo: {
    color: '#000',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 25,
  },
  textWrapper: {
    paddingHorizontal: 25,
  },
  text: {
    marginBottom: 10,
    color: '#000',
    fontSize: 14,
  },
  boldtext: {
    fontWeight: '800',
  },
  pregunta: {
    marginBottom: 40,
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  descripcion: {
    color: '#444',
    fontSize: 17,
    marginBottom: 10,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 7,
  },
  input: {
    borderRadius: 10,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
    fontSize: 14,
    borderWidth: 2,
    padding: 12,
  },
  error: {
    color: '#a62216',
    marginTop: 5,
    marginLeft: 5,
  },
});
