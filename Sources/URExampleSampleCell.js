import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';

export default class URExampleSampleCell extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width:50, height:'100%'}} source={require('../Resources/20160509_044404.jpg')} />
                <Text width='100' height='100%'>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
  }
})