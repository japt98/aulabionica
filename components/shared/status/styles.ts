import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  status: {
    borderColor: '#e8e8e8',
    padding: 5,
    borderWidth: 2,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  fuerzaWrapper: {
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  fuerzaTitle: {
    fontSize: 10,
    lineHeight: 11,
    textAlign: 'left',
    color: '#777',
    marginBottom: -7,
    marginLeft: 2,
  },
  fuerzaValue: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  },
  accTitle: {
    fontSize: 10,
    lineHeight: 11,
    textAlign: 'left',
    color: '#777',
    marginBottom: 2,
    marginLeft: 2,
  },
  accValue: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  acc: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  accLabel: {
    color: '#5DB075',
    fontWeight: '500',
  },
  accValueItem: {
    color: '#000',
    fontSize: 14,
  },
  accWrapper: {
    display: 'flex',
  },
  inclWrapper: {
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  inclTitle: {
    fontSize: 8,
    lineHeight: 9,
    textAlign: 'left',
    color: '#777',
    marginBottom: -5,
    marginLeft: 2,
  },
  inclValue: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  velWrapper: {
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  velInner: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  velTitle: {
    fontSize: 10,
    lineHeight: 11,
    textAlign: 'left',
    color: '#777',
    marginBottom: -7,
    marginLeft: 2,
  },
  velValue: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  },
  velocidad: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  velControl: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e8e8e8',
    margin: 5,
  },
  velText: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  velControls: {
    position: 'absolute',
    right: -42,
    top: -20,
  },
});
