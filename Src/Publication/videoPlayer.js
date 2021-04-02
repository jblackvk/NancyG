import React from 'react';
import {View,Text, Platform, StyleSheet} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

export default class VideoPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: props.url,
            currentTime: 0,
            duration: 0,
            isFullScreen: true,
            isLoading: true,
            paused: true,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'content',
        };
    }

    onSeek = seek => {
        this.videoPlayer.seek(seek)
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
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const { isLoading, playerState} = this.state;
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({
                currentTime: data.currentTime
            });
        }

    };

    onLoad = data => this.setState({
        duration : data.duration,
        isloading: false,
    });

    onLoadStart = data => this.setState({
        isLoading: true,
    });

    onEnd = () => this.setState({
        playerState: PLAYER_STATES.ENDED
    });

    exitFullScreen = () => {
        alert('Sortir du Plein Ecran')
    };

    enterFullScreen = () => {

    };

    onError = () => {alert('Oups Erreur: ', error)};

    onFullScreen = () => {
        if (this.state.screenType === 'content') {
            this.setState({screenType: 'cover'});
        }else {
            this.setState({screenType: 'content'})
        }
    };

    renderToolbar = () => {
        <View>
            <Text>toolbar</Text>
        </View>
    };

    onSeeking = currentTime => this.setState({currentTime: currentTime});


    render() {
        return (
            <View style={styles.container}>
                <Video
                    onEnd={this.onEnd}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    paused={this.state.paused}
                    onError={this.onError}
                    resizeMode={this.state.screenType}
                    onFullScreen={this.state.isFullScreen}
                    ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                    source={this.state.url}
                    style={styles.videoPlayer}
                    volume={10}
                />
                <MediaControls
                    duration={this.state.duration}
                    isLoading={this.state.isloading}
                    onFullScreen={this.onFullScreen}
                    onPaused={this.onPaused}
                    onReplay={this.onReplay}
                    onSeek={this.onSeek}
                    onSeeking={this.onSeeking}
                    playerState={this.state.playerState}
                    progress={this.state.currentTime}
                    toolbar={this.renderToolbar()}
                />
            </View>
        );
    };


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    videoPlayer: {
        width: 270,
        height: 280,
        resizeMode: 'cover',
        backgroundColor: 'black',
    }
});