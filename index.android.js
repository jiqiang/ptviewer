/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image
} = React;

var api = require('./PTVTimetableAPI');

var API_DEVELOPER_ID = "1000433";
var API_SECURITY_KEY = "3e644583-fced-11e4-9dfa-061817890ad2";

var NavigationBarBackBtn = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor="#cc0000"
        onPress={() => {
          this.props.navigator.pop();
      }}>
        <Image source={require('./icons/ic_chevron_left_white.png')} />
      </TouchableHighlight>
    );
  }
});

var NavigationBarHomeBtn = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor="#cc0000"
        onPress={() => {
          this.props.navigator.popToTop();
      }}>
        <Image source={require('./icons/ic_home_white.png')} />
      </TouchableHighlight>
    );
  }
});

var NavigationBar = React.createClass({
  render: function() {
    var backBtn = <Text></Text>, homeBtn = <Text></Text>;
    if (this.props.route.id != 'home') {
      backBtn = (<NavigationBarBackBtn navigator={this.props.navigator} />);
      homeBtn = (<NavigationBarHomeBtn navigator={this.props.navigator} />);
    }

    return(
      <View style={styles.navBar}>
        {backBtn}
        <Text style={styles.navBarTitle}>PTViewer</Text>
        {homeBtn}
      </View>
    );
  }
});

var PTViewer = React.createClass({
  renderScene: function(route, navigator) {
    if (route.id == 'home') {
      var nextIndex = route.index + 1;
      return (
        <View style={styles.container}>
          <NavigationBar
            route={route}
            navigator={navigator} />
          <View style={styles.content}>
            <Text
              style={styles.contentText}
              onPress={() =>{
                navigator.push({id: 'child1'})
              }}>
              go child1
            </Text>
          </View>
        </View>
      );
    }
    else if (route.id == 'child1') {
      return (
        <View style={styles.container}>
          <NavigationBar
            route={route}
            navigator={navigator} />
          <View style={styles.content}>
            <Text style={styles.contentText}>child 1</Text>
          </View>
        </View>
      );
    }
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{id: 'home'}}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={this.renderScene} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#cc0000',
    flexDirection: 'row'
  },
  navBarBtn: {

  },
  navBarBtnText: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center'
  },
  navBarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentText: {
    color: '#000'
  }
});

AppRegistry.registerComponent('PTViewer', () => PTViewer);
