"use strict";

import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';

export class URExampleDetailView extends React.Component {  
    static navigationOptions = ({navigation}) => ({
        title: `Title : ${navigation.state.params.data.title}`,
    })

    componentDidMount() {
        console.log('componentDidMount')
    }

    render() {
        const { params } = this.props.navigation.state
        console.log('URExampleDetailView')
        console.log(this.props.navigation.state.params)
        console.log(params)
        return (
        <View style={styles.container}>
            <Text>여기는 디테일</Text>
            <Image style={styles.image} source={params.data.img} resizeMode="contain" />
            <Text style={styles.text}>여기는 밑</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        height: null,
        width: null,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1
    }
})