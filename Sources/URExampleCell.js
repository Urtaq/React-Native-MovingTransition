import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';

export default class URExampleCell extends React.Component {
    render() {
        return (
            <View style={styles.container} onTouchEnd={this.onTouched}>
                <Image ref={(image) => { this.image = image}} style={styles.rowImg} source={this.props.img} onLoadEnd={this.onImageLoaded} />
                <Text style={styles.rowText}>{this.props.title}</Text>
            </View>
        )
    }

    onTouched = (target) => {
        console.log('onTouched')

        console.log(this.props.img)
    }

    onImageLoaded = () => {
        console.log('onImageLoaded')

        console.log('this.image.source:' + this.image.props.source.uri)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#ff0',
        alignItems: 'center',
        justifyContent: 'center',
  },
  rowImg: {
      flex: 1,
      height: '100%',
        alignItems: 'center',
      justifyContent: 'center',
  },
  rowText: {
      flex:2,
      backgroundColor: '#a0a'
  }
})