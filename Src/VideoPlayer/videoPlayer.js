import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {Colors} from 'react-native-paper';


export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.navigation);
        this.state = {
            url: props.navigation.state.params.url,
            thumbnails: '../IMG/1.jpg',
            currentTime: 1,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'contain',
            muted: false,
            volume: 10,
            widthVideo: Dimensions.get('screen').width,
            heightVideo: 200,
        };
    }

    onSeek = seek => {
        this.video.seek(seek);
    };
    onPaused = playerState => {
        this.setState({
            paused: !this.state.paused,
            playerState: playerState,
        });
    };
    onReplay = playerState => {
        this.setState({
            playerState: PLAYER_STATES.PLAYING,
        });
        this.video.seek(0);
    };
    onProgress = (data) => {
        const {isLoading, playerState} = this.state;
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({
                currentTime: data.currentTime,
            });
        }

    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true});
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus});
    };

    onLoad = data => {
        this.setState({
            duration: data.duration,
            isLoading: false,
            widthVideo: data.naturalSize.width > this.state.widthVideo ? this.state.widthVideo : data.naturalSize.width,
            heightVideo: data.naturalSize.height > Dimensions.get('screen').height ? Dimensions.get('screen').height : data.naturalSize.height,
            screenType: 'cover',

        });
        console.log(data);
    };

    onLoadStart = data => {
        this.setState({
            isLoading: true,
            // duration: this.state.duration + data.duration,
        });
    };

    onSetVolume = vol => {
        this.setState({
            volume: vol,
        });
    };

    onSetMute = () => {
        this.setState({
            muted: !this.state.muted,
        });
    };

    onEnd = () => {
        this.setState({
            isLoading: false,
            playerState: PLAYER_STATES.ENDED,
        });
    };

    onFullScreen = () => {
        if (this.state.screenType === 'cover') {
            this.setState({
                isFullScreen: true,
                screenType: 'contain',

            });
            this.video.presentFullscreenPlayer();
        }
         else {
            this.setState({
                screenType: 'cover',
                isFullScreen: false,
            });
            this.video.dismissFullscreenPlayer();
        }
    };

    onSeeking = (currentTime) => {
        this.setState({
            currentTime: currentTime,
        });
    };

    onError = (error) => {
        alert('Une erreur est survenue :' + error);
    };

    renderToolbar = () => {
        <View>
            <Text>toolbar</Text>
        </View>;
    };

    render() {
        return (
            <View style={styles.containe}>
                <Video
                    source={{uri: this.state.url}}
                    ref={video => this.video = video}
                    onEnd={this.onEnd}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    paused={this.state.paused}
                    muted={this.state.muted}
                    onError={this.onError}
                    resizeMode={this.state.screenType}
                    fullscreen={this.state.isFullScreen}
                    fullscreenOrientation={'landscape'}
                    fullscreenAutorotate={true}
                    volume={this.state.volume}
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    onAudioFocusChanged={this.onAudioFocusChanged}
                    repeat={false}
                    style={[styles.videoPlayer, {
                        width: this.state.widthVideo,
                        height: this.state.heightVideo,
                    }]}
                />
                <MediaControls
                    duration={this.state.duration}
                    isLoading={this.state.isLoading}
                    onFullScreen={this.onFullScreen}
                    onPaused={this.onPaused}
                    onReplay={this.onReplay}
                    onSeek={this.onSeek}
                    onSeeking={this.onSeeking}
                    playerState={this.state.playerState}
                    progress={this.state.currentTime}
                    toolbar={this.renderToolbar}

                >

                </MediaControls>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    videoPlayer: {
        marginTop: -100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    containe: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.black,
    },
});