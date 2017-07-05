import React from 'react';
import { 
  StyleSheet, 
  Text, View, 
  Button, 
  ListView, 
  Image,
  Animated
} from 'react-native';

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
      <View style={styles.container}>
        <Button
          onPress={this.onPressLearnMore.bind(this)}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        { this.state.movableView }
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
      </View>
    )
  }

  _onScroll = (event) => {
      console.log('onScroll')
  }

  onPressRow(data) {
    console.log('onPressRow')
    //   console.log('data is ' + data.title + ', ' + data.img)
    console.log('this.state.isScroll is ' + this.state.isScroll)

    this.addMovableView()

    Animated.timing(this.state.opacity, {
      toValue: 0.1,
      duration: this.state.animationDuration
    }).start((finish) => {
        const { navigate } = this.props.navigation
        navigate('Detail', {data: data})
    }
    )
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

  addMovableView() {
    console.log("addMovableView")

    const movableView = this.state.movableView
    if (Array.isArray(movableView)) {
      movableView.push(
        <View key={movableView.length} style={styles.movableView}>
          <Text>얍얍</Text>
        </View>
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
  movable: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#0aa'
  }
});