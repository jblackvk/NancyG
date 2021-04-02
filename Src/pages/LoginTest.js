import React from 'react';
import {
    View,
    Text,
    //TextInput,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth.actions';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
        };
    }


    login = () => {
        console.log('connecté');
        this.props.login(this.state.email, this.state.password);
    };

    onchangePassword = (text) => {
        this.setState({
            password: text,
        });
    };

    onchangeEmail = (text) => {
        this.setState({
            email: text,
        });
    };

    render() {
        return (
            <View style={styles.conteneur}>
                <View style={styles.nancy}>
                    <Text style={{color: 'darkblue', fontSize: 80}}>N
                        <Text style={{color: 'darkblue', fontSize: 40}}>ancy</Text>
                    </Text>
                </View>
                <View style={{flex: 3}}>

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        {this.props.isAuthenticated && <Text>suceess</Text>}
                        <TextInput style={styles.input} underlineColorAndroid='darkblue'
                                   label="Email ou pseudo" onChangeText={text => this.onchangeEmail(text)}/>
                        <TextInput style={styles.input} underlineColorAndroid='darkblue'
                                   label="Mot de passe" secureTextEntry={true}
                                   onChangeText={text => this.onchangePassword(text)}></TextInput>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.Bouton} onPress={this.login}>
                            <Text style={styles.connexion}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex: 1}}>
                    <Text style={{color: 'blue', marginHorizontal: 40}}>
                        Changer son mot de passe
                    </Text>
                    <Text style={{color: 'blue', marginHorizontal: 40, marginTop: 20}}>
                        Créer un nouveau compte
                    </Text>

                </View>

            </View>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (pseudo, password) => {
            dispatch(login(pseudo, password));
        },
    };
};

const mapStateToProps = state => {
    return {
        auth: state.authReducer,
        isAuthenticated: state.authReducer.isAuthenticated,
        loginerrors: state.authReducer.errors,
    };
};

//   export default connect(mapStateToProps, mapDispatchToProps)(AppContainer); 


const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: 'white',

    },
    input: {

        width: 300,
        paddingHorizontal: 15,
        fontSize: 20,
        marginVertical: 10,
        justifyContent: 'center',
        marginTop: 5,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);