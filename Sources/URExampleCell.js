import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';

export default class URExampleCell extends React.Component {
    constructor() {
        super()
    }
    render() {
        console.log(JSON.stringify('URExampleCell\'props is' + JSON.stringify(this.props)))
        return (
            <View style={styles.container} onTouchStart={this.onTouched}>
                <Image ref={(image) => { this.image = image}} style={styles.rowImg} source={this.props.img} onLoadEnd={this.onImageLoaded} />
                <Text style={styles.rowText}>{this.props.title}</Text>
                {this.addImages(2)}
            </View>
        )
    }

    addImages = (count) => {
        var images = []
        for (i=0;i<count;i++) {
            images.push(
                <View key={i} width='100%' height='100%'>
            <Image style={styles.rowSubImg} source={this.props.rowImg} />
            <Text style={styles.rowSubText}>{i}</Text>
                </View>
            )
        }

        return (
        <View style={styles.rowImg2}>
            { images }
        </View>)
    }

    onTouched = (target) => {
        console.log('onTouched')

        console.log(this.props)

        this.props.onPress(this.image.props.source)
    }

    onImageLoaded = () => {
        console.log('onImageLoaded')

        console.log('this.image.source:' + this.image.props.source)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        // backgroundColor: '#ff0',
        alignItems: 'center',
        justifyContent: 'center',
  },
  rowImg: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  rowImg2: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#a0a',
      borderWidth: 1,
      borderColor: '#fff'
  },
  rowSubImg: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#a0a',
      borderWidth: 1,
      borderColor: '#fff'
  },
  rowText: {
      flex:2,
    //   backgroundColor: '#a0a'
  },
  rowSubText: {
      flex:2,
      backgroundColor: '#f0f'
  }
})