import 'react-native-gesture-handler';
import './config/statusBarConfig';
import React from 'react';
import {View, Text} from 'react-native';
import MainTab from './routes';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Text>oiii</Text>
      {/*<NavigationContainer>
        <MainTab />
      </NavigationContainer>*/}
    </View>
  );
}
