import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {IConfig} from '../types/ConfigTypes';
import DefaultConfig from '../helpers/DefaultConfig';

import {getConfig, storeConfig} from '../storage/ConfigStorage';

// eslint-disable-next-line no-spaced-func
const ConfigContext = createContext<{
  config: IConfig | undefined;
  setConfig: (config: IConfig) => void;
}>({
  config: undefined,
  setConfig: ({}: IConfig) => {},
});

interface IConfigProviderProps {
  children: ReactNode;
}

const ConfigProvider = ({children}: IConfigProviderProps) => {
  const [config, setConfig] = useState<IConfig>();

  useEffect(() => {
    getConfig().then(data => {
      setConfig(data || DefaultConfig);
    });
  }, []);

  useEffect(() => {
    if (config) {
      storeConfig(config);
    }
  }, [config]);

  function changeConfig(value: IConfig) {
    setConfig(prev => {
      return {
        ...prev,
        ...value,
      };
    });
  }

  return (
    <ConfigContext.Provider value={{config, setConfig: changeConfig}}>
      {children}
    </ConfigContext.Provider>
  );
};

export {ConfigContext};

export default ConfigProvider;
