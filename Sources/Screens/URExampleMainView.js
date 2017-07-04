import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
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
      dataSource: ds.cloneWithRows(ROWS)
    }
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigate('Detail', {name: 'Jane', image: ImageAssets.images[0]})
          }}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <ListView ref={(list) => this.list = list} style={styles.list} width="100%" height="50%"
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
    const { navigate } = this.props.navigation
    navigate('Detail', {data: data})
  }

  onPressLearnMore() {
    console.log("onPressLearnMore")
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
  list: {
    flex: 1,
    backgroundColor: '#eee',
  }
});