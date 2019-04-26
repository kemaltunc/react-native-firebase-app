import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, YellowBox } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';


import StartScreen from './src/Components/StartScreen';
import LoginScreen from './src/Components/LoginScreen';
import SignupScreen from './src/Components/SignupScreen';
import MainScreen from './src/Components/MainScreen';
import CreatePostScreen from './src/Components/CreatePostScreen';

import HomeTab from './src/Components/BottomMenuTabs/HomeTab';
import SearchTab from './src/Components/BottomMenuTabs/SearchTab';
import MessageTab from './src/Components/BottomMenuTabs/MessageTab';
import AccountTab from './src/Components/BottomMenuTabs/AccountTab';
import MoreTab from './src/Components/BottomMenuTabs/MoreTab';


YellowBox.ignoreWarnings(['Setting a timer']);
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2980b9"

        />
        <Navigator />
      </View>
    );
  }
}

const Tabs = createBottomTabNavigator({
  homeTasb: HomeTab,
  searchTab: SearchTab,
  messageTab: MessageTab,
  accountTab: AccountTab,
  moreTab: MoreTab
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: '#2980b1',
      inactiveTintColor: '#9e9e9e',
      showLabel: false,
      showIcon: true,

      style: {
        backgroundColor: '#fff',
        borderTopColor: '#f5f5f5'

      },

    },
  })
const AppTabNavigator = createMaterialTopTabNavigator({
  homeTasb: HomeTab,
  searchTab: SearchTab,
  messageTab: MessageTab,
  accountTab: AccountTab,
  moreTab: MoreTab
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: '#2980b1',
      inactiveTintColor: '#9e9e9e',
      showLabel: false,
      showIcon: true,

      style: {
        backgroundColor: '#fff',
        borderTopColor: '#f5f5f5'

      },

    },
  })


const MainStack = createStackNavigator({
  startScreen: StartScreen,
  signupScreen: SignupScreen,
  loginScreen: LoginScreen,
  main: {
    screen: Tabs,
    navigationOptions: {
      header: null,

    }

  },
  createPostScreen: CreatePostScreen,
  deneme: AppTabNavigator,

})
const Navigator = createAppContainer(MainStack);

const prevGetStateForAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
  // Do not allow to go back from Home
  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'loginScreen') {
    return null;
  }
  else if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'main') {
    return null;
  }

  return prevGetStateForAction(action, state);
};