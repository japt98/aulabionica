import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 10,
    lineHeight: 11,
    textAlign: 'left',
    color: '#777',
    marginBottom: -7,
    marginLeft: 2,
  },
  value: {
    fontSize: 30,
    textAlign: 'center',
    color: '#000',
  },
  motor: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
    padding: 10,
    margin: 10,
    marginVertical: 0,
  },
  motorNumber: {
    color: '#fff',
    backgroundColor: '#5DB075',
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  motorNumberText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '700',
  },
  slider: {
    width: 200,
  },
  sliderLabel: {
    backgroundColor: '#5DB075',
    borderRadius: 15,
  },
  sliderLabelText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 10,
  },
});
