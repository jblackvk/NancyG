import React from 'react';
import {View, StyleSheet} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player/index';
/*import Sound from 'react-native-sound';
import TrackPlayer from 'react-native-track-player';*/
import {white} from 'react-native-paper/src/styles/colors';
import {Colors, IconButton} from 'react-native-paper';



export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.navigation.state.params.url,
            currentPositionSec: 0,
            currentDurationSec: 0,
            paused: false,
            playTime: 0,
            duration: 0,
        }
        /*this.soundPlayer = new Sound(this.state.url, Sound.MAIN_BUNDLE, (error => {
        }))
        this.startPlayer()*/
    }

    componentDidMount() {
    }

/*
    startPlayer = async () => {
        const msg = await this.audioRecorderPlayer.startPlayer(this.state.url).then(value => {
            console.log('value for start', value)
        });

        this.audioRecorderPlayer.addPlayBackListener((event) => {
            if (event.current_position == event.duration) {
                this.audioRecorderPlayer.stopPlayer();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration))
            })
        })
    }
*/
/*
    startPlayer = () => {
        TrackPlayer.setupPlayer().then(
            () => {

                var track = {
                    id: 0,
                    url: this.state.url,
                }
                TrackPlayer.play()
            }
        )
    }

    componentWillUnmount() {

    }

    pausePlayer = async () => {
        await this.audioRecorderPlayer.pausePlayer().then(value => {
            console.log('value for pause', value)
        });
        this.setState({
            paused: true
        })
    }

    resumePlayer = async () => {
        this.audioRecorderPlayer.resumePlayer().then(value => {
            console.log('value for resume', value)
        });
        this.setState({
            paused: true
        })
    }

    stopPlayer = async () => {
        this.audioRecorderPlayer.stopPlayer().then(value => {
            console.log('value for start', value)
        });
        this.audioRecorderPlayer.removePlayBackListener();
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.principalSpace}>
                    <IconButton
                        icon={'play-circle'}
                        style={style.centralButton}
                    />
                </View>
                <View style={style.configBar}>
                    <IconButton
                        icon={this.state.paused? 'play': 'pause'}
                        onPress={() => {
                            if (this.state.paused) {
                                this.resumePlayer()
                            } else {
                                this.pausePlayer()
                            }
                        }}
                    />
                </View>
            </View>
        );
    }*/
}

const buttonSize = 300
const style = StyleSheet.create({
    container : {
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.black,
    },
    principalSpace: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 9
    },
    centralButton: {
        width: buttonSize,
        height: buttonSize,
        tintColor: white
    },
    configBar: {
        flex: 1,
        marginVertical: 10
    }
})
