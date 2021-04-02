import React from 'react';
import Allfriends from './dataAllfriend';
import Com_CreateCommunity from './Components/Com_CreateCommunity';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Imagedatas from './Imagedata';
import {
    Header,
    Left,
    Button,
    Icon,
    Item,
    Input,
} from 'native-base';
import {
    StyleSheet,
    FlatList,
    View,
    StatusBar,
    Image,
    Text,
    Animated,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { FindNancyUser} from '../../../redux/actions/user.action';
import { addUsers} from '../../../redux/actions/community.actions';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

class AddUsersCom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            loading_users: false,
            loading_add:false,
            query: '',
            show: false,
            users_add:[],
            itemNumber:0,
        };
        this.arrayholder = Allfriends;
    }

    onSuccess_users = (data) => {
        this.setState({ 
            loading_users: !this.state.loading_users,
            data:data.users
          });
          
    
        console.log('onsuccess nancy users',data);
      };
    
      onFailled_users = (data) => {
        this.setState({ loading_users: !this.state.loading_users });
        console.log('onfailled nancy users',data)
      };
      notifMessage_users = (data, error) => {
        if (data) {
          return;
        }
        if (error) {
          return "Erreur lors du chargement des communautés";
        }
      };
    
      onFindNancyUser = (text) => {
          this.setState({ loading_users: !this.state.loading_users });
    
          this.props.FindNancyUsers(
          text,
          this.onSuccess_users,
          this.onFailled_users,
          this.notifMessage_users,
        );
      };


      onSuccess_add = (data) => {
        this.setState({ 
            loading_add: !this.state.loading_add,
          });
        this.props.navigation.navigate('infosGroupe',{
            users_add:this.state.users_add,
            itemNumber:this.state.itemNumber,
        })
    
        console.log('onsuccess add users',data,'users addkdjksjsk', this.state.users_add);
      };
    
      onFailled_add = (data) => {
        this.setState({ loading_add: !this.state.loading_add });
        console.log('onfailled add users',data)
      };
      notifMessage_add = (data, error) => {
        if (data) {
          return;
        }
        if (error) {
          return "Erreur lors du chargement des communautés";
        }
      };
    
      onAddUsers = (idCommunity,idUsers) => {
          this.setState({ loading_add: !this.state.loading_add });
    
          this.props.AddUsers(
          idCommunity,
          idUsers,
          this.onSuccess_add,
          this.onFailled_add,
          this.notifMessage_add,
        );
      };


      componentDidMount=()=>{
          this.onFindNancyUser('')
      }

    searchFilterFunction = text => {
        this.onFindNancyUser(text)
    };


    selectItem = data => {
        data.item.isSelect = !data.item.isSelect;
        data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;

        const index = this.state.data.findIndex(
            item => data.item._id === item._id,
        );

        this.state.data[index] = data.item;

        this.setState({
            data: this.state.data,
        });
    };


    goToStore = () => this.props.navigation.navigate('Expenses', {selected: this.state.selected});


    renderItem = data =>{

        let params =this.props.navigation.state.params
        console.log('params liste',params.listeUsers)
        var newMap =params.listeUsers.filter(elt => elt._id ===data.item._id)

        if(newMap.length===1){
            return(
            <View style={styles.main2_container}>
                <Image
                    style={styles.image}
                    source={data.item.image}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text} numberOfLines={1}>{data.item.pseudo}</Text>
                        <Text style={styles.vote_text}>participant</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description2_text} numberOfLines={1}>{data.item.mail}</Text>
                    </View>
                </View>
            </View>

            )
        }else{
            return(
                <TouchableOpacity onPress={() => this.selectItem(data)}
                          style={data.item.selectedClass}>
                    <View style={styles.main2_container}>
                        <Image
                            style={styles.image}
                            source={data.item.image}
                        />
                        <View style={styles.content_container}>
                            <View style={styles.header_container}>
                                <Text style={styles.title_text} numberOfLines={1}>{data.item.pseudo}</Text>
                            </View>
                            <View style={styles.description_container}>
                                <Text style={styles.description2_text} numberOfLines={1}>{data.item.mail}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
        


    render() {

        /*itemNumber contient le nombre d'utilisateurs selectionnés ie le nombre de participants
        de la communauté en cours de création*/

        let params=this.props.navigation.state.params

        const itemNumber = this.state.data.filter(item => item.isSelect).length;

        /*dataSelect contient tous les utilisateurs selectionner ie les participants de la
        communauté en cours de création*/

        var dataSelect = this.state.data.filter(item => item.isSelect);

        function AllSelectedItem() {
            if (parseInt(itemNumber) == 0) {
                return (
                    <Text style={{fontSize: 18, margin: 20}}>Selectionnez des ami(e)s</Text>
                );
            }
        }

        return (

            <View style={{flex: 1}}>
                <Header searchBar rounded iosBarStyle={'dark-content'} style={{backgroundColor: '#FFD700'}}>
                    <StatusBar backgroundColor="#FFDB58"
                               barStyle="light-content"/>
                   <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                   
                       
                    <Item style={{marginBottom: 10, marginTop: 10,color:'white'}}>
                        <Icon name="ios-search"/>
                        <Input placeholder="Rechercher"
                               onChangeText={text => this.searchFilterFunction(text)}
                               autoCorrect={false}
                               value={this.state.value}/>
                    </Item>
                    
                </Header>
                <View>{AllSelectedItem()}</View>
                <View>

                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={dataSelect}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({item}) => <Com_CreateCommunity Imagedata={item}
                                                                     navigation={this.props.navigation}/>}
                        ListFooterComponent={this.renderFooter}/>
                </View>
                <View style={styles.main_container1}>
                </View>
                <View style={styles.main_container}>
                {
                    this.state.loading_users && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color="red" />
                    </View>
                }
                    {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
                    <FlatList
                        data={this.state.data}//Allfriends}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={item => this.renderItem(item)}
                        ListFooterComponent={this.renderFooter}
                        extraData={this.state}
                    />
                    <View style={styles.numberBox}>
                        <Text style={styles.number}>{itemNumber}</Text>
                    </View>

                </View>
                <View style={styles.container}>
                {
             
             this.state.loading_add ? (
               <ActivityIndicator size="large" color="red" />
             ) : (
                    
                    <TouchableOpacity 
                        onPress={() => {
                            this.setState({users_add:dataSelect, itemNumber:itemNumber})
                            console.log('dataselect ', dataSelect.map(elt=>elt._id))
                            this.onAddUsers(params.idCommunity ,dataSelect.map(elt=>elt._id))       
                            } }>
                            <Animated.View style={[styles.button, styles.menu]}>
                            <AntDesign name="check" size={34} color="#FFD700" />
                            </Animated.View>
                    </TouchableOpacity>
                    )
                    }
                </View>
            </View>


        );

    };
}


const mapDispatchToProps = dispatch => {
    return {
  
      FindNancyUsers: (
        text,
        onSuccess = (data) => {},
        onFailled = (data) => {},
        notifMessage = (data, error) => {}
      ) => {
        return dispatch(
          FindNancyUser(text,
            {
            onSuccess,
            onFailled,
            notifMessage,
          })
        );
      },

      AddUsers: (
        idCommunity,
        idUsers,
        onSuccess = (data) => {},
        onFailled = (data) => {},
        notifMessage = (data, error) => {}
      ) => {
        return dispatch(
          addUsers(
              idCommunity,
              idUsers,
            {
            onSuccess,
            onFailled,
            notifMessage,
          })
        );
      },
      
    };
  };

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 0,
    },
    main_container1: {
        height: 2,
        marginTop: 0,
        marginBottom: 20,
        backgroundColor: '#A9A9AF',
        position: 'relative',
        //marginBottom:20,

    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    Modal: {
        backgroundColor: '#fffffd',
        marginTop: 10,
        position: 'absolute',
        right: 10,
        width: 190,
        height: 190,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    Bouton: {
        backgroundColor: '#fffff0',

        height: 45,
    },
    connexion: {
        marginVertical: 20,
        marginTop: 5,
        paddingLeft: 20,
    },
    description_text: {
        fontStyle: 'italic',
        fontSize: 20,
        margin: 58,
        color: '#ffffff',
    },
    description2_text: {
        fontStyle: 'italic',
        color: '#666666',
    },
    title_text: {
        fontSize: 18,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 15
    },
    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 30,
        right: 30,
        position: 'absolute',
    },
    button: {

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
    menu: {
        backgroundColor: 'yellow',
    },
    numberBox: {
        position: 'absolute',
        bottom: 75,
        width: 40,
        height: 40,
        borderRadius: 15,
        right: 20,
        zIndex: 3,
        backgroundColor: '#e3e3e3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {fontSize: 14, color: '#000'},

    selected: {backgroundColor: '#FFF'},

    main2_container: {
        height: 100,
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        margin: 5,
        backgroundColor: 'gray',
        borderRadius: 50,
        borderWidth: 1,
    },
    content_container: {
        flex: 1,
        margin: 5,
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
    },
    vote_text: {
        fontStyle:'italic',
        fontSize: 15,
        color: 'green',
        marginRight:20,
    },
    description_container: {
        flex: 5,
    },


});

export default connect(
    null,
    mapDispatchToProps,
)(AddUsersCom)