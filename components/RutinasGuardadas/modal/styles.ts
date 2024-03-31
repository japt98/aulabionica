import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modal: {},
  descripcion: {
    color: '#777',
    marginBottom: 10,
  },
  error: {
    color: '#a62216',
    marginBottom: 10,
  },
  coordenadas: {
    color: '#777',
    marginBottom: 10,
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 30,
  },
  input: {
    borderRadius: 10,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    color: '#444',
    fontSize: 16,
    borderWidth: 2,
    padding: 16,
  },

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
  formWrapper: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 17,
  },

  inputWrapper: {
    position: 'relative',
  },
  showButton: {
    position: 'absolute',
    height: '100%',
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  showButtonText: {
    color: '#5DB075',
    fontSize: 14,
    lineHeight: 14,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#444444bb',
  },
  cancelButton: {
    padding: 16,
  },
  cancelButtonText: {
    color: '#5DB075',
    textAlign: 'center',
    fontWeight: '500',
  },
});
