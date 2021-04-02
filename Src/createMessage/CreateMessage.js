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
    PostPublication,
    getPublications,
} from '../../redux/actions/publication.actions';
import {showMessage} from 'react-native-flash-message';
import DocumentPicker from 'react-native-document-picker';

class CreateMessage extends React.Component {
    iconSize = 35;
    iconColor = '#FFDB58';

    constructor(props) {

        super(props);
        this.state = {
            texte: '',
            image: [],
            audio: [],
            video: [],
            imageState: 'none',
            soundState: 'none',
            videoState: 'none',
            isLoading: false,
            idCommunaute: props.navigation.state.params ? props.navigation.state.params.idCommunaute : undefined,
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
                    images: this.state.image,
                };
            }
            if (this.state.audio.length !== 0) {
                obj = {
                    mediaType: 'AUD',
                    images: this.state.audio,
                };
            }
            if (this.state.video.length !== 0) {
                obj = {
                    mediaType: 'VID',
                    images: this.state.video,
                };
            }

            this.setState({isLoading: !this.state.isLoading});
            //on change le loader
            this.props.AddPublication({
                contenu: this.state.texte,
                ...obj,
            }, this.state.idCommunaute,
                this.onSuccess, this.onFailled, this.notifMessage);
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
            audio: [],
            video: [],
        });
        this.props.navigation.navigate('HomePage', {});
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

    launchAudioPicker = async (type) => {
        try {
            const res = await DocumentPicker.pick({
                type: [type],
            });

            this.setState({audio: [res]});
            this.setState({soundState: 'flex'});
            console.log(res);
        } catch (e) {
            if (DocumentPicker.isCancel(e)) {
                console.log(e);
                console.log(e.Error);
                showMessage({
                    message: 'error',
                    // le message . je pouvais aussi choisir statusText ou meme formater le body
                    description: e.toString(),
                    type: 'danger',
                    icon: {
                        icon: 'danger',
                        position: 'left',
                    },
                    duration: 1000,
                });
            }

        }
    };

    launchPicker = (options = {}, type) => {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                alert('vous avez annuler le chargement de l\'image');
            } else if (response.error) {
                alert('nous ne parvenons pas a recuperer ce fichier');
            } else {

                let dataOfImage;

                if (type === 'IMG') {
                    dataOfImage = {
                        uri: response.uri,
                        name: response.fileName,
                        typeForBackEnd: type,
                        type: response.type,
                        path: response.path,
                        size: response.fileSize,
                        pathOrigine: response.origURL,
                        dimesion: {
                            width: response.width,
                            height: response.height,
                        },
                    };
                    this.setState({
                        imageState: 'flex',
                        image: [...this.state.image, dataOfImage],
                    });
                } else if (type === 'VID') {
                    dataOfImage = {
                        path: response.path,
                        name: response.path.split('/').pop(),
                        uri: response.uri,
                        size: 1024000
                    };
                    console.log(dataOfImage)
                    this.setState({videoState: 'flex',
                        video: [...this.state.video, dataOfImage],
                    });
                }

            }
        });
    };

    render() {
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
                        {
                            this.state.audio.map((aud) => (
                                <Image source={require('../IMG/audio.jpg')}
                                       style={styles.image}
                                       display={this.state.soundState}
                                />
                            ))
                        }
                        {
                            this.state.video.map(vid => (
                                <Image
                                    style={styles.image}
                                    display={this.state.videoState}
                                    source={{uri: vid.uri}}
                                />
                            ))
                        }
                    </View>
                </View>
                <View style={styles.icone}>
                    {this.state.isLoading ? (
                        //en cours d'envoi
                        <ActivityIndicator/>
                    ) : (
                        <IconButton
                            icon={'send'}
                            size={this.iconSize}
                            color={this.iconColor}
                            disabled={
                                this.state.video.length === 0 &&
                                this.state.audio.length === 0 &&
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
                            this.state.video.length === 0 &&
                            this.state.audio.length === 0 &&
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
                            this.state.audio.length !== 0 ||
                            this.state.video.length !== 0
                        }
                        onPress={() => {
                            const optionsPicker = {
                                title: 'Choisir une Photo',
                                mediaType: 'photo',
                                quality: 1,
                                takePhotoButtonTitle: 'Prendre une photo',
                                chooseFromLibraryButtonTitle: 'Choisir depuis la gallerie',
                                permissionDenied: {
                                    title: 'Permissions non accordees',
                                    text: 'Nous avons besoin des autorisations pour utiliser votre camera',
                                },
                                allowsEditing: true,
                                storageOptions: {
                                    skipBackup: true,
                                },
                            };

                            this.launchPicker({}, 'IMG');
                        }}
                    />
                    <IconButton
                        icon={'video'}
                        size={this.iconSize}
                        color={this.iconColor}
                        disabled={
                            this.state.video.length !== 0 ||
                            this.state.audio.length !== 0 ||
                            this.state.image.length !== 0
                        }


                        onPress={() => {
                            // todo console.log('camera clicked');

                            const optionsPicker = {
                                title: 'Choisir une Video',
                                mediaType: 'video',
                                videoQuality: 'high',
                                durationLimit: 30,
                                takePhotoButtonTitle: 'Prendre une video',
                                chooseFromLibraryButtonTitle: 'Choisir depuis la gallerie',
                                permissionDenied: {
                                    title: 'Permissions non accordees',
                                    text: 'Nous avons besoin des autorisations pour utiliser votre camera',
                                },
                            };

                            this.launchPicker(optionsPicker, 'VID');
                            this.setState({videoState: 'flex'});


                        }}
                    />
                    <IconButton
                        icon={'microphone'}
                        size={this.iconSize}
                        color={this.iconColor}
                        disabled={
                            this.state.audio.length !== 0 ||
                            this.state.video.length !== 0 ||
                            this.state.image.length !== 0
                        }
                        onPress={() => {
                            this.launchAudioPicker(DocumentPicker.types.audio).then(r => console.log('launch'));
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
        AddPublication: (item, idCommunaute, onSuccess, onFailed, notifMessage) => {
            return dispatch(
                PostPublication({
                    publication: item,
                    idCommunaute: idCommunaute,
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
)(CreateMessage);

