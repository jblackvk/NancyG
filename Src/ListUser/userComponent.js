import React from 'react';
import {View, StyleSheet, Image, Text,  Dimensions} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {subscribeToUser, unsubscribeToUser} from '../../redux/actions/user.action';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

class UserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: props.data.image,
            nom: props.data.nom,
            pseudo: props.data.pseudo,
            abonne: props.data.abonne,
        };
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
            <View style={[styles.container, styles.hAlign]}>
                <Image source={this.state.avatar}
                       style={styles.avatar}
                />
                <View style={[styles.hAlign, {
                    justifyContent: 'space-between',
                    alignSelf: 'stretch',
                    alignContent: 'space-between',
                    marginLeft: marge,
                    width: Dimensions.get('screen').width - avatarSize - 3*marge,
                },
                ]}>
                    <View>
                        <Text style={styles.nom}>{this.state.nom}</Text>
                        <Text style={styles.pseudo}>@{this.state.pseudo}</Text>
                    </View>
                    <Button mode={'contained'}
                            style={styles.button}
                            color={'#FFDB58'}
                            onPress={
                                () => {
                                    if (!this.state.abonne) {
                                        this.props.SubscriberUser(this.props.data._id, this.onSuccess, this.onFailled, this.notifMessage)
                                    } else {
                                        this.props.UnSubscriberUser(this.props.data._id, this.onSuccess, this.onFailled, this.notifMessage)
                                    }
                                }
                            }
                    > {this.state.abonne ? 'Se desabonner' : "S'abonner"}</Button>

                </View>
            </View>
        );
    }
}

const avatarSize = 70;
const textSize = 22;
const marge = 5;
const styles = StyleSheet.create({
    avatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        backgroundColor: Colors.green200,
        margin: 5,
    },
    nom: {
        fontWeight: 'bold',
        fontSize: textSize,
    },
    pseudo: {
        fontStyle: 'italic',
        fontSize: textSize - 8,
        color: Colors.blueGrey900,
    },
    button: {
        width: 140,
        height: avatarSize - 25,
        marginRight: 10,
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: avatarSize / 2 - 10,
    },
    container: {
        borderBottomWidth: 0.5,
    },
    hAlign: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

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
        }
    }
}

export default connect(mapDispatchToProps)(UserComponent);
