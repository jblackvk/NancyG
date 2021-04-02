import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity, Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {set_email} from '../../redux/actions/auth.actions';
import {connect} from 'react-redux';

class Email extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            message: props.navigation.state.params.message === undefined ? 'Nous devons confirmer votre identité pour vous permettre de changer\n' +
                ' votre mot de passe' : 'Veuillez entrer votre Nouvel Email',

            email: '',
            oldEmail: props.navigation.state.params.message === undefined ? '' : props.navigation.state.params.email,
        }

    }
    render() {
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
                            {this.state.message}
                        </Text>
                    </View>
                    <View style={{flex: 3}}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 40,
                        }}>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="darkblue"
                                mode={'outlined'}
                                label="Entrez votre Adresse mail"
                                EmailTextEntry={true}
                                onChangeText = {
                                    (text) => {
                                        if(this.props.navigation.state.params.message === undefined) {
                                            this.setState({
                                                email: text,
                                                oldEmail: text,
                                            })
                                        } else {
                                            this.setState({
                                                email: text,
                                            })
                                        }
                                    }
                                }
                            />
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.Bouton}
                                              onPress={() => {
                                                  this.props.Set_Email(this.state.email, this.state.oldEmail)
                                                  this.props.navigation.navigate('ConfCode');
                                              }
                                              }>
                                <Text
                                    style={styles.connexion}
                                >
                                    Suivant
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.Bouton}
                                              onPress={() => this.props.navigation.goback()}>
                                <Text
                                    style={styles.connexion}
                                >
                                    Annuler
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        marginTop: 20,
    },
    connexion: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 19,
        color: 'white',
        marginVertical: 20,
        marginTop: 5,
    },
    Bouton: {
        backgroundColor: '#FFDB58',
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
        Set_Email: (newEmail, oldEmail) => {
            dispatch(
                set_email(newEmail, oldEmail),
            )
        }
    }
}

export default connect(null,mapDispatchToProps)(Email)
