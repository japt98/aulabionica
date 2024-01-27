import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageTitle: {
    color: '#000',
    marginTop: 20,
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  descripcion: {
    color: '#777',
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
    color: '#BDBDBD',
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
});
