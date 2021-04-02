import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Picker,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';

import {signup} from '../../redux/actions/auth.actions';
import {Colors, TextInput} from 'react-native-paper';
import Dialog from 'react-native-dialog';

import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import {updateMyProfile} from '../../redux/actions/user.action';
import {showMessage} from 'react-native-flash-message';

//import ConfCode from '../pages/login';

class EditProfil extends React.Component {
  constructor(props) {
    super(props);
    /*this.state = {
            nom: '',
            prenom: '',
            pseudo: '',
            date: new Date('1999-06-06'),
            sexe: 'Masculin',
            tel: '',
            pays: 'Cameroun',
            validColor: 'transparent',
            dialog: false,
        };*/
    this.state = {
      // nom: props.navigation.state.params.user.nom,
      // prenom: props.navigation.state.params.user.prenom,
      // pseudo: props.navigation.state.params.user.pseudo,
      // date: props.navigation.state.params.user.date,
      // sexe: props.navigation.state.params.user.sexe,
      // tel: props.navigation.state.params.user.tel,

      nom: props.user.nom,
      prenom: props.user.prenom,
      pseudo: props.user.pseudo,
      date: props.user.date,
      sexe: props.user.sexe,
      tel: props.user.tel,
      validColor: 'transparent',
      dialog: false,
      loading: false,
    };
  }

  modify = false;

  setDate(newDate) {
    this.setState({date: newDate});
  }

  showDialog = () => {
    this.setState({dialog: true});
  };

  cancelDialog = () => {
    this.setState({dialog: false});
    this.props.navigation.goBack(null);
  };

  saveDialog = () => {
    this.setState({dialog: false});
  };

  handleBackAction = () => {
    this.setState({dialog: true});
    /*Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
        );*/
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackAction);
  }

  setSexe(newSexe) {
    this.setState({date: newSexe});
  }

  btnClick = () => {
    //signup au niveau de l'api à l'aide de redux
    this.setState({loading : true})
    let credentials = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      pseudo: this.state.pseudo,
      teèlephone: this.state.tel,
      telephone: this.state.tel,
      dateNaissance: this.state.date,
      sexe: this.state.sexe,
    };

    this.props.UpdateMyProfile(
      this.props.user._id,
      credentials,
      this.onSuccess,
      this.onFailled,
      this.notifMessage,
    );

  };

  onSuccess = data => {
    this.setState({loading: !this.state.loading});
    showMessage({
      message: 'Notification',
      // le message . je pouvais aussi choisir statusText ou meme formater le body
      description: 'Publication envoyee',
      type: 'success',
      icon: {
        icon: 'success',
        position: 'left',
      },
      duration: 1000,
    });
    this.props.navigation.navigate('HomePage')
    //redirect if you want
  };
  onFailled = error => {
    this.setState({loading: !this.state.loading});
    showMessage({
      message: 'Notification',
      // le message . je pouvais aussi choisir statusText ou meme formater le body
      description: error.message,
      type: 'danger',
      icon: {
        icon: 'danger',
        position: 'left',
      },
      duration: 1000,
    });
  };

  //facultatif
  notifMessage = (data, error) => {
    if (data) {
      //je ne fais rien
      return;
    } else if (error) {
      //retourne le corps du message
      return error.message;
    }
  };

  render() {
    /* verfication si la creation du compte s'est bien passé par exemple ici je redirige vers le login

            */
    if (this.props.isRegistered) {
      this.props.navigation.navigate('ConfCode', {email: this.state.email});
    }
    if (this.props.errors) {
      console.log(this.props.errors);
      try {
        console.log(this.props.errors['error']['errors'][0]);
      } catch {}
    }

    const inputColor = 'transparent';
    return (
      <ScrollView>
        <View>
          <Dialog.Container visible={this.state.dialog}>
            <Dialog.Title>Exit</Dialog.Title>
            <Dialog.Description>
              Voulez vous Sauvegarder avant de sortir?
            </Dialog.Description>
            <Dialog.Button
              label={'cancel'}
              color={Colors.red200}
              onPress={this.cancelDialog}
            />
            <Dialog.Button
              label="Sauvegarder"
              color="#FFDB58"
              onPress={this.saveDialog}
            />
          </Dialog.Container>
        </View>
        <View style={styles.container}>
          <Text style={styles.header}>SignUp Nancy</Text>
          {/* customiser les erreurs ici bref this.props.errors indique si le signup s'est mal passé et donne les erreurs backend
          vous devez regarder la structure de cet erreur afin de savoir quoi afficher */}
          {this.props.errors && (
            // Object.keys(this.props.errors['error']['errors']).map((key) => (
            //   <Text style={styles.errorText}>
            //     {this.props.errors['error']['errors'][0]['msg']}
            //   </Text>
            <Text style={styles.errorText}>
              Erreurs l'ors de la creation de compte
            </Text>
          )}
          <TextInput
            style={styles.input}
            label="Nom"
            mode="outlined"
            underlineColorAndroid={inputColor}
            onChangeText={text => {
              this.setState({nom: text});
              this.modify = true;
            }}
            value={this.state.nom}
          />
          <TextInput
            style={styles.input}
            label="Prenom"
            mode="outlined"
            underlineColorAndroid={inputColor}
            onChangeText={text => {
              this.setState({prenom: text});
              this.modify = true;
            }}
            value={this.state.prenom}
          />
          <TextInput
            style={styles.input}
            label="Pseudo"
            mode="outlined"
            underlineColorAndroid={inputColor}
            onChangeText={text => {
              this.setState({pseudo: text});
              this.modify = true;
            }}
            value={this.state.pseudo}
          />

          <TextInput
            style={styles.input}
            label="Telephone"
            mode="outlined"
            underlineColorAndroid={inputColor}
            onChangeText={text => {
              this.setState({tel: text});
              this.modify = true;
            }}
            value={this.state.tel}
            keyboardType={'phone-pad'}
          />
          <Picker
            selectedValue={this.state.sexe}
            onValueChange={sexe => {
              this.setState({sexe: sexe});
              this.modify = true;
            }}>
            <Picker.Item label="Male(Homme)" value="Masculin" />
            <Picker.Item label="Feminin(Femme)" value="Feminin" />
            <Picker.Item label="Autre" value="Autre" />
          </Picker>
          <View
            style={{
              backgroundColor: Colors.red200,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <DatePicker
              id="Date"
              date={this.state.date}
              style={styles.dpick}
              format="YYYY-MM-DD"
              label="Naissance"
              mode="date"
              maxDate="2012-01-01"
              minDate="1929-01-01"
              cancelBtnText="Cancel"
              onDateChange={date => {
                this.setState({date: date});
                this.modify = true;
              }}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
            />
          </View>
          {/*
                      gestion du loading (en cours d'enregistrement)
                      */
          this.props.loading && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.btnClick();
            }}>
            {this.state.loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnText}>Enregistrez</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: '#fefefe',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDB58',
    padding: 20,
    paddingBottom: 0,
    marginBottom: 20,
    margin: 30,
    alignSelf: 'center',
  },
  input: {
    alignSelf: 'stretch',
    // textAlign:'center',
    color: '#0000f5',
    // borderColor: '#FFDB58',
    // height: 40,
    borderColor: 'transparent',
    marginBottom: 30,
    // borderBottomColor: '#0000f5',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 15,
    margin: 40,
    backgroundColor: '#FFDB58',
    borderRadius: 30,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 22,
  },
  text: {
    color: '#0000f5',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
  },
  dpick: {
    width: 200,
  },
});

const mapStateToprops = state => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    UpdateMyProfile: (idUser, newInfo, onSuccess, onFailed, notifMessage) => {
      return dispatch(
        updateMyProfile(idUser, newInfo, {
          onSuccess: onSuccess,
          onFailed: onFailed,
          notifMessage: notifMessage,
        }),
      );
    },
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps,
)(EditProfil);
