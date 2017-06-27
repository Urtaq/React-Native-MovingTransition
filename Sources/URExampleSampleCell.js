import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';

export default class URExampleSampleCell extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.title}</Text>
                <Image source={require('./Resources/20160509_044404.jpg')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
  }
})