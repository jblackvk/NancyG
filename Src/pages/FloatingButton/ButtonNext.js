import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native'
import {AntDesign} from "react-native-vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class ButtonNext extends React.Component{
    render(){
        return(
            <TouchableOpacity></TouchableOpacity>
        );
    }
} 

const styles =StyleSheet.create({
    container:{
        alignItems:'center',
        position:'absolute',
    },
    button:{
        position:'absolute',
        width:60,
        height:60,
        borderRadius:60/2,
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:10,
        shadowColor:'#ffffD0',
        shadowOpacity:0.3,
        shadowOffset:{height:10}
    },
    menu:{
        backgroundColor:'#fdfea4',
    }
})