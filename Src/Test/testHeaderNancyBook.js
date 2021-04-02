import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native-paper';



export default class TestHeaderNancyBook extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            image: require('../IMG/person_120px.png'),
            nom: 'Jack Reacher',
            pseudo: 'the black Mamba',
            nombreAbonne: 2000,
            nombreAbonnement: 378,
            sexe: 'M',
            nombrePost: 20,
            abonnerBool: true,
            me: false,
        }
    }

    activateAbonne = () => {
        this.setState({
            abonnerBool: !this.state.abonnerBool,
        })
    }

    render() {
        return(
            <View style={[styles.alignVertical, {borderBottomWidth: 0.5}]}>
                <View style={{
                    flex: 4,
                    marginHorizontal:20,
                    marginVertical: 15,
                }}>
                    <Image source={require('../IMG/person_120px.png')}
                           style={styles.profilePhoto}
                    />
                    <View>
                        <Text style={styles.name}>{this.state.nom}</Text>
                        <Text style={styles.pseudo}>{this.state.pseudo}</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'center',
                    marginHorizontal: 20,
                    flex: 7,
                }}>
                    <View style={[styles.alignVertical, { justifyContent: 'space-between'}]}>
                        <View style={styles.centerLabel}>
                            <Text style={styles.labelNumber}>Abonnement</Text>
                            <Text style={styles.number}>{this.state.nombreAbonnement}</Text>
                        </View>
                        <View style={styles.centerLabel}>
                            <Text style={styles.labelNumber}>Abonnés</Text>
                            <Text style={styles.number}>{this.state.nombreAbonne}</Text>
                        </View>
                    </View>
                    <View style={styles.centerLabel} >
                        <Text style={styles.labelNumber}>Nombre de Posts</Text>
                        <Text style={styles.number}>{this.state.nombrePost}</Text>
                    </View>
                    <View display={this.state.me ? 'none' : 'flex'}>
                        <TouchableOpacity
                            style={[styles.Bouton,{
                                backgroundColor: this.state.abonnerBool ?  '#FFDB58': Colors. white ,

                            }]}
                            onPress={
                                this.activateAbonne
                            }
                        >
                            <Text style={[styles.textBoutton,{
                                color: this.state.abonnerBool ? 'white' : Colors.green900,
                            }]}
                            >
                                {
                                    this.state.abonnerBool ? 'deja Abonné' : 'Abonnez vous'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}


const radiusProfilePhoto = 110;
const borderSize = radiusProfilePhoto/50;
const borderColor = '#FFDB58';
const imageOpacity = 0.7;
const marge = 10;
const nameSize = 25;
const floueColor = Colors.blueGrey500;
const styles = StyleSheet.create({
    profilePhoto: {
        width: radiusProfilePhoto,
        height: radiusProfilePhoto,
        borderRadius: radiusProfilePhoto/2 ,
        borderColor: borderColor,
        borderWidth: borderSize,
        shadowColor: Colors.green500,
        backgroundColor: Colors.grey200,
        marginTop: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    name: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: nameSize,
        marginVertical: marge,
        fontWeight: 'bold',

    },
    pseudo: {
        fontSize: nameSize - 11,
        marginTop: -(marge+7),
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        color: floueColor,
        fontStyle: 'italic',
    },
    alignVertical: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    center: {
        alignContent: 'center',
        alignItems: 'center',
    },
    repulseFromBorder: {
        marginHorizontal: 40,
        marginVertical: marge,
    },
    number: {
        fontStyle: 'italic',
        color: Colors.blueGrey900,
        fontSize: 15,
    },
    labelNumber: {
        fontSize: 17,
        marginVertical: 3,
        fontWeight: 'bold',
    },
    centerLabel: {
        alignItems: 'center',
        marginVertical: 10,
    },
    Bouton: {
        borderRadius: 25,
        width: 200,
        marginVertical: 10,
        height: 40,
    },
    textBoutton: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 19,
        marginVertical: 20,
        marginTop: 5,
    },
})
