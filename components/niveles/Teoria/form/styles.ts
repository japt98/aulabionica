import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
  },
  question: {
    color: '#444',
    fontSize: 15,
    marginBottom: 20,
    fontWeight: '600',
  },
  error: {
    color: '#a62216',
    marginTop: 5,
    marginLeft: 5,
  },
  optionButton: {
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderColor: '#5DB075',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    borderRadius: 100,
    backgroundColor: '#5DB075',
    padding: 16,
    marginTop: 25,
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
});
