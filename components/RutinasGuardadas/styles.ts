import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  descripcion: {
    color: '#777',
    marginHorizontal: 20,
  },
  rutinasWrapper: {
    padding: 20,
  },
  rutinaContainer: {
    paddingVertical: 2,
    width: '100%',
    overflow: 'visible',
    display: 'flex',
    paddingHorizontal: 2,
  },
  rutinaWrapper: {
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
  },
  rutina: {
    width: 55,
    height: 55,
  },
  nombre: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
  },
  ops: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    gap: 5,
  },
  op: {
    borderRadius: 15,
    width: 13,
    height: 13,
    backgroundColor: '#5DB075',
    opacity: 1,
  },
  lenght: {
    color: '#000',
    fontWeight: '800',
    fontSize: 13,
  },
  info: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
  },
});
