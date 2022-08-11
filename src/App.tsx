import React from 'react';

import {StatusBar} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ConfigProvider from './contexts/ConfigContext';

import Routes from './navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.darker} barStyle={'light-content'} />
      <ConfigProvider>
        <Routes />
      </ConfigProvider>
    </SafeAreaProvider>
  );
};

export default App;
