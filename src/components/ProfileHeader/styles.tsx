import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
});

export default styles;
