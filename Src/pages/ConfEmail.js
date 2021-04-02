import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView, Dimensions,
} from 'react-native';
import {Colors, TextInput} from 'react-native-paper';
import mapDispatchToProps from 'react-redux/lib/connect/mapDispatchToProps';
import {verify_token_after_set_email} from '../../redux/actions/auth.actions';


export default class ConfEmail extends React.Component {
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
                            Nous vous avons envoyé un code de sécurité pour terminer votre inscription
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 40,
                        }}>
                            <TextInput
                                style={styles.input}
                                mode={'outlined'}
                                underlineColorAndroid="darkblue"
                                label="Entrez Le code de sécurité"
                                EmailTextEntry={true}
                            />
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.Bouton}>
                                <Text
                                    style={styles.connexion}
                                    onPress={() => {
                                        this.props.navigation.navigate('Navigator')
                                    }}>
                                    Suivant
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.Bouton}>
                                <Text
                                    style={styles.connexion}
                                    onPress={() => this.props.navigation.goBack()}>
                                    Retour
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.nancy}>
                        <Text
                            style={{fontSize: 15, textAlign: 'center', marginHorizontal: 10}}>
                            Rentrez à l'étape précédente renseigner à nouveau votre adresse mail
                            si vous n'avez pas reçu de code de sécurité
                        </Text>
                    </View>
                </View>
                <View style={{flex: 2}}/>
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
    },
    connexion: {
        textAlign: 'center',
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

/*const mapDispatchToProps = dispatch => {
    return{
        verifyEmail: (token, onSuccess, onFailed, notifMessage) => {
            dispatch(
                verify_token_after_set_email(token)
            )
        }
    }
}*/
