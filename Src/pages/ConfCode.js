import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput, ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  resend_token_for_signup,
  verify_token_after_signup,
} from '../../redux/actions/auth.actions';

class ConfCode extends React.Component {
  constructor(props) {
    super(props);

    // console.log(props.navigation.state);

    this.state = {
      email : props.navigation.state.params.email || "",
      //email: 'kritikostamghuo@gmail.com',
      code: '',
      askforResend : false,
    };
  }

  submit = () => {
    if (this.state.code != '' && !this.props.loading) {
      this.props.submitCode(this.state.code);
      this.setState({askforResend : false});
    }
  };

  resendCode = () => {
    if (this.state.email != '' && !this.props.loading)
      this.props.resendCode(this.state.email);
      this.setState({askforResend : true});
  };

  render() {
    if (this.props.isActionOk && !this.state.askforResend) {
      this.props.navigation.navigate('TabNavigator');
    }
    if(this.props.errors){
      console.log(this.props.errors);
    }
    if(this.props.loading){
      console.log("loading")
    }
    return (
      <ScrollView>
        <View style={styles.conteneur}>
          <View style={styles.nancy}>
            <Text
              style={{
                color: 'darkblue',
                fontSize: 18,
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              Nous vous avons envoyé un code de sécurité
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {this.props.errors && !this.state.askforResend && (
                <Text style={{color: 'red'}}>{this.props.errors}</Text>
              )}
              <TextInput
                style={styles.input}
                underlineColorAndroid="darkblue"
                label="Entrez Le code de sécurité"
                EmailTextEntry={true}
                onChangeText={text => {
                  this.setState({code: text});
                }}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {this.props.loading && <ActivityIndicator color="#29B6F6" />}
              <TouchableOpacity style={styles.Bouton}>
                <Text style={styles.connexion} onPress={() => this.submit()}>
                  Finaliser l'inscription
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.Bouton}>
                <Text
                  style={styles.connexion}
                  onPress={() => this.resendCode()}>
                  Renvoyer Le code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.nancy}>
          <Text
            style={{ fontSize: 15, textAlign: 'center', marginHorizontal: 10 }}>
            Rentrez à l'étape précédente renseigner à nouveau votre adresse mail
            si vous n'avez pas reçu de code de sécurité
          </Text>
        </View> */}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToprops = state => {
  return {
    isActionOk: state.authReducer.IsWeakAuthActionOk,
    errors: state.authReducer.weak_auth_actions_errors,
    loading: state.authReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resendCode: email => {
      dispatch(resend_token_for_signup(email));
    },
    submitCode: code => {
      dispatch(verify_token_after_signup(code));
    },
  };
};

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 2,
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
    backgroundColor: '#29B6F6',
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

//export default ConfCode;

export default connect(
  mapStateToprops,
  mapDispatchToProps,
)(ConfCode);
