import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    Dimensions,
    Modal,
    ListView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {Colors, IconButton} from 'react-native-paper';
import withDimensions from 'react-navigation-tabs/src/utils/withDimensions';
import {black} from 'react-native-paper/src/styles/colors';
import {colors, Icon} from 'react-native-elements';
import {List, ListItem} from 'native-base'
import ImagePicker from 'react-native-image-picker';
import {updateMyProfile} from '../../redux/actions/user.action';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';

class ModifyImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: props.navigation.state.params.lien,
            modal: false,
        };
    }
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
        return (
            <View
                style={styles.view}
            >
                <Image source={this.state.link}
                       style={styles.image}

                />
                <View style={styles.iconEdit} >
                    <TouchableOpacity onPress={() => {
                        this.setState({modal: true})
                        console.log('modif click')
                    }}
                    >
                        <Icon name='pencil' color={Colors.white} style={{elevation:30}}  size={30} type='font-awesome'/>
                    </TouchableOpacity>
                </View>
                <Modal
                    transparent={true}
                    visible={this.state.modal}
                    animationType={'fade'}
                    onRequestClose={()=>{
                        this.setState({modal: false})
                    }}
                >
                    <View style={styles.Modal}>
                        <List>
                            <ListItem
                                onPress={() => {
                                    ImagePicker.showImagePicker({}, response => {
                                        if (response.didCancel) {
                                            alert('vous avez annuler le chargement de l\'image');
                                        } else if (response.error) {
                                            alert('nous ne parvenons pas a recuperer ce fichier');
                                        } else {
                                            let requireSource = {uri: response.uri};

                                            let dataOfImage = {
                                                uri: response.uri,
                                                name: response.fileName,
                                                type: response.type,
                                                path: response.path,
                                                size: response.fileSize,
                                                pathOrigine: response.origURL,
                                                dimesion: {
                                                    width: response.width,
                                                    height: response.height,
                                                },
                                            }

                                            let credentials = {
                                                profilUrl: response.uri
                                            };

                                            this.props.UpdateMyProfile(
                                                this.props.user._id,
                                                credentials,
                                                this.onSuccess,
                                                this.onFailled,
                                                this.notifMessage,
                                            );
                                            this.setState({link: requireSource});
                                        }
                                    });
                                }}
                            >
                                <Text>changer votre profil</Text>
                            </ListItem>
                            <ListItem
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                            >
                                <Text>Quitter</Text>
                            </ListItem>
                            <ListItem
                                onPress={() => {
                                    this.setState({modal: false})
                                }}>
                                <Text>Fermer</Text>
                            </ListItem>
                        </List>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    view: {
        backgroundColor: black,
        flex: 1,
        justifyContent: 'center',
    },iconEdit: {
        position: 'absolute',
        top: 50,
        elevation: 30,
        right: 25,
    },
    icone: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Modal: {
        backgroundColor: '#fffffd',
        marginTop: 10,
        position: 'absolute',
        right: 10,
        width: 190,
        height: 190,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
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

export default connect(mapStateToprops, mapDispatchToProps) (ModifyImage)
