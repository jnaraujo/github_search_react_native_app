import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // REPOS
  list: {
    backgroundColor: 'transparent',
  },
  repo: {
    backgroundColor: '#e9ecef',
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  repoTitle: {
    color: '#212529',
    fontWeight: 'bold',
    fontSize: 20,
    maxWidth: '80%',
    lineHeight: 16 * 1.3,
  },
  repoDescription: {
    color: 'gray',
    fontSize: 16,
    marginVertical: 12,
    lineHeight: 16 * 1.3,
  },

  repoHeaderStarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoHeaderStarCount: {
    color: '#722ed2',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
    lineHeight: 16 * 1.3,
  },

  repoButton: {
    backgroundColor: '#8338ec',
    padding: 8,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noRepos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    textAlign: 'center',
    color: '#495057',
    fontSize: 16,
  },
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

  // loading

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  textLoading: {
    color: '#e5e5e5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingAnimation: {
    transform: [
      {
        scaleX: -1, //horizontally
      },
    ],
  },
});

export default styles;
