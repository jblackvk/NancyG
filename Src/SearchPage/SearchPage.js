import React from 'react';
import {
    View,
    FlatList,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';
import {} from 'react-native-paper';
import Publication from '../Publication/Publication';
import {IconButton} from 'react-native-paper';
import {Colors} from 'react-native-paper';
import SearchNavigator from '../Navigation/TabNavigationSearch';


export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHeader: true,
        };
    }

    setHeader = () => {
        return(
            <View style={[styles.header, styles.alignH]}>
                <View style={[styles.alignH, {flex: 1, justifyContent: 'space-between'}]}
                      display={this.state.showHeader === true ? 'flex' : 'none'}>
                    <Image source={require('../IMG/Jiraya.png')}
                           resizeMode={'cover'}
                           style={[styles.avatar]}
                    />

                    <View style={[styles.alignH, {justifySelf: 'flex-end'}]}>
                        <IconButton icon={'magnify'}
                                    size={30}
                                    onPress={() => {
                                        this.setState({showHeader: false});
                                    }}
                        />
                        <IconButton icon={'settings'}
                                    size={30}
                        />
                    </View>
                </View>
                <View
                    style={[styles.header]}
                    display={this.state.showHeader === false ? 'flex' : 'none'}>
                    <TextInput
                        placeholder={'Entrez ce que vous voulez chercher'}
                        style={[styles.searchBar]}
                        inlineImageLeft='magnify'
                        inlineImagePadding={20}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={[styles.header, styles.alignH]}
                      display={this.state.showHeader === true ? 'flex' : 'none'}
                >
                    <View style={[styles.alignH,
                        {flex: 1, justifyContent: 'space-between'}]}
                          >
                        <TouchableOpacity onPress={
                            () => {
                                const user = {
                                    nom : 'Jack Reacher',
                                    profilUrl: this.state.sender.profilUrl,
                                    pseudo: this.state.sender.pseudo,
                                    nombreAbonne: this.state.sender.nbreAbonnes,
                                    nombreAbonnement: this.state.sender.nbreAbonnements,
                                    email: this.state.sender.mail,
                                };
                                this.props.navigation.navigate('Profil', {user: user});
                            }
                        }
                        >
                            <Image source={require('../IMG/Jiraya.png')}
                                   resizeMode={'cover'}
                                   style={[styles.avatar]}
                            />
                        </TouchableOpacity>

                        <View style={[styles.alignH, {justifySelf: 'flex-end'}]}>
                            <IconButton icon={'magnify'}
                                        size={30}
                                        onPress={() => {
                                            this.setState({showHeader: false});
                                        }}
                            />
                            <IconButton icon={'settings'}
                                        size={30}
                            />
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor: Colors.white,
                    width: Dimensions.get('screen').width,

                }}
                    display={this.state.showHeader === false ? 'flex' : 'none'}>
                    <TextInput
                        placeholder={'Entrez ce que vous voulez chercher'}
                        style={[styles.searchBar]}
                        inlineImageLeft='magnify'
                        inlineImagePadding={20}
                    />
                </View>
                <View style={[{flex: 11,}]}>
                    <SearchNavigator />
                </View>
            </View>
        );
    }
}
const imgSize = 45;


const styles = StyleSheet.create({
    searchBar: {
        borderColor: Colors.yellow500,
        textAlign:'center',
        color: Colors.green900,
        marginLeft: 25,
        marginTop: 10,
        width: Dimensions.get('screen').width - 50,
        marginBottom: 10,
        // borderBottomColor: '#0000f5',
        height: 40,
        borderWidth: 0.8,
        borderRadius: 25,
        paddingLeft: 20,
    },
    header: {
        backgroundColor: Colors.white,
        width: Dimensions.get('screen').width,
        flex: 1,
    },
    alignH: {
        display: 'flex',
        flexDirection: 'row',
    },
    avatar: {
        height: imgSize,
        width: imgSize,
        borderRadius: 25,
        resizeMode: 'cover',
        marginLeft: 15,
    },
});

