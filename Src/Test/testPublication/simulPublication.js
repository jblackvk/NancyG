import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native-paper';


export default class SimulPublication extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ borderWidth: 2,}}>
                <View style={styles.container}>
                    <View style={styles.avatarBox} >
                        <Image source={require('../../IMG/person_120px.png')} style={styles.avatar}/>
                        <View style={[styles.barreRep,  ]}/>
                    </View>
                    <View style={styles.contenuBox}>
                        <View>
                            <View style={styles.titre}>
                                <View style={styles.align}>
                                    <Text style={styles.nom}>John legend</Text>
                                </View>
                                <View>
                                    <Text
                                        style={[
                                            styles.point,
                                            {
                                                height: 10,
                                                alignItems: 'stretch',
                                                justifyContent: 'center',
                                            },
                                        ]}>
                                        .
                                    </Text>
                                </View>
                                <View style={styles.align}>
                                    <Text style={styles.duree}>
                                        30s
                                    </Text>
                                </View>
                            </View>

                        </View>
                        <View style={{marginTop: 10, height: 400 }}>
                            <View style={styles.msgBox}>
                                <Text style={styles.texteMsg}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.green200,
        paddingTop: 20,
        borderColor: Colors.red200,
        borderWidth: 2,
        maxHeight: 800,
    },
    nom: {
        fontFamily: 'Slabo',
        fontSize: 16,
        fontWeight: 'bold',
    },
    duree: {
        fontFamily: 'calibri',
        fontSize: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignContent: 'center',
        color: Colors.grey500,
    },
    point: {
        fontFamily: 'calibri',
        fontSize: 22,
        marginLeft: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        color: Colors.grey900,
        textAlign: 'center',
    },
    align: {
        justifyContent: 'center',
    },
    localisation: {
        fontFamily: 'Lora-Italic',
        fontSize: 10,
        paddingLeft: 6,
        color: Colors.grey400,
    },
    texteMsg: {
        fontFamily: 'Slabo',
        fontSize: 16,
        paddingLeft: 2,
        marginRight: 20,
    },
    avatarBox: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    barreRep: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        flex: 1,
    },
    barreRepImg: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        height: 180,
    },
    barreRepAud: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        height: 230,
    },
    barreRepVid: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        height: 310,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 18,
    },
    contenuBox: {
        flex: 8,
        display: 'flex',
        flexDirection: 'column',
        marginRight: 20,
        resizeMode: 'cover',
        /*
            flexDirection: 'row',
        */
    },
    titre: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
    },

    msgBox: {
        flex: 8,
    },
    mediaBox: {
        maxHeight: 350,
        marginRight: 20,
        marginLeft: 3,
        marginTop: 15,
        width: 250,
        maxWidth: 260,
        borderWidth: 1,
        borderRadius: 10,
    },
});


