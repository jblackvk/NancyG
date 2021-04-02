import React from 'react';
import {} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player/index';

export default class AudioRecorder {

    constructor() {
        this.audioRecoderPlayer = new AudioRecorderPlayer();
    }

    // todo we can add verification permission...
    // todo for ios make it good
    startRecord = async (urlAndroid = 'sdcard/audio/nancy/sound.mp4') => {

        let recordSec = 0;
        let recordTime = 0 ;
        const result = await this.audioRecoderPlayer.startRecorder(urlAndroid);
        this.audioRecoderPlayer.addRecordBackListener((e) => {
            recordSec = e.current_position;
            recordTime = this.audioRecoderPlayer.mmss(
                Math.floor(e.current_position)
            );
        })
        return {
            recordSecs: recordSec,
            recordTime : recordTime,
            result: result
        }
    }

    stopRecord =  async () => {
        const result = this.audioRecoderPlayer.stopRecorder();

        this.audioRecoderPlayer.removeRecordBackListener();
        return {
            recordSecs: 0,
            result: result
        }
    }
}
