import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  ListView, 
  Image,
  Animated
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
      animationDuration: 1000
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const opacity = {opacity: this.state.opacity}
    return (
      <Animated.View style={[styles.container, opacity]}>
        <Button
          onPress={this.onPressLearnMore.bind(this)}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
          <View style={styles.subContainer}>
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
        { this.state.movableView }
        </View>
      </Animated.View>
    )
  }

  _onScroll = (event) => {
      console.log('onScroll')
  }

  onPressRow(data) {
    console.log('onPressRow')
    //   console.log('data is ' + data.title + ', ' + data.img)
    console.log('this.state.isScroll is ' + this.state.isScroll)

    this.addMovableView(data)

    Animated.timing(this.state.opacity, {
      toValue: 0.1,
      duration: this.state.animationDuration
    }).start((finish) => {
        const { navigate } = this.props.navigation
        navigate('Detail', {data: data, finishAction: this._onTransitionEnd.bind(this)})
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

    Animated.timing(this.state.opacity, {
      toValue: 1.0,
      duration: 0.0
    }).start()

    this.setState({
      movableView: movableView
    })
  }

  addMovableView(data) {
    console.log("addMovableView")

    const movableView = this.state.movableView
    if (Array.isArray(movableView)) {
      movableView.push(
        <BlurView ref={(blur) => { this.blur = blur }} key={movableView.length} style={styles.blur} blurType="light">
          <Animated.Image />
          <Image style={styles.movable} source={data.img} />
        </BlurView>
      )
    }

    this.setState({
      movableView: movableView
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
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  }
});