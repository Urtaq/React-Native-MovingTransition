import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
import URExampleSampleCell from '../URExampleCell';

export class URExampleMainView extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    }
    
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const imgs = [require('../../Resources/20160509_044404.jpg'), require('../../Resources/2hnxrw4.jpg'), require('../../Resources/3714936a9cf70502e0a5842b9e546f35.jpg'), 
                  require('../../Resources/image_3e851409-b792-4211-b1fc-1c7f3515695a.png'), require('../../Resources/R1280x0.jpeg'),
                  require('../../Resources/susie4.jpg'), require('../../Resources/susie5.jpg'), require('../../Resources/tumblr_o1paghiOt81ss09k4o1_1280.jpg')]
    const titles = ["Suzy in korean transitional dress", "Suzy during an interview", "Smiling Suzy", "Brightly Smiling Suzy", "SeolHyun wearing a swimming suit", "SeolHyun standing nicely", "SeolHyun carrying a cute bag", "SeolHyun laying down"]
    var ROWS = []
    for (var i = 0; i < imgs.length; i++) {
        ROWS[i] = {title: titles[i], 
                    img: imgs[i]}
    }
    this.state = {
      dataSource: ds.cloneWithRows(ROWS),
      isScroll: false
    }
  }

  render() {
      const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        {/*<Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>머하냐</Text>*/}
        <Button
          onPress={() => {
            navigate('Detail', {name: 'Jane'})
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
      
      this.setState({isScroll : true})
  }

  _onScrollAnimationEnd = () => {
      console.log('onScrollAnimationEnd')

      this.setState({isScroll : false})
  }

  onPressRow(data) {
      console.log('onPressRow')
    //   console.log('data is ' + data.title + ', ' + data.img)
    console.log('this.state.isScroll is ' + this.state.isScroll)
    if (!this.state.isScroll) {
      const { navigate } = this.props.navigation
      navigate('Detail', {image: data})
    }
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