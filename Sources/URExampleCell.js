import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    ListView, 
    Image,
    TouchableOpacity
} from 'react-native';

export default class URExampleCell extends React.Component {
    constructor() {
        super()

        this.state = {
            isTouchMoved: false
        }
    }
    render() {
        console.log(JSON.stringify('URExampleCell\'props is' + JSON.stringify(this.props)))
        return (
            <TouchableOpacity style={styles.container} onPress={this.onTouched} onTouchMove={this.onTouchMoved} onTouchEnd={this.onTouched}>
                <Image ref={(image) => { this.image = image}} style={styles.rowImg} source={this.props.img} onLoadEnd={this.onImageLoaded} />
                <Text style={styles.rowText}>{this.props.title}</Text>
                {this.addImages(2)}
            </TouchableOpacity>
        )
    }

    addImages = (count) => {
        var images = []
        for (i=0;i<count;i++) {
            images.push(
                <View key={i} style={styles.subContainer}>
                    <Image style={styles.rowSubImg} source={this.props.img} />
                    <Text style={styles.rowSubText}>{i}</Text>
                </View>
            )
        }

        return images

        return (
        <View style={styles.rowImg2}>
            { images }
        </View>)
    }

    onTouchMoved = (target) => {
        console.log('onTouchMoved')

        this.setState({isTouchMoved: true})
    }

    onTouched = (target) => {
        console.log('onTouched')

        if (!this.state.isTouchMoved) {
            this.props.onPress(this.props.data)
        }

        this.setState({isTouchMoved: false})
    }

    onImageLoaded = () => {
        console.log('onImageLoaded')

        console.log(this.image.props.source)
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
  subContainer: {
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
      flex: 2,
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
      flex:1,
      backgroundColor: '#f0f'
  }
})