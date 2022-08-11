import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const LoadingView = () => {
  return (
    <View style={styles.loading}>
      <Text style={styles.loadindStyles}>Carregando...</Text>
    </View>
  );
};

export default LoadingView;
