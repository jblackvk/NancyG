import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth.actions";
import { Colors } from "react-native-paper";
//import constraints from '../Validations/Contraintes';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      data: { email: "example@gmail.com" },
      image: require("../Images/bg1.png"),
      animate: false,
      error: 'none',
    };

    //this._onPressButton = this._onPressButton.bind(this)
  }

  onPressButton = () => {
    // const validationResult = validate(this.state.data, constraints);
    // validationResult is undefined if there are no errors
    /*if( ! validationResult){
      this.setState({ errors: validationResult });
    }
    else{

    }*/
  };

  press = () => {
    if (!this.props.loading) {
      this.props.login(this.state.email, this.state.password);
      //this.props.login("htamghuo", "azerty");
    }
  };

  resetState = ()=>{
    this.setState({ email : '' , password : '' })
  }

  render() {
    //console.log(this.getErrorsInField('email'));
    if(this.props.isAuthenticated){
      this.props.navigation.navigate('TabNavigator');
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <View style={styles.nancy}>
          <Image
            source={this.state.image}
            style={{ width: 220, height: 220 }}
          />
          {/*<Text style={{ color: 'darkblue', fontSize: 80 }}>
            N<Text style={{ color: 'darkblue', fontSize: 40 }}>ancy</Text>
          </Text>*/}
        </View>
        <View style={{ flex: 3 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
          {this.props.errors && <Text style={styles.error}>Identifiants Incorrects</Text>}
            <TextInput
              label=" Pseudo "
              style={styles.input}
              mode={'outlined'}
              underlineColor='#FFDB58'
              underlineColor='#FFDB58'
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <TextInput
              style={styles.input}
              label="Mot de passe"
              mode={'outlined'}
              underlineColor='#FFDB58'
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />

            {
              //ajouter s à error
              //this.props.error !==null && <Text style={{ color:'red'}}>Accès refusé</Text>
            }
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.Bouton}
              onPress={
                //   async () => {
                //            await this.props.navigation.navigate('Navigator');
                //            await this.render()

                //   //this.press()
                // }
                () => this.press()
              }
            >
              {this.props.loading ? (
                <ActivityIndicator size="large" color={Colors.white} />
              ) : (
                <Text style={styles.connexion}>Se connecter</Text>
              )}
            </TouchableOpacity>
            {this.isFieldInError("email") &&
              this.getErrorsInField("email").map((errorMessage) => (
                <Text>{errorMessage}</Text>
              ))}
            <Text>{this.getErrorMessages()}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{ color: "blue", marginHorizontal: 40 }}
            onPress={() => this.props.navigation.navigate("Email")}
          >
            Changer son mot de passe
          </Text>
          <Text
            style={{ color: "blue", marginHorizontal: 40, marginTop: 20 }}
            onPress={() => {
              this.props.navigation.navigate("SignUp")
            }}
          >
            Créer un nouveau compte
          </Text>
        </View>
      </ScrollView>
    );
  }

  getErrorMessages(separator = "\n") {
    const { errors } = this.state;
    if (!errors) {
      return [];
    }

    return Object.values(errors)
      .map((it) => it.join(separator))
      .join(separator);
  }

  getErrorsInField(field) {
    const { errors } = this.state;
    return (errors && errors[field]) || [];
  }

  isFieldInError(field) {
    const { errors } = this.state;
    return errors && !!errors[field];
  }
}

const mapStateToprops = (state) => {
  return {
    isBeenAutenticating: state.authReducer.isBeenAutenticating,
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    errors: state.authReducer.login_errors,
    loading: state.authReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (pseudo, password) => {
      dispatch(login(pseudo, password));
    },
  };
};

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  input: {
    width: 300,
    fontSize: 20,
    marginVertical: 10,
    justifyContent: "center",
    marginTop: 5,
    color: '#FFDB58',
    // height: 40,
    marginBottom: 30,
    // borderBottomColor: '#0000f5',
    borderBottomWidth: 1,
  },
  nancy: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  connexion: {
    textAlign: "center",
    justifyContent: 'center',
    fontSize: 19,
    color: "white",
  },
  Bouton: {
    backgroundColor: "#FFDB58",
    borderRadius: 25,
    width: 200,
    marginVertical: 10,
    paddingVertical: 2,
    justifyContent: 'center',
    height: 40,
  },
  error: {
    borderColor: "red",
    color : "red"
  },
});

//export default Login;
export default connect(mapStateToprops, mapDispatchToProps)(Login);
