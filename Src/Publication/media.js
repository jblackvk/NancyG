import React from 'react';
import {Image, View, StyleSheet, Button, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
// import VideoPlayer from 'react-native-video-player';
import {IconButton} from 'react-native-paper';
// import Video from 'react-native-video';
// import VideoPlayer from './videoPlayer';
import VideoPlayer from '../VideoPlayer/videoPlayer';
//import {createThumbnail} from "react-native-create-thumbnail";


export default class Media extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            media: props.url,
            mediaTest: 'https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4',
            thumbnails: '../IMG/ICONE-VIDEO2.jpg',
            remote: true,
            heigth: 280,
            width: 270,
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
    }

    componentDidMount(): void {
        // if (this.state.type === 'VID') {
        //     createThumbnail({
        //         url: this.state.media[0].mediaUrl, // todo pour tester media remplacer media ici par mediaTest
        //         timeStamp: 3000,
        //         type: 'remote',
        //     }).then(reponse => {
        //         this.setState({
        //             thumbnails: reponse.path,
        //             remote: true,
        //         })
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // }
    }
    getData = () => {
      setTimeout(() => {
          this.setState({dataLoaded: false})
      }, 3000)
    };

    render() {
        const  seeMedia = this.props.seeMedia;
        if (this.state.type === 'IMG') {
            if (this.state.media.length === 1) {
                return (
                    <View style={styles.image}>
                        <TouchableWithoutFeedback onPress={() => {
                            seeMedia(this.state.media[0])
                        }}>
                            <Image source={{uri : this.state.media[0].mediaUrl}}
                                   style={styles.image}/>
                        </TouchableWithoutFeedback>
                    </View>
                );
            } else if (this.state.media.length === 2) {
                return (

                    <View style={styles.image}>
                        <View style={styles.linear}>
                            <TouchableWithoutFeedback onPress={() => {
                                seeMedia(this.state.media[0])
                            }}>
                                <Image source={{uri: this.state.media[0].mediaUrl}}
                                       style={[styles.imageBi, styles.roundTopLeft, styles.roundBottomLeft]}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {
                                seeMedia(this.state.media[1])
                            }} style={styles.image}>
                                <Image source={{uri: this.state.media[1].mediaUrl}}
                                       style={[styles.imageBi, styles.roundTopRight, styles.roundBottomRight]}/>

                            </TouchableWithoutFeedback>
                           </View>
                    </View>
                );
            } else if (this.state.media.length === 3) {
                return (
                    <View style={styles.image}>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <View style={styles.linear}>
                                <TouchableWithoutFeedback onPress={() => {
                                    seeMedia(this.state.media[0])
                                }} >
                                    <Image source={{uri: this.state.media[0].mediaUrl}}
                                           style={[styles.imageQuadri, styles.roundTopLeft]}/>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    seeMedia(this.state.media[1])
                                }}>
                                    <Image source={{uri: this.state.media[1].mediaUrl}}
                                           style={[styles.imageQuadri, styles.roundTopRight]}/>

                                </TouchableWithoutFeedback>
                                 </View>
                            <TouchableWithoutFeedback onPress={() => {
                                seeMedia(this.state.media[2])
                            }}>
                                <Image source={{uri: this.state.media[2].mediaUrl}}
                                       style={[styles.imageTri, styles.roundBottomLeft, styles.roundBottomRight]}/>

                            </TouchableWithoutFeedback>
                           </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.image}>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignContent: 'space-between',
                            }}>
                            <View style={styles.linear}>
                                <TouchableWithoutFeedback onPress={() => {
                                    seeMedia(this.state.media[0])
                                }}>
                                    <Image source={{uri: this.state.media[0].mediaUrl}}
                                           style={[styles.imageQuadri, styles.roundTopLeft]}/>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    seeMedia(this.state.media[1])
                                }}>
                                    <Image source={{uri: this.state.media[1].mediaUrl}}
                                           style={[styles.imageQuadri, styles.roundTopRight]}/>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.linear}>
                                <TouchableWithoutFeedback onPress={() => {
                                    seeMedia(this.state.media[2])
                                }}>
                                    <Image source={{uri: this.state.media[2].mediaUrl}}
                                           style={[styles.imageQuadri, styles.roundBottomLeft]}/>
                                </TouchableWithoutFeedback>
                               <TouchableWithoutFeedback onPress={() => {
                                   seeMedia(this.state.media[3])
                               }}>
                                   <Image source={{uri: this.state.media[3].mediaUrl}}
                                          style={[styles.imageQuadri, styles.roundBottomRight]}/>
                               </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                );
            }
        } else if (this.state.type === 'AUD') {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    // seeMedia(this.state.item)
                    console.log("seeing audio")
                    this.props.navigation.navigate('AudioPlayer', {
                        url : this.state.media[0].mediaUrl, // todo pour tester media remplacer media ici par mediaTest
                    })
                }}>

                    <View style={{display: 'flex'}}>
                        <Image source={ require('../IMG/ICONE-VIDEO1.png')}
                               style={styles.image}/>
                        <View style={styles.loader}>
                            {this.getConnectionOptionsView()}
                        </View>

                    </View>

                </TouchableWithoutFeedback>
            );
        } else if (this.state.type === 'VID') {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    // seeMedia(this.state.item)
                    this.props.navigation.navigate('VideoPlayer', {
                        url : this.state.media[0].mediaUrl, // todo pour tester media remplacer media ici par mediaTest
                    })
                }}>

                    <View style={{display: 'flex'}}>
                       {/* <VideoPlayer
                            thumbnail={require('../IMG/audio.jpg')}
                            endWithThumbnail={true}
                            video={{uri: this.state.media[0]}}
                            videoWidth={270}
                            videoHeight={280}
                            fullScreenOnLongPress={true}
                            ref={(r) => {
                                this.player = r;
                            }}
                        />
                        <Video
                            src={{uri: this.state.media[0]}}
                            thumbnail={require('../IMG/audio.jpg')}
                            />*/}
                            <Image source={ this.state.remote ? {uri: this.state.thumbnails} : require('../IMG/ICONE-VIDEO1.png')}
                                   style={styles.image}/>
                        <View style={styles.loader}>
                            {this.getConnectionOptionsView()}
                        </View>
                       {/* <View style={styles.icone}>
                            <IconButton icon="play" onPress={() => this.player.resume()}/>
                            <IconButton icon="pause" onPress={() => this.player.pause()}/>
                            <IconButton icon="stop" onPress={() => this.player.stop()}/>
                        </View>*/}
                    </View>

                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <View display={'none'}/>
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
        resizeMode: 'cover'

    },
    imageTri: {
        width: 250,
        height: 98,
        marginTop: 2,
        resizeMode: 'cover'

    },
    loader: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    imageQuadri: {
        width: 123,
        height: 98,
        resizeMode: 'cover'
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
        width: 260,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
    },
    video: {
        maxWidth: 270,
        maxHeight: 280,
        borderRadius: 10,
        marginRight: 20,
        alignItems: 'center',

    },
});
