import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    Modal,
    Animated,
    ScrollView,
    TextInput,
    Dimensions,
    Alert, ActivityIndicator,
} from 'react-native';
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    List,
    ListItem,

} from 'native-base';
import Imagedatas from './Imagedata';
import Discussion from './Discussion';
import {Colors} from 'react-native-paper';
import {connect} from 'react-redux';
import {
    getPublications,
    ParseDataFromBackend,
} from '../../../redux/actions/publication.actions';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AutoScrolling from 'react-native-auto-scrolling';
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet';
import Publication from '../../Publication/Publication';
import {showMessage} from 'react-native-flash-message';
MaterialCommunityIcons;

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
let Nbre;
const options = [
    {
        component:
            <View
                style={{flex: 1, flexDirection: 'row', marginLeft: -Dimensions.get('screen').width / 2, marginTop: 15}}>
                <View>
                    <AntDesign name='close' size={25} color='black'/>
                </View>
                <View>
                    <Text style={{color: 'black', fontSize: 17, marginLeft: 10}}>Fermer</Text>
                </View>
            </View>,

        height: 50,
    },
    {
        component:
            <View
                style={{flex: 1, flexDirection: 'row', marginLeft: -Dimensions.get('screen').width / 4, marginTop: 15}}>
                <View>
                    <MaterialCommunityIcons name='information-outline' size={25} color='black'/>
                </View>
                <View>
                    <Text style={{color: 'black', fontSize: 17, marginLeft: 10}}>Infos de la communauté</Text>
                </View>
            </View>,

        height: 50,
    },
    {
        component:
            <View
                style={{flex: 1, flexDirection: 'row', marginLeft: -Dimensions.get('screen').width / 2, marginTop: 10}}>
                <View>
                    <AntDesign name='search1' size={25} color='black'/>
                </View>
                <View>
                    <Text style={{color: 'black', fontSize: 17, marginLeft: 10}}>Rechercher</Text>
                </View>
            </View>,

        height: 50,
    },
];
const title = <Text style={{color: 'crimson', fontSize: 18}}>Menu</Text>;


class Com_Discussion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '0',
            show: true,
            showPostBox: false,
            modalShow: false,
            isLoading: false,
            data: [],
            scroll: 'flex',
            has_more: true, // to know if there is next page for loading
            next_page: 1, // current page
            refresh: false,
        };
        this.nbrePublication = 0;
        this.totalPublication = 0;
        this.nbrePage = 0;
        this.page = 0;
        this.asc = 'ascend';
        this.des = 'descend';
        this.idCommunaute = props.navigation.state.params.id

        console.log(this.idCommunaute)
    }

    componentDidMount() {
        this.setState({isLoading: !this.state.isLoading});
        //je passe les args , puis mes callback defini
        //je je veux passer la page , je le fait dans le premier argument

        this.props.GetPublications(
            {},
            this.idCommunaute,
            this.onSuccess,
            this.onFailled,
            this.notifMessage,
        );
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data) {
            return {
                refresh: !state.refresh,
                data: props.data,
            };
        }
        return null;
    }
    /*UNSAFE_componentWillReceiveProps(nextProps) {
      // This will erase any local state updates!
      // Do not do this.
      this.setState({data: ParseDataFromBackend(nextProps.publications)});
    }*/

    /*componentWillReceiveProps(nextProps) {
            // This will erase any local state updates!
            // Do not do this.
            this.setState({data: ParseDataFromBackend(nextProps.publications)});
        }*/

    /*componentDidMount() {
      this.props.getPublications();
    }

    _onLoading() {
      if (this.state.isLoading) {
        return (
          <view>
            <ActivityIndicator size={'large'} />
          </view>
        );
      }
    }*/


//getPublication(idUser, page) {
    /*todo verifier et modifier ce code avec le backend*/
    /* this.props.getPublications({page: page});
   }

   _loadPublication(mode) {
     this.setState({isLoading: true});
     if (mode === 'ascend') {
       this.getPublication(this.page).then(newData => {
         this.page++;
         const dataAdd = [...this.state.data, ...newData];
         this.setState({data: dataAdd});*/
    /*todo verifier et modifier ce code avec le backend*/
    /*     this.setState({isLoading: false});
       });
     } else if (mode === 'descend') {
       this.getPublication(this.page).then(newData => {
         this.page++;
         const dataAdd = [...newData, ...this.state.data];
         this.setState({data: dataAdd});*/
    /*todo verifier et modifier ce code avec le backend*/
    /*   this.setState({isLoading: false});
     });
   }
 }

 _updatePublication() {
   this.page = 0;
   this.nbrePage = 0;
   this.setState(
     {
       data: [],
     },
     () => {
       this._loadPublication(this.des);
     },
   );
 }

 _seePublication = (data, item) => {*/
    /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
    /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
    /*  this.props.navigation.navigate('CommentPublication', {
        data: data,
        item: item,
      });
    };

    _seeImage = item => {
      this.props.navigation.navigate('ImageOnly', {
        type: item.typeMedia,
        lien: item.image,
      });
    };

    _seeVideo = (data, item) => {
      this.props.navigation.navigate('ImageOnly', {data: data, item: item});
    };
    _seeAudio = (data, item) => {
      this.props.navigation.navigate('ImageOnly', {data: data, item: item});
    };
    _addCommentaire = item => {*/
    /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
    /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
    /*  this.props.navigation.navigate('AddCommentaire', {item: item});
    };
    _createMessage = () => {
      this.props.navigation.navigate('CreateMessage');
    };
    iconColor = '#FFDB58';*/


    showActionSheet = () => this.actionSheet.show();

    getActionSheetRef = ref => (this.actionSheet = ref);

    handlePress = index => {
        Nbre = index;
        let params = this.props.navigation.state.params;
        //this.setState({ selected: index })

        if (index == 1) {
            this.props.navigation.navigate('infosGroupe', {
                name: params.name,
                image: params.image,
                id: params.id,
                label: params.label,

                users_add: [],
                itemNumber: 0,
            });
        }
        if (index == 2) {
            this.setState({show: false});
        }
        if (index == 3) {
            Alert.alert(
                'Attention!',
                'Vous allez quitter la Communauté',
                [
                    {
                        text: 'Annuler',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => this.setState({modalShow: true})},
                ],
                {cancelable: false},
            );
        } else {

        }
    };
    goback = () => {
        if (this.state.showPostBox) {
            this.setState({showPostBox: false});
        }
        if (!this.state.showPostBox) {
            this.props.navigation.goback();
        }
    };

    _renderHeader = () => {
        let params = this.props.navigation.state.params;
        if (this.state.show) {

            return (
                <Header iosBarStyle={'dark-content'} style={{backgroundColor: 'white'}}>
                    <StatusBar backgroundColor="#FFDB58"
                               barStyle="light-content"/>
                    <Left>
                        <Button transparent onPress={() => this.goback()}>
                            <AntDesign name='arrowleft' size={24} color='#FFD700'/>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent onPress={() => this.props.navigation.navigate('TabNavigator')}>
                            <Text style={{fontSize: 17, color: '#FFB300'}}>{params.name}</Text>

                        </Button>
                    </Body>
                    <Right>

                        <Button transparent>
                            <FontAwesome5 name='users' size={24} color='#FFD700'/>
                        </Button>
                        <Button transparent>
                            <FontAwesome name='user' size={24} color='#FFD700'/>
                        </Button>
                        <Button transparent /*onPress={()=>this.props.navigation.openDrawer()}*/
                                onPress={this.showActionSheet}>

                            <Foundation name='indent-more' size={24} color='#FFD700'/>

                        </Button>
                    </Right>
                </Header>
            );
        }
        if (!this.state.show) {
            return (

                <View style={{height: 50}}>
                    <View style={{
                        flex: 1, flexDirection: 'row', height: 100,
                        marginLeft: 20, marginTop: 6, backgroundColor: '#fafafa',
                    }}>
                        <View style={{marginTop: 5}}>
                            <TouchableOpacity onPress={() => this.setState({show: true})}>
                                <AntDesign name='arrowleft' size={30} color='black'/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginRight: -50, marginLeft: 20, marginTop: 7}}>
                            <AntDesign name='search1' size={25} color='black'/>
                        </View>
                        <TextInput
                            placeholder={'Rechercher'}
                            autoFocus={true}
                            style={[styles.searchBar]}
                            //onChangeText={text => this.searchFilterFunction(text)}
                            inlineImagePadding={20}
                            inlineImageLeft='magnify'
                        />
                    </View>
                </View>
            );
        }
    };

    iconColor = '#FFDB58';
    iconSize = '45';
    postInput = () => {
        if (this.state.showPostBox) {
            return (
                <>
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                                borderBottomWidth: 0.4,
                            }}>
                            <TextInput
                                placeholder="Appuyez ici pour Creer une publication"
                                style={styles.textArea}
                                multiline
                                numberOfLines={5}
                                blurOnSubmit={true}
                                underlineColorAndroid={'transparent'}
                                maxLength={200}
                                autoFocus={true}
                                //onAccessibilityTap={this._createMessage}
                            />
                            <View style={styles.icone}>
                                <View style={styles.header_container}>
                                    <View style={styles.content_container}>
                                        <Button transparent style={{marginLeft: 2}}>
                                            <FontAwesome5 name='share-square' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                    <View style={styles.content_container}>
                                        <Button transparent>
                                            <FontAwesome5 name='share-alt' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                    <View style={styles.content_container}>
                                        <Button transparent>
                                            <FontAwesome5 name='camera' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                    <View style={styles.content_container}>
                                        <Button transparent>
                                            <MaterialIcons name='keyboard-voice' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <ActionSheet
                        ref={this.getActionSheetRef}
                        title={title}
                        //message="custom message custom message custom message custom message custom message custom message "
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress}
                    />
                </>
            );

        }
        if (!this.state.showPostBox) {
            return (
                <>
                    <ScrollView>
                        <View style={styles.main_container}>
                            <View style={styles.content_container}>
                                <View style={styles.date_container}>
                                    <TouchableOpacity style={styles.Touch1}
                                                      onPress={() => this.setState({showPostBox: true})}>
                                        <Text
                                            style={{marginTop: 5, textAlign: 'center', fontSize: 18, color: '#FFB300'}}>
                                            Faire un post</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.header_container}>
                                    <View style={styles.content_container}>
                                        <Button transparent style={{marginLeft: 2}}>
                                            <FontAwesome5 name='share-square' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                    <View style={styles.content_container}>
                                        <Button transparent>
                                            <FontAwesome5 name='share-alt' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                    <View style={styles.content_container}>
                                        <Button transparent>
                                            <FontAwesome5 name='camera' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                    <View style={styles.content_container}>
                                        <Button transparent>
                                            <MaterialIcons name='keyboard-voice' size={22} color='#FFD700'/>
                                        </Button>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.content_container}>

                                <View style={styles.header_container}>
                                    <View style={styles.content_container}>
                                        <Image style={styles.image} source={require('../../IMG/5.jpg')}/>
                                    </View>
                                    <View style={styles.content_container}>
                                        <TouchableOpacity style={styles.Touch3}>
                                            <Text style={{
                                                fontSize: 16,
                                                textAlign: 'center',
                                                color: '#FFB300',
                                            }}>40000</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.date_container}>
                                    <TouchableOpacity style={styles.Touch4}>
                                        <Text style={{fontSize: 16, textAlign: 'center', color: '#FFB300'}}>Quitter la
                                            communauté</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <ScrollView scrollEventThrottle={1}>
                            <View style={{height: 170, marginTop: 10}}>
                                <View style={styles.main_container1}>
                                </View>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={Imagedatas}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({item}) => <Discussion Imagedata={item}
                                                                        navigation={this.props.navigation}/>}
                                    ListFooterComponent={this.renderFooter}/>


                            </View>
                            <View style={styles.main_container1}>
                            </View>
                        </ScrollView>
                        <ActionSheet

                            ref={this.getActionSheetRef}
                            title={title}
                            //message="custom message custom message custom message custom message custom message custom message "
                            options={options}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this.handlePress}
                        />

                        <Modal transparent={true}
                               visible={this.state.modalShow}
                               animationType="fade"
                               onRequestClose={() => {
                                   this.setState({modalShow: false});
                               }}
                        >
                            <View style={styles.Modal1}>
                                <Text style={{fontSize: 18, marginLeft: 30, marginRight: 15, marginTop: 50}}>
                                    fonctionnalitée indisponible </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({modalShow: false});
                                    }}>
                                    <Text style={{
                                        fontSize: 40,
                                        textAlign: 'center',
                                        marginTop: 20,
                                        color: 'red',
                                    }}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>

                        <View style={{marginBottom: 70}} >
                            {/*todo chercher a corriger le warning liee au conflit  entre scrollview et FlatList*/}
                            <FlatList
                                data={
                                    this.state.data.length
                                        ? [this.state.data[0] ,  ...this.state.data.slice(1)].sort((a, b)=> a._id > b._id ? -1 : 1)
                                        : []
                                }
                                extraData={this.state.refresh}
                                renderItem={({item}) => (
                                    <Publication
                                        item={item}
                                        data={this.state.data}
                                        seePublication={this._seePublication}
                                        addCommentaire={this._addCommentaire}
                                        seeImage={this._seeImage}
                                        navigation={this.props.navigation}
                                        // update={this.updatePublication()}
                                        first={true}
                                        comment={false}
                                    />
                                )}
                                onEndReachedThreshold={2}
                                onEndReached={() => {
                                    if (this.state.has_more && !this.state.isLoading) {
                                        this.props.GetPublications(
                                            {page: this.state.next_page},
                                            this.idCommunaute,
                                            this.onSuccess,
                                            this.onFailled,
                                            this.notifMessage,
                                        );
                                    }
                                }}
                                keyExtractor={item => item._id}
                                // ListFooterComponent={this.getFooter}
                                ListEmptyComponent={this.setEmpty}
                            />

                            {/*{this._onLoading()}*/}
                            {/* check if loading then loading */}
                            {this.state.isLoading && <ActivityIndicator color="#FFDB58" size={this.state.data.length === 0 ? 'large' : 'small' }  />}
                        </View>

                    </ScrollView>
                    <View style={styles.container1}>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('CreateMessage',{ idCommunaute: this.idCommunaute})
                        }}>
                            <Animated.View style={[styles.button, styles.menu]}>
                                <Feather name='edit-2' size={34} color='#FFD700'/>
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </>
            );
        }
    };

    setEmpty = () => {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                {!this.props.get_loading && (
                    <View
                        style={{
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('window').height / 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 15}}>
                            {' '}
                            Vous n'avez pas encore de publication !
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    onSuccess = data => {
        //access direct aux data
        console.log('on success begin',data);
        //console.log('data on success:', data.publications);
        var finish = data.publications.length === 0;
        //dont uses data in props
        var next_page = finish ? this.state.next_page : this.state.next_page + 1;
        this.setState({
            data: [...this.state.data,data],
            isLoading: !this.state.isLoading,
            has_more: !finish,
            next_page: next_page,
        });
        console.log('on success end!');
        //this.setState({isLoading: !this.state.isLoading});
    };
    onFailled = error => {
        this.setState({isLoading: !this.state.isLoading});
        showMessage({
            message: 'Notification',
            // le message . je pouvais aussi choisir statusText ou meme formater le body
            description: error.message,
            type: 'danger',
            icon: {
                icon: 'danger',
                position: 'left',
            },
            duration: 1000,
        });
    };

    //facultatif
    notifMessage = (data, error) => {
        if (data) {
            //je ne fais rien
            return;
        } else if (error) {
            //retourne le corps du message
            return error.message;
        }
    };


    render() {

        const {selected} = this.state;
        const selectedText = options[selected].component || options[selected];
        let params = this.props.navigation.state.params;
        //let translateY = new Value(300)

        return (
            <View>
                {this._renderHeader()}
                {this.postInput()}
            </View>

        );
    }
}


const imgSize = 45;
const styles = StyleSheet.create({

    Modal: {
        backgroundColor: '#fffffd',
        marginTop: 10,
        position: 'absolute',
        right: 10,
        width: 170,
        height: 250,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    Boutton: {
        backgroundColor: '#fffff0',

        height: 45,
    },
    Bouton: {
        backgroundColor: '#ffffe0',

        width: 10,
        marginVertical: 10,
        paddingVertical: 2,
        height: 35,
    },
    connexion: {
        marginVertical: 17,
        marginTop: 5,
        paddingLeft: 17,
    },
    main_container: {
        height: 75,
        flexDirection: 'row',
        marginTop: 30,


    },
    main_container1: {
        height: 10,
        marginTop: 17,
        backgroundColor: '#A9A9AF',
        position: 'relative',
        marginBottom: 10,

    },
    image: {
        width: 60,
        height: 75,
        backgroundColor: 'gray',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 0,
    },
    content_container: {
        flex: 1,

    },
    header_container: {
        flex: 1,
        flexDirection: 'row',

    },
    date_container: {
        flex: 1,

    },
    Touch1: {
        backgroundColor: '#ffffe0',
        width: 117,
        height: 40,
        marginLeft: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 2,
    },
    Touch2: {
        backgroundColor: '#ffffe0',
        width: 40,
        marginVertical: 10,
        paddingVertical: 2,
        height: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 2,

    },
    Touch3: {
        backgroundColor: '#ffffe0',
        borderRadius: 10,
        width: 100,
        marginVertical: 5,
        paddingVertical: 2,
        marginLeft: -25,
        height: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 2,
    },
    Touch4: {
        backgroundColor: '#ffffe0',
        borderRadius: 10,
        width: 100,
        height: 40,
        marginLeft: 65,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 2,
    },
    searchBar: {
        borderColor: Colors.black,
        textAlign: 'center',
        color: Colors.green900,
        marginLeft: 20,
        marginTop: 0,
        width: Dimensions.get('screen').width - 90,
        marginBottom: 10,
        height: 40,
        borderWidth: 0.8,
        borderRadius: 10,
        paddingLeft: 0,
    },
    Modal1: {
        backgroundColor: '#fffff0',
        bottom: 150,
        position: 'absolute',
        right: '10%',
        width: '80%',
        height: 150,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 30,
    },
    alignH: {
        display: 'flex',
        flexDirection: 'row',
    },
    textArea: {
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 20,
        paddingBottom: -20,
        fontSize: 18,
    },
    avatar: {
        height: imgSize,
        width: imgSize,
        borderRadius: 25,
        resizeMode: 'cover',
        marginLeft: 15,
    },
    container: {
        alignItems: 'center',
        bottom: 30,
        right: 30,
        position: 'absolute',
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 100,
        right: 20,
        position: 'absolute',
    },
    icone: {
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
        position: 'relative',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        opacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 30,
    },
    menu: {
        backgroundColor: Colors.yellow400,
    },
    check: {
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 30,
    },

});


const mapStateToprops = state => {
    return {
        // data: state.publicationReducer.publication,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        GetPublications: (args, idCommunaute, onSuccess, onFailled, notifMessage) => {
            return dispatch(
                // undifined pour dire que je ne connais pas l'id de la communauté
                getPublications(idCommunaute, args, {
                    onSuccess: onSuccess,
                    onFailled: onFailled,
                    notifMessage: notifMessage,
                }),
            );
        },
    };
};

/*const Book = liste.map((list)=>{
  <NancyComp nbreCommentaire={0} nbreUnlike={0} nbreResend={0} nbreLike={0} typePublication=""
texte_message = "bonjour pourquoi je ne sais pas quoi ecrire?" idParentPublication={ []}
listeCommentaires={[]}
listesLikes={[]}></NancyComp>
})*/

export default connect(
    mapStateToprops,
    mapDispatchToProps,
)(Com_Discussion);
