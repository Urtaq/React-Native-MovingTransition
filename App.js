import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import * as Screens from './Sources/Screens';

const App = StackNavigator({
  Main: {
    screen: Screens.URExampleMainView
  },
  Detail: {
    screen: Screens.URExampleDetailView
  }
})

export default () => (
  <App
  />
)