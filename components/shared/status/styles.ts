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
});
