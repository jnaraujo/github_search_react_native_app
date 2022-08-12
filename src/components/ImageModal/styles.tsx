import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    zIndex: 2,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    width: 350,
    height: 350,
    maxHeight: windowWidth * 0.85,
    maxWidth: windowWidth * 0.85,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonClose: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 50,
    width: 24,
    height: 24,

    elevation: 2,

    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1b1b1b',
  },
  buttonDownload: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
});

export default styles;
