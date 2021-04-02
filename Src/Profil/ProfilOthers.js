import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TextInput, TouchableOpacity,
} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {accessibilityProps} from 'react-native-paper/src/components/MaterialCommunityIcon';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {authReducer} from '../../redux/reducers/auth.reducer';
import {subscribeToUser, unsubscribeToUser} from '../../redux/actions/user.action';
import {showMessage} from 'react-native-flash-message';

const widthScreen = Dimensions.get('screen').width;

class ProfilOthers extends React.Component {
    constructor(props) {
        super(props);
        var userOther = props.navigation.state.params.user;
        this.state = {
            image: userOther.profilUrl === '' ? require('../IMG/Jiraya.png') : {uri: props.user.profilUrl},
            couverture: require('../IMG/2.jpg'),
            nom: userOther.nom,
            pseudo: userOther.pseudo,
            nombreAbonne: userOther.nombreAbonne,
            nombreAbonnement: userOther.nombreAbonnement,
            nombrePublication: userOther.nbrePublications,
            nombreCommunaute: userOther.nbreCommunautes,
            sexe: 'M',
            email: userOther.mail,
            id: userOther.id,
            listeAbonne: userOther.listeAbonnes,
            listeAbonnement: props.user.listeAbonnements,
            listeCommunaute: props.user.listeCommunautes,
            abonne: false,

        };
        /*this.state = {
            image: require('../IMG/person_120px.png'),
            couverture: require('../IMG/2.jpg') ,
            nom:  'JackReacher',
            pseudo:  'the Ripper',
            nombreAbonne:  30,
            nombreAbonnement:  2000,
            sexe: 'M',
            email:  'JackReacher@theRipper.com',
        }*/

    }

    onSuccess = data => {
        this.setState({abonne: !this.state.abonne})
        showMessage({
            message: 'Notification',
            // le message . je pouvais aussi choisir statusText ou meme formater le body
            description: this.state.abonne ? 'Abonnement reussi' : 'Desabonnement reussi',
            type: 'success',
            icon: {
                icon: 'success',
                position: 'left',
            },
            duration: 1000,
        });
    };
    onFailled = error => {
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
        return (
            <ScrollView style={[{backgroundColor: '#fdfdfd', paddingTop: 50},]}>

                <View style={{
                    width: radiusProfilePhoto,
                    height: radiusProfilePhoto,
                    borderRadius: radiusProfilePhoto / 2,
                    alignSelf: 'center',
                }}>
                    <Image source={this.state.image}
                           style={styles.profilePhoto}

                    />
                </View>
                <Text style={styles.name}>{this.state.nom}</Text>
                <Text style={styles.pseudo}> @{this.state.pseudo}</Text>
                <View style={styles.alignVertical}>
                    <TouchableOpacity onPress={
                        () => {
                            console.log('abonement');
                            this.props.navigation.navigate('ListUser', {list: this.state.listeAbonnement});

                        }
                    }>
                        <View style={[styles.center, styles.repulseFromBorder]}>

                            <Text style={styles.labelNumber}>Abonnements</Text>
                            <Text style={styles.number}>{this.state.nombreAbonnement}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        () => {
                            console.log('abone');
                            this.props.navigation.navigate('ListUser', {list: this.state.listeAbonne});

                        }
                    }>
                        <View style={[styles.center, styles.repulseFromBorder]}>

                            <Text style={styles.labelNumber}>Abonnés</Text>

                            <Text style={styles.number}>{this.state.nombreAbonne}</Text>
                        </View>
                    </TouchableOpacity>


                </View>
                <View style={[styles.center]}>
                    <Button mode={'contained'}
                            style={styles.button}
                            color={'#FFDB58'}
                            onPress={
                                () => {
                                    if (!this.state.abonne) {
                                        this.props.SubscriberUser(this.state.id, this.onSuccess, this.onFailled, this.notifMessage)
                                    } else {
                                        this.props.UnSubscriberUser(this.state.id, this.onSuccess, this.onFailled, this.notifMessage)
                                    }
                                }
                            }
                    > {this.state.abonne ? 'Se desabonner' : "S'abonner"}</Button>
                </View>

            </ScrollView>
        );
    }
}

const radiusProfilePhoto = 200;
const borderSize = 7;
const borderColor = '#FFDB58';
const imageOpacity = 0.7;
const marge = 10;
const nameSize = 30;
const floueColor = Colors.blueGrey500;
const styles = StyleSheet.create({
    couverture: {
        width: widthScreen + 2 * borderSize,
        height: 200 + 2 * borderSize,
        resizeMode: 'cover',
        marginHorizontal: -borderSize,
        marginTop: -borderSize,
        borderWidth: borderSize,
        borderColor: borderColor,
    },
    profilePhoto: {
        width: radiusProfilePhoto,
        height: radiusProfilePhoto,
        borderRadius: radiusProfilePhoto / 2,
        borderColor: borderColor,
        borderWidth: borderSize,
        // marginTop: -radiusProfilePhoto/2,
        marginHorizontal: 200,
        shadowColor: Colors.green500,
        backgroundColor: Colors.grey200,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    name: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: nameSize,
        marginVertical: marge,
        fontWeight: 'bold',

    },
    pseudo: {
        fontSize: nameSize - 13,
        marginTop: -(marge + 7),
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        color: floueColor,
        fontStyle: 'italic',
    },
    alignVertical: {
        flexDirection: 'row',
        alignContent: 'center',
        margin: marge,
        justifyContent: 'space-between',
    },
    center: {
        alignContent: 'center',
        alignItems: 'center',
    },
    repulseFromBorder: {
        marginHorizontal: 40,
        marginVertical: marge,
    },
    number: {
        fontStyle: 'italic',
        color: Colors.blueGrey900,
        fontSize: 15,
    },
    labelNumber: {
        fontSize: 17,
    },
    iconEdit: {
        alignSelf: 'flex-end',
        marginRight: 35,
    },
    textInput: {
        fontSize: 22,
        marginRight: 25,
    },
    Bouton: {
        borderRadius: 25,
        width: 90,
        height: 30,
        backgroundColor: '#FFDB20',
        justifyContent: 'center',
    },
    textBoutton: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 17,
    },
    button: {
        height: 45,
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
});

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SubscriberUser: (idUser, onSuccess, onFailed, notifMessage) => {
            return dispatch(
                subscribeToUser(
                    idUser,
                    {
                        onSuccess: onSuccess,
                        onFailled: onFailed,
                        notifMessage: notifMessage,
                    }
                )
            )
        },
        UnSubscriberUser: (idUser, onSuccess, onFailed, notifMessage) => {
            return dispatch(
                unsubscribeToUser(
                    idUser,
                    {
                        onSuccess: onSuccess,
                        onFailled: onFailed,
                        notifMessage: notifMessage,
                    }
                )
            )
        },
    }
}
// export default Profil;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilOthers);
