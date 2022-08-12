import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#282c34',
  },

  // noProfile
  noProfileView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProfileTextView: {
    maxWidth: '80%',
  },
  noProfileText: {
    color: '#e5e5e5',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22 * 1.3,
  },
  noProfileInput: {
    backgroundColor: '#e9ecef',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 32,
    color: '#495057',
    fontSize: 16,
    height: 8 * 5,
    width: '80%',
  },
  noProfileButton: {
    backgroundColor: '#8338ec',
    height: 8 * 5,
    width: '80%',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProfileButtonText: {
    color: '#e9ecef',
    fontWeight: 'bold',
    fontSize: 16,
  },

  list: {
    backgroundColor: 'transparent',
  },
});

export default styles;
