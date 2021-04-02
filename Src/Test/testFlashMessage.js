import React from 'react';
import {Button, View, StatusBar} from 'react-native';
import FlashMessage, {showMessage, hideMessage} from 'react-native-flash-message';
import AppContainer from '../Navigation/StackNavigation';
import Acceuil from '../pages/Acceuil';
import Accueil from '../pages/Accueil';


export default class TestFlashMessage extends React.Component{

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        StatusBar.setBarStyle("light-content");
        showMessage({
            message: 'Message',
            description: 'description',
            type: 'success',
            floating: true,
            icon: {
                icon: 'success',
                position: 'left',
            },

            duration: 2000,

        })
    }
    showMessage = () => {

    }

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                {/*<Button title={'Show Message'} onPress={
                    this.showMessage
                }/>*/}
                <Acceuil/>
                {/*<Accueil/>*/}
            </View>
        )
    }

}
