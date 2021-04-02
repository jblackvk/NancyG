import React from 'react';
import {Image, View, StyleSheet, Dimensions, TouchableWithoutFeedback,} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {Colors, IconButton, ProgressBar} from 'react-native-paper';
import withDimensions from 'react-navigation-tabs/src/utils/withDimensions';
import {black} from 'react-native-paper/src/styles/colors';
import {colors} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

export default class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: props.url,
            loaded: false,
        };

        this.widthImage = 0;
        this.heightImage = 0;
        Image.getSize(this.state.link, this.onSucces, this.onFailed );

    }


    componentDidMount() {
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
        const h = Dimensions.get('screen').height
        const w = Dimensions.get('screen').width
        return (
            <View
                style={styles.view}
            >
                <Image source={{uri: this.state.link}}
                       style={[styles.image, {
                           width: w,
                           resizeMode: this.widthImage < w ? 'cover' : 'contain',
                           height: this.heightImage < h ? this.heightImage - 30 : h -30  ,
                       }]}
                       display={this.state.loaded ? 'flex': 'none'}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    image: {
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        resizeMode: 'cover',
        backgroundColor: Colors.black,
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
