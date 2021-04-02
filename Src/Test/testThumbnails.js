import React from 'react';
import {Button, Image, Text, View, StyleSheet} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Colors} from 'react-native-paper';


export default class TestThumbnails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            url: '../IMG/ICONE-VIDEO2.jpg',
            remote: false,
            width: 200,
            height: 200,
            urlVideo: 'https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4',
        }
    }
    view() {
        createThumbnail({
            url: this.state.urlVideo,
            timeStamp: 3000,
            type: 'remote',
        }).then(reponse => {
            console.log(reponse);
            this.setState({
                url: reponse.path,
                height: reponse.height,
                width: reponse.width,
                remote: true,
            })
            }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
           <View style={{backgroundColor: Colors.blue50, alignItems: 'center'}}>
               <Text>Hello</Text>
               <Button title={'press me'} onPress={() => {
                   this.view();
                   console.log('click');

               }} />
               <Image source={ this.state.remote ? {uri : this.state.url} : require('../IMG/ICONE-VIDEO1.png') }
                      style={[styles.image, {width: this.state.width,height: this.state.height, resizeMode: 'cover'}]}
                      />
           </View>
        )
    }

}

const styles = StyleSheet.create({
    image: {
        borderRadius: 10,
        marginRight: 20,
        resizeMode: 'cover'
    },
})