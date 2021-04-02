import React from 'react';
import {Image, View, StyleSheet, Button, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {Colors, IconButton} from 'react-native-paper';
import Video from 'react-native-video';
// import VideoPlayer from './videoPlayer';

export default class Media extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            media: props.url == null ? [] : props.url,
            thumbnails: undefined,
            item: props.item,
            dataLoaded: true,
        };
    }

    getConnectionOptionsView = () => {
        if (this.state.dataLoaded === false) {
            return (
                <ActivityIndicator
                    color='#fff'
                    size='large'/>
            );
        }
    };

    /* componentDidMount(): void {
         this.getData();
     }
 */
    getData = () => {
        setTimeout(() => {
            this.setState({dataLoaded: false});
        }, 3000);
    };

    render() {
        const seeMedia = this.props.seeMedia;
        if (this.state.type === 'IMG') {
            if (this.state.media.length === 1) {
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        seeMedia(this.state.item);
                    }}>
                        <Image source={this.state.media[0]}
                               style={styles.image}/>
                    </TouchableWithoutFeedback>
                );
            } else if (this.state.media.length === 2) {
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        seeMedia(this.state.item);
                    }} style={styles.image}>
                        <View style={styles.linear}>
                            <Image source={this.state.media[0]}
                                   style={[styles.imageBi, styles.roundTopLeft, styles.roundBottomLeft]}/>
                            <Image source={this.state.media[1]}
                                   style={[styles.imageBi, styles.roundTopRight, styles.roundBottomRight]}/>
                        </View>
                    </TouchableWithoutFeedback>
                );
            } else if (this.state.media.length === 3) {
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        seeMedia(this.state.item);

                    }} style={styles.image}>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <View style={styles.linear}>
                                <Image source={this.state.media[0]}
                                       style={[styles.imageQuadri, styles.roundTopLeft]}/>
                                <Image source={this.state.media[1]}
                                       style={[styles.imageQuadri, styles.roundTopRight]}/>
                            </View>
                            <Image source={this.state.media[2]}
                                   style={[styles.imageTri, styles.roundBottomLeft, styles.roundBottomRight]}/>
                        </View>
                    </TouchableWithoutFeedback>
                );
            } else {
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        seeMedia(this.state.item);

                    }}>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignContent: 'space-between',
                            }}>
                            <View style={styles.linear}>
                                <Image source={this.state.media[0]}
                                       style={[styles.imageQuadri, styles.roundTopLeft]}/>
                                <Image source={this.state.media[1]}
                                       style={[styles.imageQuadri, styles.roundTopRight]}/>
                            </View>
                            <View style={styles.linear}>
                                <Image source={this.state.media[2]}
                                       style={[styles.imageQuadri, styles.roundBottomLeft]}/>
                                <Image source={this.state.media[3]}
                                       style={[styles.imageQuadri, styles.roundBottomRight]}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
        } else if (this.state.type === 'AUD') {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    seeMedia(this.state.item);

                }}>
                    <View style={styles.video}>
                        <VideoPlayer
                            thumbnail={require('../IMG/audio.jpg')}
                            endWithThumbnail={true}
                            video={this.state.media}
                            videoWidth={this.state.media.width}
                            videoHeight={this.state.media.height}
                            duration={this.state.media.duration}
                            ref={(r) => {
                                this.player = r;
                            }}
                        />
                        {/* <View style={styles.loader}>
                            {this.getConnectionOptionsView()}
                        </View>*/}
                        <View style={styles.icone}>
                            <IconButton icon="play" onPress={() => this.player.resume()}/>
                            <IconButton icon="pause" onPress={() => this.player.pause()}/>
                            <IconButton icon="stop" onPress={() => this.player.stop()}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else if (this.state.type === 'VID') {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    seeMedia(this.state.item);

                }}>
                    <View style={styles.video}>
                        <VideoPlayer
                        thumbnail={require('../IMG/audio.jpg')}
                        endWithThumbnail={true}
                        video={this.state.media}
                        videoWidth={this.state.media.width}
                        videoHeight={this.state.media.height}
                        duration={this.state.media.duration}
                        ref={(r) => {
                            this.player = r;
                        }}
                    />
                        {/* <View style={styles.loader}>
                            {this.getConnectionOptionsView()}
                        </View>*/}
                        <View style={styles.icone}>
                            <IconButton icon="play" onPress={() => this.player.resume()}/>
                            <IconButton icon="pause" onPress={() => this.player.pause()}/>
                            <IconButton icon="stop" onPress={() => this.player.stop()}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <View/>
            );
        }
    }
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 200,
        borderRadius: 10,
        marginRight: 20,
        resizeMode: 'cover',
    },
    linear: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    imageBi: {
        width: 123,
        height: 198,
        resizeMode: 'cover',

    },
    imageTri: {
        width: 250,
        height: 98,
        marginTop: 2,
        resizeMode: 'cover',

    },
    loader: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    imageQuadri: {
        width: 123,
        height: 98,
        resizeMode: 'cover',
    },
    roundTopLeft: {
        borderTopLeftRadius: 10,
    },
    roundTopRight: {
        borderTopRightRadius: 10,
    },
    roundBottomLeft: {
        borderBottomLeftRadius: 10,
    },
    roundBottomRight: {
        borderBottomRightRadius: 10,
    },
    icone: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    audio: {
        maxWidth: 260,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
    },
    video: {
        maxWidth: 270,
        maxHeight: 280,
        borderRadius: 10,
        marginRight: 20,
    },
});
