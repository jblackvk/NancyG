import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    Keyboard,
} from 'react-native';
import {
    Avatar,
    Card,
    Title,
    Paragraph,
    Button,
    IconButton,
    Colors,
    ActivityIndicator,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {Screen} from 'react-native-screens';
import KeyboardManager from 'react-navigation-stack/src/vendor/views/KeyboardManager';
import {connect} from 'react-redux';
import {
   AddComment
} from '../../redux/actions/publication.actions';
import {showMessage} from 'react-native-flash-message';

class CommentMessage extends React.Component {
    iconSize = 35;
    iconColor = '#FFDB58';

    constructor(props) {
        super(props);
        this.state = {
            texte: '',
            image: [],
            audio: null,
            video: null,
            imageState: 'none',
            soundState: 'none',
            videoState: 'none',
            isLoading : false,
            idParentPublication : props.navigation.state.params ? props.navigation.state.params.parent : props.idParentPublication,
        };
    }

    componentDidMount(): void {
    }


    submitPublication = () => {
        if (this.state.texte !== '') {
            var obj = {};
            if (this.state.image.length !== 0) {
                obj = {
                    mediaType: 'IMG',
                    images: this.state.image
                };
            }

            this.setState({isLoading: !this.state.isLoading});
            //on change le loader
            this.props.AddComment({
                contenu: this.state.texte,
                ...obj,
            }, this.state.idParentPublication, this.onSuccess, this.onFailled, this.notifMessage);
        }
    };


    onSuccess = data => {
        //on bascule le loader
        console.log('success');
        this.setState({isLoading: !this.state.isLoading});
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

        //c'est dans le onSuccess qu'on redirige
        this.textInput.clear();
        this.setState({
            texte: '',
            imageState: 'none',
            soundState: 'none',
            videoState: 'none',
            image: [],
            audio: null,
            video: null,
        });
        this.props.navigation.navigate('HomePage', {props: true});
    };
    onFailled = error => {
        //tu dois traiter l'erreur
        console.log('error: ', error);
        this.setState({isLoading: !this.state.isLoading});
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

    setImage() {
        for (var i = 0; i < this.state.image.length; i++) {
            return (
                <Image
                    style={styles.image}
                    display={this.state.imageState}
                    source={this.state.image[i]}
                />
            );
        }
    }

    render() {
        console.log("idPublicationParent" , this.state.idParentPublication);
        return (
            <View style={styles.mainView}>
                <View style={styles.comp}>
                    {this.props.errors && (
                        <Text style={styles.errorText}>
                            Erreurs l'ors du post de la question
                        </Text>
                    )}
                    <TextInput
                        ref={input => {
                            this.textInput = input;
                        }}
                        placeholder="posez votre question ici"
                        style={styles.textArea}
                        multiline
                        numberOfLines={6}
                        blurOnSubmit={true}
                        underlineColorAndroid={'transparent'}
                        maxLength={200}
                        autoFocus={true}
                        on
                        onfocus={() => {
                            this.props.underlineColor = 'transparent';
                        }}
                        onChangeText={text => {
                            this.setState({texte: text});
                        }}
                        value={this.state.texte}
                    />
                    <View style={styles.mediaView}>
                        {this.state.image.map(img => (
                            <Image
                                style={styles.image}
                                display={this.state.imageState}
                                source={{uri: img.uri}}
                            />
                        ))}
                        <Image
                            style={styles.image}
                            display={this.state.soundState}
                            source={this.state.audio}
                        />
                    </View>
                </View>
                <View style={styles.icone}>
                    {this.state.isLoading  ? (
                        //en cours d'envoi
                        <ActivityIndicator/>
                    ) : (
                        <IconButton
                            icon={'send'}
                            size={this.iconSize}
                            color={this.iconColor}
                            disabled={
                                this.state.video === null &&
                                this.state.audio === null &&
                                this.state.image.length === 0 &&
                                this.state.texte.length === 0
                            }
                            onPress={() => {
                                this.submitPublication();
                            }}
                        />
                    )}
                    <IconButton
                        icon={'send-circle-outline'}
                        size={this.iconSize}
                        color={this.iconColor}
                        disabled={
                            this.state.video === null &&
                            this.state.audio === null &&
                            this.state.image.length === 0 &&
                            this.state.texte.length === 0
                        }
                        onPress={() => {
                            this.submitPublication();
                        }}
                    />
                    <IconButton
                        icon={'camera'}
                        size={this.iconSize}
                        color={this.iconColor}
                        disabled={
                            this.state.image.length === 4 ||
                            this.state.audio !== null ||
                            this.state.video !== null
                        }
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

                                    this.setState({image: [...this.state.image, dataOfImage]});
                                    this.setState({imageState: 'flex'});
                                }
                            });
                        }}
                    />
                    <IconButton
                        icon={'video'}
                        size={this.iconSize}
                        color={this.iconColor}
                        disabled={
                            this.state.video !== null ||
                            this.state.audio !== null ||
                            this.state.image.length !== 0
                        }
                        onPress={() => {
                            // todo console.log('camera clicked');
                            this.setState({imageState: 'flex'});
                        }}
                    />
                    <IconButton
                        icon={'microphone'}
                        size={this.iconSize}
                        color={this.iconColor}
                        disabled={
                            this.state.audio !== null ||
                            this.state.video !== null ||
                            this.state.image.length !== 0
                        }
                        onPress={() => {
                           // todo console.log('microphone clicked');
                            this.setState({soundState: 'flex'});
                        }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToprops = state => {
    return {
        errors: state.publicationReducer.post_errors,
        loading: state.publicationReducer.loading,
        posted: state.publicationReducer.publication_posted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        AddComment: (item, idParentPublication, onSuccess, onFailed, notifMessage) => {
            return dispatch(
                AddComment({
                    idParentPublication : idParentPublication,
                    publication: item,
                    idCommunaute : undefined
                }, {
                    onSuccess: onSuccess,
                    onFailed: onFailed,
                    notifMessage: notifMessage,
                }),
            );

        },
    };
};

const radius = 20;
const imageObjectSize = Dimensions.get('window').width / 4 - 25;
const styles = StyleSheet.create({
    image: {
        borderRadius: radius,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        marginLeft: 10,
        marginRight: 10,
        height: imageObjectSize,
        width: imageObjectSize,
    },
    mediaView: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fafafa',
    },

    icone: {
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
        position: 'relative',
    },
    textArea: {
        paddingLeft: 40,
        paddingRight: 20,
    },
    comp: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 7,
        backgroundColor: '#fafafa',
        position: 'relative',
    },

    errorText: {
        color: 'red',
        alignSelf: 'center',
    },
    mainView: {
        backgroundColor: '#fafafa',
        justifyContent: 'space-between',
        //height: Dimensions.get('window').height,
        position: 'relative',
    },
});

export default connect(
    mapStateToprops,
    mapDispatchToProps,
)(CommentMessage);

