import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Button, TouchableOpacity,
} from 'react-native';
import {Colors, } from 'react-native-paper';
import {accessibilityProps} from 'react-native-paper/src/components/MaterialCommunityIcon';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {authReducer} from '../../redux/reducers/auth.reducer';

const widthScreen = Dimensions.get('screen').width;

 class Profil extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            image: props.user.profilUrl === '' ?  require('../IMG/person_120px.png') : {uri: props.navigation.state.params.user.profilUrl},
            couverture: require('../IMG/2.jpg') ,
            nom:  props.user.nom,
            pseudo:  props.user.pseudo,
            nombreAbonne:  props.user.nombreAbonne,
            nombreAbonnement:  props.user.nombreAbonnement,
            sexe: 'M',
            email:  props.user.mail,
            listeAbonne: props.user.listeAbonnes,
            listeAbonnement: props.user.listeAbonnements,

        }

        /*this.state = {
            image: require('../IMG/person_120px.png'),
            couverture: require('../IMG/2.jpg') ,
            nom:  'JackReacher',
            pseudo:  'the Ripper',
            nombreAbonne:  30,
            nombreAbonnement:  2000,
            sexe: 'M',
            email:  'JackReacher@theRipper.com',
        }*/
        console.log("auth reducer: ", props.user);

    }

    hacherMail = (mail) => {
        var length = mail.toString().length;
        if (length < 15) {
            return mail;
        }else {
            return mail.toString().substr(0,7) + '...' + mail.toString().substring(length -10, length)
        }
    }


    render() {
        return(
            <ScrollView style={{backgroundColor: Colors.white}}>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('EditProfil',{user: this.props.user})
                }}
                >
                    <Icon name='pencil' iconStyle={styles.iconEdit} size={30} color={borderColor} type='font-awesome'/>
                </TouchableOpacity>
                <TouchableHighlight onPress={() => {
                    this.props.navigation.navigate('ModifyImage',{lien: this.state.image})
                }}>
                    <Image source={this.state.image}
                           style={styles.profilePhoto}
                    />
                </TouchableHighlight>
                <Text style={styles.name}>{this.state.nom}</Text>
                <Text style={styles.pseudo}> @{this.state.pseudo}</Text>
                <View style={styles.alignVertical}>
                    <View style={[styles.center, styles.repulseFromBorder]}>
                        <Text style={styles.labelNumber}>Abonnements</Text>
                        <TouchableOpacity onPress={
                            () => {
                                console.log('abonement');
                                this.props.navigation.navigate('ListUser', { list: this.state.listeAbonnement})

                            }
                        }>
                            <Text style={styles.number}>{this.state.nombreAbonnement}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.center, styles.repulseFromBorder]}>
                        <Text style={styles.labelNumber}>Abonnés</Text>
                        <TouchableOpacity onPress={
                            () => {
                                console.log('abone');
                                this.props.navigation.navigate('ListUser', {list: this.state.listeAbonne})

                            }
                        }>
                            <Text style={styles.number}>{this.state.nombreAbonne}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.alignVertical,{
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}
                >
                    <TextInput value={this.hacherMail(this.state.email)}
                               inlineImageLeft={'pencil'}
                               autoCompleteType={'email'}
                               textContentType={'emailAddress'}
                               textAlign={'center'}
                               editable={false}
                               style={[styles.textInput]}
                               onChangeText={text => this.setState({email: text})}
                    />
                    <TouchableOpacity
                        style={styles.Bouton}
                        onPress={
                        () => this.props.navigation.navigate('Email',{message: 'Veuillez entrer votre Nouvel Email'})
                    }
                    >
                        <Text style={styles.textBoutton}>
                            modifier
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.alignVertical,{justifyContent: 'center', alignItems: 'center'}]}>
                    <TextInput value={this.state.email}
                               textAlign={'center'}
                               editable={false}
                               secureTextEntry={true}
                               style={[styles.textInput,{ fontSize: 13}]}
                               onChangeText={text => this.setState({email: text})}
                    />
                    <TouchableOpacity
                        style={styles.Bouton}
                        onPress={() => this.props.navigation.navigate('NewPassword')}>
                        <Text
                            style={styles.textBoutton}
                        >
                            modifier
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const radiusProfilePhoto = 200;
const borderSize = 7;
const borderColor = '#FFDB58';
const imageOpacity = 0.7;
const marge = 10;
const nameSize = 30;
const floueColor = Colors.blueGrey500;
const styles = StyleSheet.create({
    couverture: {
        width: widthScreen + 2 * borderSize,
        height: 200 + 2 * borderSize,
        resizeMode: 'cover',
        marginHorizontal: -borderSize,
        marginTop: -borderSize,
        borderWidth: borderSize,
        borderColor: borderColor,
    },
    profilePhoto: {
        width: radiusProfilePhoto,
        height: radiusProfilePhoto,
        borderRadius: radiusProfilePhoto/2 ,
        borderColor: borderColor,
        borderWidth: borderSize,
        // marginTop: -radiusProfilePhoto/2,
        marginTop: radiusProfilePhoto/4,
        shadowColor: Colors.green500,
        backgroundColor: Colors.grey200,
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
        fontSize: nameSize - 13,
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
        margin: marge,
        justifyContent: 'space-between',
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
        fontSize: 17
    },
    iconEdit: {
        marginBottom: -100,
        alignSelf: 'flex-end',
        marginRight: 35
    },
    textInput: {
        fontSize:22,
        marginRight: 25,
    },
    Bouton: {
        borderRadius: 25,
        width: 90,
        height: 30,
        backgroundColor: '#FFDB20',
        justifyContent: 'center'
    },
    textBoutton: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 17,
    },
})

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
};


// export default Profil;
export default connect(
    mapStateToProps,
)(Profil)
