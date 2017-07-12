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
},
{
  onTransitionEnd: () => {
    console.log("onTransitionEnd")
  }
})

export default () => (
  <App onNavigationStateChange = {(prevState, newState, action) => {
  console.log("onNavigationStateChange")
  console.log(prevState)
  console.log(newState)
  console.log(action)

  if ("routes"in newState) {
    console.log("newState.hasOwnProperty('routes')")
    console.log(newState.routes)
    if (newState.routes.length >= 2 && "params" in newState.routes[1]) {
      const {params} = newState.routes[1]
      if (params["finishAction"] != undefined) {
        params.finishAction()
      }
    }
  } 
}}
  />
)