import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {TextInput, ActivityIndicator} from 'react-native-paper';
import {set_password} from '../../redux/actions/user.action';
import {connect} from 'react-redux';

class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confPassword: '',
            confirmed: false,
            loading: false,
        };
    }

    changePassword = (newPassword, oldPassword) => {
        console.log('newPassword: ', newPassword);
        console.log('oldPassword: ', oldPassword);
        this.setState({loading: true});
        this.props.SetPassWord(
            newPassword,
            oldPassword,
            this.onSuccess,
            this.onFailled,
            (data, err) => {
            },
        );
    };

    onSuccess = data => {
        console.log('success');
        this.setState({loading: !this.state.loading});
        showMessage({
            message: 'Notification',
            // le message . je pouvais aussi choisir statusText ou meme formater le body
            description: 'Mot de passe changé',
            type: 'success',
            icon: {
                icon: 'success',
                position: 'left',
            },
            duration: 1000,
        });
        this.props.navigation.navigate('Login');
    };

    onFailled = error => {
        console.log(error);

        if (error.body == null) {
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
        }else if(error.body.errors == null){
            showMessage({
                message: 'Notification',
                // le message . je pouvais aussi choisir statusText ou meme formater le body
                description: error.body,
                type: 'danger',
                icon: {
                    icon: 'danger',
                    position: 'left',
                },
                duration: 1000,
            });
        }
        else {
            error.body.errors.map((error, index) => showMessage({
                    message: 'Notification',
                    // le message . je pouvais aussi choisir statusText ou meme formater le body
                    description: error.msg,
                    type: 'danger',
                    icon: {
                        icon: 'danger',
                        position: 'left',
                    },
                    duration: 1000 * (index + 1),
                }),
            );

        }
        this.setState({loading: !this.state.loading});

    };

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.conteneur}>
                        <View style={styles.nancy}>
                            <Text
                                style={{
                                    color: 'darkblue',
                                    fontSize: 20,
                                    textAlign: 'center',
                                }}>
                                Changez votre mot de passe
                            </Text>
                        </View>
                        <View style={{flex: 3}}>
                            <View style={{marginBottom: 40}}>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="darkblue"
                                        mode={'outlined'}
                                        label="Ancien mot de passe"
                                        secureTextEntry={true}
                                        onChangeText={text => {
                                            this.setState({
                                                oldPassword: text,
                                            });
                                        }}
                                    />
                                </View>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="darkblue"
                                        mode={'outlined'}
                                        label="Nouveau mot de passe"
                                        secureTextEntry={true}
                                        onChangeText={text => {
                                            this.setState({
                                                newPassword: text,
                                            });
                                        }}
                                    />
                                </View>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    {/* <TextInput
                  style={styles.input}
                  mode={'outlined'}
                  underlineColorAndroid="darkblue"
                  label="confirmation"
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({
                      confPassword: text,
                    });
                  }}
                /> */}
                                    <TextInput
                                        style={{
                                            borderBottomColor: this.state.validColor,
                                            width: 300,
                                            paddingHorizontal: 15,
                                            fontSize: 20,
                                            marginVertical: 10,
                                            justifyContent: 'center',
                                            marginTop: 5,
                                            borderColor: '#FFDB58',
                                        }}
                                        mode="outlined"
                                        label="Confirmer Mot de Passe"
                                        onChangeText={text => {
                                            this.setState({confPassword: text});
                                            text !== this.state.newPassword ?
                                                this.setState({validColor: 'red'})
                                                : this.setState({validColor: 'green', confirmed: true});
                                        }}
                                        value={this.state.confPassword}
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity
                                    style={styles.Bouton}
                                    disabled={!this.state.confirmed}>
                                    {this.state.loading ? (
                                        <ActivityIndicator color="white"/>
                                    ) : (
                                        <Text
                                            style={styles.connexion}
                                            onPress={() => {
                                                this.changePassword(this.state.newPassword, this.state.oldPassword);
                                            }}>
                                            Enregistrer
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={styles.Bouton}>
                                    <Text
                                        style={styles.connexion}
                                        onPress={() => this.props.navigation.navigate('Login')}>
                                        Annuler
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
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
        color: 'white',
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    Bouton: {
        backgroundColor: '#FFDB58',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: 200,
        marginVertical: 10,
        height: 40,
    },
    error: {
        borderColor: 'red',
    },
});

const mapDispatchToProps = dispatch => {
    return {
        SetPassWord: (
            newPassword,
            oldPassword,
            onSuccess,
            onFailled,
            notifMessage,
        ) => {
            return dispatch(
                set_password(oldPassword, newPassword, {
                    onSuccess,
                    onFailled,
                    notifMessage,
                }),
            );
        },
    };
};

export default connect(null, mapDispatchToProps)(NewPassword);
