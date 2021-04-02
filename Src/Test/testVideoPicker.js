import React from 'react';
import {Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';



export default class TestVideoPicker extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            linkVideo: '',
            video: false
        }
    }

    optionsPicker = {
        title: 'Select video',
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 30,
        storageOptions: {
            skipBackup: true,
        }
    }

    launchPicker = () => {

        ImagePicker.showImagePicker(this.optionsPicker, (response) => {
            if (response.didCancel) {
                alert('vous avez annuler le chargement de l\'image');
            } else if (response.error) {
                alert('nous ne parvenons pas a recuperer ce fichier');
            } else {
                let requireSource = {uri: response.uri};
                this.setState({
                    linkVideo : requireSource,
                    video: true,
                })

            }

            })

    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.launchPicker}>
                    <Icon name={'add'} />
                    <View style={{display: this.state.video ? 'flex' : 'none'}}>

                        <Video source={{uri: this.state.linkVideo}}
                               ref={(ref) => {
                                   this.player = ref
                               }}                                      // Store reference

                        style={style.backgroundVideo}
                        />

                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const style = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})
