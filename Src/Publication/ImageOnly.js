import React from 'react';
import {Image, View, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import withDimensions from 'react-navigation-tabs/src/utils/withDimensions';
import {black} from 'react-native-paper/src/styles/colors';
import {colors} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

export default class ImageOnly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeMedia: props.navigation.state.params.type,
            link: props.navigation.state.params.lien,
            loaded: false,
        };
        console.log('type de fichiers: ', props.navigation.state.params.type);
        console.log('lien de l\'image', typeof(this.state.link));

        this.widthImage = 0;
        this.heightImage = 0;
    }
    componentDidMount() {
        Image.getSize(this.state.link, this.onSucces, this.onFailed );
    }

    onSucces = (data1, data2) => {
        this.widthImage = data1;
        this.heightImage = data2;
        this.setState({loaded: true})
        console.log(data1, data2)
    }

    onFailed = () => {
        showMessage({
            message: 'Notification',
            // le message . je pouvais aussi choisir statusText ou meme formater le body
            description: 'erreur lors du chargement de l\'image',
            type: 'danger',
            icon: {
                icon: 'danger',
                position: 'left',
            },
            duration: 600,
        });
    }

    render() {
        const h = Dimensions.get('window').height
        const w = Dimensions.get('window').width
        return (
            <View
                style={styles.view}
            >
                <Image source={{uri: this.state.link}}
                       style={[styles.image, {
                           width: this.widthImage < w ? this.widthImage : w,
                           height: this.heightImage < h ? this.heightImage : h  ,
                       }]}
                       display={this.state.loaded ? 'flex': 'none'}
                />
            </View>
        );
        /*if (this.state.typeMedia.trim() === 'IMG') {

        }
        if (this.state.typeMedia.trim() === 'VID') {
            return (
                <View style={[styles.view,
                    {
                        height: Dimensions.get('window').height,
                        justifyContent: 'center',
                    }]}>
                    <VideoPlayer video={this.state.link}
                                 ref={(r) => {
                                     this.player = r;
                                 }}
                                 thumbnail={require('../IMG/audio.jpg')}
                                 videoWidth={this.state.link.width}
                                 videoHeight={this.state.link.height}
                                 duration={this.state.link.duration}
                    />
                    <View style={styles.icone}>
                        <IconButton icon="play" color={Colors.white} onPress={() => this.player.resume()}/>
                        <IconButton icon="pause" color={Colors.white} onPress={() => this.player.pause()}/>
                        <IconButton icon="stop" color={Colors.white} onPress={() => this.player.stop()}/>
                    </View>
                </View>
            );
        }*/
    }
}

const styles = StyleSheet.create({
    image: {
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    view: {
        backgroundColor: black,
        flex: 1,
        justifyContent: 'center'
    },
    icone: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
