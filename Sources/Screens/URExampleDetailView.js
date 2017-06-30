import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';

export class URExampleDetailView extends React.Component {    
    render() {
        const paramsOfNav = this.props.navigation.state
        console.log('params is ' + paramsOfNav.image)
        return (
        <View style={styles.container}>
            <Text>여기는 디테일</Text>
            <Image style={styles.image} source={paramsOfNav.image} />
            <Text style={styles.text}></Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1
    },
    text: {
        flex: 1
    }
})