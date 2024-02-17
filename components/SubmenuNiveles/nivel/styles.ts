import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 2,
    width: '100%',
    overflow: 'visible',
    display: 'flex',
    paddingHorizontal: 2,
    height: 120,
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 5,
    shadowColor: '#000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    height: 100,
  },
  status: {
    width: '50%',
    height: '100%',
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  titulo: {
    color: '#000',
    fontSize: 13,
    lineHeight: 15,
    marginBottom: 5,
    fontWeight: '700',
  },
  descripcion: {
    fontSize: 10,
    lineHeight: 13,
    color: '#777',
  },
  textWrapper: {
    width: '50%',
  },
  progressCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  progressWrapper: {
    backgroundColor: '#eee',
    borderRadius: 20,
    width: 90,
    height: 20,
    overflow: 'hidden',
  },
  descripcionProg: {
    fontSize: 10,
    textAlign: 'right',
    lineHeight: 13,
    color: '#777',
    width: 42,
  },
  image: {
    width: 50,
    height: 50,
  },
  progress: {
    height: '100%',
  },
  completado: {
    zIndex: 1,
    width: 25,
    height: 25,
    position: 'absolute',
    right: -2,
    bottom: -7,
  },
});
