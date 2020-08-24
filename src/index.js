import 'react-native-gesture-handler';
import './config/statusBarConfig';
import React from 'react';
import {View} from 'react-native';
import MainTab from './routes';
import {NavigationContainer} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </View>
  );
}
