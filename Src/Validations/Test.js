import React from 'react';
import {Text, View} from 'react-native';


export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        return(<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text> Vous n'avez pas encore de publication !</Text>
        </View>)
    }
}