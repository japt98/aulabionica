import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fafafa',
    // width: '100%',
    borderTopColor: '#BDC5CD',
    borderTopWidth: 0.7,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconWithLabelContainer: {
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 25,
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 10,
    textAlign: 'center',
    color: '#777',
  },
  centerIconContainer: {
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -35,
  },
  centerIconWrapper: {
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    elevation: 17,
    marginBottom: 5,
    shadowColor: '#000',
  },
  centerIcon: {
    width: 55,
    height: 55,
  },
});
