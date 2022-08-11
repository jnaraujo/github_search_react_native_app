import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#282c34',
  },

  safeBackground: {
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: '#0d1b2a',
    paddingHorizontal: 20,
    height: 150,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#e5e5e5',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    marginTop: 16,
    padding: 8,
    paddingHorizontal: 16,
    color: '#0d1b2a',
  },

  // user view

  userTouchable: {
    backgroundColor: '#212529',
    margin: 8,
    borderRadius: 8,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userName: {
    color: '#e9ecef',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  userButton: {
    borderRadius: 8,
    padding: 8,
    marginLeft: 'auto',
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
});

export default styles;
