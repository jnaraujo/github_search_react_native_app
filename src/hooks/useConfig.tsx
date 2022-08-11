import {useContext} from 'react';
import {ConfigContext} from '../contexts/ConfigContext';

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within an ConfigProvider');
  }
  return context;
}
