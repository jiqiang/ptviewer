/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
  moment = require('moment'),
  jsSHA = require('jssha');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var api = require('./PTVTimetableAPI');

var API_DEVELOPER_ID = "1000433";
var API_SECURITY_KEY = "3e644583-fced-11e4-9dfa-061817890ad2";

var PTViewer = React.createClass({
  test_jssha: function() {
    var shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey("this is a key", "TEXT");
    shaObj.update("this is a request");
    return shaObj.getHMAC("HEX");
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <Text>{moment().format()}</Text>
        <Text>{this.test_jssha()}</Text>
        <Text>{api().health_check()}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PTViewer', () => PTViewer);
