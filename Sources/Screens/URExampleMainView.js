"use strict";

import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  ListView, 
  Image,
  Animated,
  Dimensions,
  Easing
} from 'react-native';
import { BlurView } from 'react-native-blur'

import URExampleSampleCell from '../URExampleCell';
import ImageAssets from './../../ImageAssets'
import Strings from './../../Strings'

export class URExampleMainView extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    }
    
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    
    var ROWS = []
    for (var i = 0; i < ImageAssets.images.length; i++) {
        ROWS[i] = {title: Strings.cellTitles[i],
                    img: ImageAssets.images[i],
                    rowId: i}
    }
    this.state = {
      movableView: [],
      rows: ROWS,
      dataSource: ds.cloneWithRows(ROWS),
      opacity: new Animated.Value(1),
      animationDuration: 1000,
      cellImageWidth: new Animated.Value(0),
      cellImageHeight: new Animated.Value(0)
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const opacity = {opacity: this.state.opacity}
    return (
      <View style={[styles.container]}>
        <Button
          onPress={this.onPressLearnMore.bind(this)}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
          <Animated.View style={[styles.subContainer, opacity]}>
            <ListView ref={(list) => this.list = list} style={styles.list}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => {
                console.log('rowData is ' + rowData.title + ', ' + rowData.img)
                return (
                  <URExampleSampleCell data={rowData} title={rowData.title} 
                  img={rowData.img} 
                  onPress={this.onPressRow.bind(this)} 
                  />
                )
                }
              }
              onScroll={this._onScroll}
              onScrollAnimationEnd={this._onScrollAnimationEnd}
              />
        </Animated.View>
        { this.state.movableView }
      </View>
    )
  }

  _onScroll = (event) => {
      console.log('onScroll')
  }

  onPressRow(data, cell) {
    console.log('onPressRow')
    //   console.log('data is ' + data.title + ', ' + data.img)
    console.log('this.state.isScroll is ' + this.state.isScroll)

    this.makeMovableView(data)
    this.prepareMovingView(cell, () => {
      Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: this.state.animationDuration
      }),
      Animated.timing(this.state.cellImageWidth, {
        toValue: Dimensions.get('window').width,
        duration: this.state.animationDuration
      }),
      Animated.timing(this.state.cellImageHeight, {
        toValue: Dimensions.get('window').height,
        duration: this.state.animationDuration
      })
    ]).start((finish) => {
        const { navigate } = this.props.navigation
        navigate('Detail', {data: data, finishAction: this._onTransitionEnd.bind(this)})
    })
    })

    
  }

  _onTransitionEnd = () => {
    console.log("_onTransitionEnd")
    this.onPressLearnMore()
  }

  onPressLearnMore() {
    console.log("onPressLearnMore")

    const movableView = this.state.movableView
    if (Array.isArray(movableView)) {
      if (movableView.length > 0) {
        movableView.pop()
      }
    }

    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1.0,
        duration: 0.0
      }),
      Animated.timing(this.state.cellImageWidth, {
        toValue: 0,
        duration: 0.0
      }),
      Animated.timing(this.state.cellImageHeight, {
        toValue: 0,
        duration: 0.0
      })
    ]).start()
    
    this.setState({
      movableView: movableView
    })
  }

  makeMovableView(data) {
    console.log("makeMovableView")
    console.log(data)

    const extraStyle = { width: this.state.cellImageWidth,
                          height: this.state.cellImageHeight
                        }

    const movableView = this.state.movableView
    if (Array.isArray(movableView)) {
      movableView.push(
        <BlurView ref={(blur) => { this.blur = blur }} key={movableView.length} style={styles.blur}
        blurType="light">
          <Animated.Image style={[styles.movable, extraStyle]} source={data.img} />
        </BlurView>
      )
    }
    
    this.setState({
      movableView: movableView
    })
  }

  prepareMovingView(cell, animation) {
    console.log("prepareMovingView")

    // this.setState({
    //   cellImageWidth: new Animated.Value(cell.state.cellImageWidth),
    //   cellImageHeight: new Animated.Value(cell.state.cellImageHeight)
    // }, animation)
    
    Animated.parallel([
      Animated.timing(this.state.cellImageWidth, {
        toValue: cell.state.cellImageWidth,
        duration: 0.0
      }),
      Animated.timing(this.state.cellImageHeight, {
        toValue: cell.state.cellImageHeight,
        duration: 0.0
      })
    ]).start((finish) => {
      animation()
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%"
  },
  list: {
    flex: 1,
    backgroundColor: '#eee',
    width: "100%",
    height: "100%"
  },
  blur: {
    flex: 1,
    position: "absolute",
    width: '100%',
    height: '100%',
    borderColor: '#fff0'
  },
  movable: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  movableImage: {
    flex: 1,
    backgroundColor: '#fff'
  }
});