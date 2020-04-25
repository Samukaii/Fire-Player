import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faMusic,
  faList,
  faUser,
  faDotCircle,
  faCog,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import yourMusics from '../layouts/YourMusics';
import listMusics from '../layouts/Search';
import musicDetails from '../layouts/Search/musicDetails';
import playlists from '../layouts/Playlists';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listMusics"
        component={listMusics}
        options={{
          headerTitle: false,
          headerStyle: {backgroundColor: '#223'},
          header: () => {
            const stylesHeader = StyleSheet.create({
              settings: {
                margin: 20,
              },
              help: {
                margin: 20,
              },
            });
            return (
              <View
                style={{backgroundColor: '#223', flexDirection: 'row-reverse'}}>
                <FontAwesomeIcon
                  icon={faQuestion}
                  color="#ddd"
                  size={20}
                  style={stylesHeader.settings}
                />
                <FontAwesomeIcon
                  icon={faCog}
                  color="#ddd"
                  size={20}
                  style={stylesHeader.help}
                />
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="details"
        component={musicDetails}
        options={{
          headerTitle: 'Detalhes',
          headerStyle: {backgroundColor: '#223'},
          headerTintColor: '#ddd',
        }}
      />
    </Stack.Navigator>
  );
}

export default function MainTab() {
  return (
    <View style={{flex: 1, backgroundColor: '#223'}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            route.name === 'Search'
              ? (iconName = faSearch)
              : route.name === 'Offline'
              ? (iconName = faMusic)
              : route.name === 'Playlists'
              ? (iconName = faList)
              : route.name === 'Albums'
              ? (iconName = faDotCircle)
              : route.name === 'Artists'
              ? (iconName = faUser)
              : (iconName = faQuestion);

            return (
              <FontAwesomeIcon icon={iconName} color={color} size={size} />
            );
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: '#223',
          inactiveBackgroundColor: '#112',
          labelStyle: {fontSize: 14, marginBottom: 3},
          tabStyle: {paddingTop: 9},
          style: {
            height: '9%',
            borderTopColor: '#546',
            borderTopWidth: 1.5,
          },
          activeTintColor: '#ddd',
          inactiveTintColor: '#555',
        }}>
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="Offline" component={yourMusics} />
        <Tab.Screen name="Playlists" component={playlists} />
        <Tab.Screen name="Albums" component={playlists} />
        <Tab.Screen name="Artists" component={playlists} />
      </Tab.Navigator>
    </View>
  );
}
