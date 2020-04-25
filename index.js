if (__DEV__) {
  import('./src/debug/ReactotronConfig');
}
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
import React from 'react';
import {name as appName} from './app.json';
import reactotron from 'reactotron-react-native';

AppRegistry.registerComponent(appName, () => App);
