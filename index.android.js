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
  TouchableHighlight
} = React;

var api = require('./PTVTimetableAPI');

var API_DEVELOPER_ID = "1000433";
var API_SECURITY_KEY = "3e644583-fced-11e4-9dfa-061817890ad2";

var NavigationBarBackBtn = React.createClass({
  render: function() {
    return (
      <TouchableHighlight onPress={() => {
        this.props.navigator.pop();
      }}>
        <View style={styles.navBarBtn}>
          <Text style={styles.navBarBtnText}>Back</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var NavigationBarHomeBtn = React.createClass({
  render: function() {
    return (
      <TouchableHighlight onPress={() => {
        this.props.navigator.popToTop();
      }}>
        <View style={styles.navBarBtn}>
          <Text style={styles.navBarBtnText}>Home</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var NavigationBar = React.createClass({
  render: function() {
    var backBtn = <Text></Text>, homeBtn = <Text></Text>;
    if (this.props.route.index > 0) {
      backBtn = (<NavigationBarBackBtn navigator={this.props.navigator} />);
      homeBtn = (<NavigationBarHomeBtn navigator={this.props.navigator} />);
    }

    return(
      <View style={styles.navBar}>
        {backBtn}
        <Text style={styles.navBarTitle}>Title</Text>
        {homeBtn}
      </View>
    );
  }
});

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator) {
    if (route.title == 'home') {
      return null;
    }

    return (
      <TouchableHighlight onPress={() => {
          navigator.pop();
      }}>
        <Text style={styles.navBarBtn}>Back</Text>
      </TouchableHighlight>
    );
  },

  RightButton: function(route, navigator) {
    if (route.title == 'home') {
      return null;
    }

    return (
      <TouchableHighlight onPress={() => {
          navigator.popToTop();
      }}>
        <Text style={styles.navBarBtn}>Home</Text>
      </TouchableHighlight>
    );
  },

  Title: function(route, navigator) {
    return <Text style={styles.navBarTitle}>{route.title}</Text>
  }
}

var PTViewer = React.createClass({
  renderScene: function(route, navigator) {
    if (route.title == 'home') {
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
                navigator.push({title: 'child1', index: nextIndex})
              }}>
              go child1
            </Text>
          </View>
        </View>
      );
    }
    else if (route.title == 'child1') {
      return (
        <View style={styles.container}>
          <NavigationBar
            route={route}
            navigator={navigator} />
          <View style={styles.content}>
            <Text style={styles.contentText}>{route.title}</Text>
          </View>
        </View>
      );
    }
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{title: 'home', index: 0}}
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
    color: 'blue'
  }
});

AppRegistry.registerComponent('PTViewer', () => PTViewer);
