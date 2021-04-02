import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {ActivityIndicator, Colors} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';

export default class Accueil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: 'none',
      image: require('../Images/bg1.png'),
    };
  }

  render() {
    return (
      <View style={styles.conteneur}>
        <View style={styles.nancy}>
          <Text style={{color: 'darkblue', fontSize: 30, textAlign: 'center'}}>
            Bienvenu sur Nancy
          </Text>
          <Image source={this.state.image} style={{width: 220, height: 220, marginTop: 20 ,marginBottom: -100}} />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <TouchableOpacity
            style={styles.Bouton}
            onPress={() => {
              this.setState({load: 'flex'}, () => {
                this.props.navigation.navigate('SignUp');
              });
            }}>
            <Text style={styles.connexion}>Créer mon compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Bouton}
            onPress={() => {
              this.setState({load: 'flex'});
              this.props.navigation.navigate('Login');
            }}>
            <Text style={styles.connexion}>J'ai déja un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  input: {
    width: 300,
    paddingHorizontal: 15,
    fontSize: 20,
    marginVertical: 10,
    justifyContent: 'center',
    marginTop: 5,
    borderColor: '#FFDB58',
  },
  nancy: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connexion: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    marginVertical: 20,
    marginTop: 5,
  },
  Bouton: {
    backgroundColor: '#FFDB58',
    borderRadius: 25,
    width: 200,
    marginVertical: 10,
    paddingVertical: 2,
    height: 35,
  },
  error: {
    borderColor: 'red',
  },
});
