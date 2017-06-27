import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
import URExampleSampleCell from './Sources/URExampleSampleCell';

export default class App extends React.Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const imgs = ['./Resources/20160509_044404.jpg', './Resources/2hnxrw4.jpg', './Resources/3714936a9cf70502e0a5842b9e546f35.jpg', 
                  './Resources/image_3e851409-b792-4211-b1fc-1c7f3515695a.png', './Resources/R1280x0.jpeg',
                  './Resources/susie4.jpg', './Resources/susie5.jpg', './Resources/tumblr_o1paghiOt81ss09k4o1_1280.jpg'];
    var ROWS = []
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i]
      ROWS[i] = {title: 'row '+ i, img: img}
    }
    this.state = {
      dataSource: ds.cloneWithRows(ROWS),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>머하냐</Text>
        <Button
          onPress={this.onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <ListView style={styles.list} width="100%" height="50%"
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <URExampleSampleCell title={rowData.title} img={rowData.img}></URExampleSampleCell>
              )
            }
          }
        />
      </View>
    );
  }

  onPressLearnMore() {
    console.log("onPressLearnMore")    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    backgroundColor: '#eee',
  }
});