/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
import {Text} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => <App />);
