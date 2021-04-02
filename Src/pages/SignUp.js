import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Picker,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {signup} from '../../redux/actions/auth.actions';
import {Colors, TextInput} from 'react-native-paper';

import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';

//import ConfCode from '../pages/login';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            pseudo: '',

            date: new Date('1999-06-06'),
            sexe: 'Masculin',
            password: '',
            cpassword: '',
            email: '',
            tel: '',
            pays: 'Cameroun',
            validColor: 'transparent',
        };
        this.setSexe = this.setSexe.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({date: newDate});
    }

    setSexe(newSexe) {
        this.setState({date: newSexe});
    }

    btnClick = () => {
        //signup au niveau de l'api à l'aide de redux
        let credentials = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            pseudo: this.state.pseudo,
            password: this.state.password,
            confirmPassword: this.state.cpassword,
            mail: this.state.email,
            pays: this.state.pays,
            teèlephone: this.state.tel,
            telephone: this.state.tel,
            dateNaissance: this.state.date,
        };

        this.props.register(credentials);
        this.props.navigation.navigate()
    };

    render() {
        /* verfication si la creation du compte s'est bien passé par exemple ici je redirige vers le login

            */
        if (this.props.isRegistered) {
            this.props.navigation.navigate('ConfCode' , {"email" : this.state.email});
        }
        if (this.props.errors) {
            console.log(this.props.errors);
            try {
                console.log(this.props.errors['error']['errors'][0]);
            } catch {
            }
        }

        const inputColor = 'transparent';
        return (
            <ScrollView>
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
                        label="Votre Nom "
                        mode="outlined"
                        underlineColorAndroid={inputColor}
                        onChangeText={(text) => {
                            this.setState({nom: text});
                        }}
                        value={this.state.nom}
                    />
                    <TextInput
                        style={styles.input}
                        label="Votre Prenom "
                        mode="outlined"
                        underlineColorAndroid={inputColor}
                        onChangeText={(text) => {
                            this.setState({prenom: text});
                        }}
                        value={this.state.prenom}
                    />
                    <TextInput
                        style={styles.input}
                        label="Votre Pseudo "
                        mode="outlined"
                        underlineColorAndroid={inputColor}
                        onChangeText={(text) => {
                            this.setState({pseudo: text});
                        }}
                        value={this.state.pseudo}
                    />
                    <TextInput
                        style={styles.input}
                        label="Votre Email"
                        mode="outlined"
                        underlineColorAndroid={inputColor}
                        onChangeText={(text) => {
                            this.setState({email: text});
                        }}
                        value={this.state.email}
                        keyboardType={'email-address'}
                    />
                    <TextInput
                        style={styles.input}
                        label="Mot de Passe"
                        mode="outlined"
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => {
                            this.setState({password: text});
                        }}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <TextInput /* style={styles.input} */
                        style={{
                            borderBottomColor: this.state.validColor,
                            alignSelf: 'stretch',
                            // textAlign:'center',
                            color: '#0000f5',
                            // height: 40,
                            marginBottom: 30,
                            borderBottomWidth: 1,
                        }}
                        mode="outlined"
                        label="Confirmer Mot de Passe"
                        underlineColorAndroid={inputColor}
                        onChangeText={(text) => {
                            this.setState({cpassword: text});
                            if (text != this.state.password) {
                                this.setState({validColor: 'red'});
                            } else if (text == this.state.password) {
                                this.setState({validColor: 'green'});
                            }
                        }}
                        value={this.state.cpassword}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        label="Telephone"
                        mode="outlined"
                        underlineColorAndroid={inputColor}
                        onChangeText={(text) => {
                            this.setState({tel: text});
                        }}
                        value={this.state.tel}
                        keyboardType={'phone-pad'}
                    />
                    <Picker
                        selectedValue={this.state.sexe}
                        onValueChange={(sexe) => {
                            this.setState({sexe: sexe});
                        }}>
                        <Picker.Item label="Male(Homme)" value="Masculin"/>
                        <Picker.Item label="Feminin(Femme)" value="Feminin"/>
                        <Picker.Item label="Autre" value="Autre"/>
                    </Picker>
                    <View style={{backgroundColor: Colors.red200, alignContent: 'center', justifyContent: 'center'}}>
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
                            onDateChange={(date) => {
                                this.setState({date: date});
                            }}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                },
                            }}
                        />

                    </View>
                    {
                        /*
                      gestion du loading (en cours d'enregistrement)
                      */
                        this.props.loading && (
                            <ActivityIndicator size="large" color="#0000ff"/>
                        )
                    }
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.btnClick();
                        }}>
                        <Text style={styles.btnText}>Enregistrez</Text>
                    </TouchableOpacity>

                    <Text
                        style={styles.text}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        j'ai deja un compte
                    </Text>
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
        backgroundColor: '#fafafa',
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
        width: 200
    },
});

const mapStateToprops = (state) => {
    return {
        loading: state.authReducer.loading,
        errors: state.authReducer.signup_errors,
        isRegistered: state.authReducer.isRegistered,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (credentials) => {
            dispatch(signup(credentials));
        },
    };
};

//export default SignUp;
export default connect(mapStateToprops, mapDispatchToProps)(SignUp);
