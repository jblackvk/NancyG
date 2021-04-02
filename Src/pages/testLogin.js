import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';

export default class App extends React.Component {
  render() {
    return  (
      <View style={styles.conteneur}>
        <StatusBar backgroundColor="darkblue" barStyle="light-content" />
        <Text style={{fontSize: 30}}>Login reussit</Text>
      </View>

    );
  }
}
const styles  = StyleSheet.create({
  conteneur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },,
});;
