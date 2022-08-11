import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  header: {
    backgroundColor: '#0d1b2a',
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textInfoView: {
    // marginLeft: 16,
    width: '60%',
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    color: '#e5e5e5',
    fontSize: 24,
    fontWeight: 'bold',
  },
  editIcon: {},
  bio: {
    color: '#adb5bd',
    fontSize: 16,
    marginTop: 4,
    maxWidth: '100%',
  },
  userFollow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  followNumber: {
    color: '#e9ecef',
    fontSize: 16,
    marginRight: 16,
  },
  followBold: {
    fontWeight: 'bold',
  },

  // empty
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: 'gray',
    fontSize: 18,
    marginVertical: 12,
    lineHeight: 18 * 1.5,
    textAlign: 'center',
    maxWidth: '80%',
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
