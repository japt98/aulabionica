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
    marginHorizontal: 20,
  },
});
