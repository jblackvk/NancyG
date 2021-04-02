import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import {
  List,
  ListItem,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {connect} from 'react-redux';
import { 
  addAdmin,removeAdmin
 } from '../../../../redux/actions/community.actions';
 import { getCurrentUserId } from '../../../../redux/store';

class Com_infosGroupe extends React.Component{


  constructor(props) {
    super(props);
 
    this.state = {
      show: false,
      modalShow:false,
      backgroundColor:'#fafafa',
      show1:false,
      isMe:false,
    };
  }


  onSuccess_add = (data) => {
    this.setState({ loading: !this.state.loading ,
                    success: true,
      });

    console.log('onsuccess addAdmin',data);
  };

  onFailled_add = (data) => {
    this.setState({ loading: !this.state.loading });
    console.log('onfailled addAdmin',data)
  };
  notifMessage_add = (data, error) => {
    if (data) {
      return;
    }
    if (error) {
      return "Erreur lors du chargement des communautés";
    }
  };

  onAddAdmin = (idUser) => {
      
    let params =this.props.navigation.state.params
      this.setState({ loading: !this.state.loading });

      this.props.AddAdmin(

      params.id,
      idUser,
      this.onSuccess_add,
      this.onFailled_add,
      this.notifMessage_add,
    );
  };



  onSuccess_remove = (data) => {
    this.setState({ loading: !this.state.loading ,
      });

    console.log('onsuccess removeAdmin',data);
  };

  onFailled_remove = (data) => {
    this.setState({ loading: !this.state.loading });
    console.log('onfailled removeAdmin',data)
  };
  notifMessage_remove = (data, error) => {
    if (data) {
      return;
    }
    if (error) {
      return "Erreur lors du chargement des communautés";
    }
  };

  onRemoveAdmin = (idUser) => {
      
    let params =this.props.navigation.state.params
      this.setState({ loading: !this.state.loading });

      this.props.RemoveAdmin(

      params.id,
      idUser,
      this.onSuccess_remove,
      this.onFailled_remove,
      this.notifMessage_remove,
    );
  };

  isMe=(user_id)=>{
    if(user_id===getCurrentUserId()){
      return(
        <> (moi) </>
      )
    }
  }
 
  isAdmin=(user_id)=>{

    var superAdmin = this.props.superAdmin
    var adminMap = this.props.listeAdmins.filter(elt => elt._id === user_id)

    if(superAdmin._id===user_id){
      return(
        <Text style={styles.vote_text}>SuperAdmin</Text>
      )
    }else{
      if(adminMap.length===1){
        return(
          <Text style={styles.vote_text}>Administrateur</Text>
        )
      }
    }
    if(adminMap.length===0){
     return null
    }
  }
isAdminModal=(user_id)=>{
  var superAdmin = this.props.superAdmin
  const AllUserGroupe = this.props.AllUserGroupe
  var adminMap = this.props.listeAdmins.filter(elt => elt._id === user_id)
  if(adminMap.length===1){
    if(user_id!=superAdmin._id){
      return(
        <ListItem
          onPress={() => {
            this.onRemoveAdmin(user_id)
            this.setState({ show: false })
            
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Entypo name='user' size={25} color='gray'/>
            <Text style={{fontSize:17,marginLeft:10, marginRight:10}}>Retirer {AllUserGroupe.pseudo} des Administrateurs </Text>
        
          </View>
      </ListItem>
      )
    }   
  }
  if(adminMap.length===0){
    return(
      <ListItem
        onPress={() => {
          this.onAddAdmin(user_id)
          this.setState({ show: false })  
          }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Entypo name='user' size={25} color='gray'/>
              <Text style={{fontSize:17,marginLeft:10, marginRight:10}}>Nommer {AllUserGroupe.pseudo} Administrateur </Text>     
            </View>
      </ListItem>
    )
  }
  
}
isSuperAdmin=(user_id)=>{
  var superAdmin = this.props.superAdmin
  let params =this.props.navigation.state.params
  const AllUserGroupe = this.props.AllUserGroupe
  if(user_id!=superAdmin._id){
    return(
      <ListItem
                    onPress={() => {
                      this.setState({ show: false })

                      Alert.alert(
                        "Attention!",
                        "Vous allez retirer "+AllUserGroupe.pseudo+" de la Communauté",
                        [
                          {
                            text: "Annuler",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => this.props.onRemoveUser(params.id,AllUserGroupe._id)}
                        ],
                        { cancelable: false }
                      )



                      
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <Entypo name='remove-user' size={25} color='gray'/>
                    <Text style={{fontSize:17,marginLeft:10, marginRight:10 }}>Retirer {AllUserGroupe.pseudo} de la communauté</Text>
                    </View>
                  </ListItem>
    )
  }
}
  modalOption=(user_id)=>{
    
    var newMap = this.props.listeAdmins.filter(elt => elt._id === getCurrentUserId())

    if(newMap.length===1){
      this.setState({show:true, show1:false})
    }
    if(newMap.length===0){
      this.setState({show:false,show1:true})
    }
    if(getCurrentUserId()===user_id){
      this.setState({show:false,show1:false})
    }
  }


    render() {
        const AllUserGroupe = this.props.AllUserGroupe
        let params =this.props.navigation.state.params

        let backgroundColor = '#fafafa'

        if(this.state.show || this.state.show1){
          backgroundColor= 'rgba(0,0,0,0.1)'
        }
        
        
        return ( 
          <View style={{backgroundColor: backgroundColor}}>
          <TouchableOpacity onPress={() =>
            this.modalOption(AllUserGroupe._id)
            }>
          <View style={styles.main_container}>
            <Image
              style={styles.image}
              source={require('../../../IMG/5.jpg')}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                
              <Text style={styles.title_text} numberOfLines={1}>{AllUserGroupe.pseudo}{this.isMe(AllUserGroupe._id)}</Text>
                {this.isAdmin(AllUserGroupe._id)}
              </View>
              <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={1}> membre</Text>
                {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Modal transparent={true}
              visible={this.state.modalShow}
              animationType="fade"
              onRequestClose={() => {
                this.setState({modalShow: false});
              }}
              >
                <View style={styles.Modal1}>
              <Text style={{fontSize:18,marginLeft:30,marginRight:15,marginTop:50}}>fonctionnalitée indisponible </Text>
                <TouchableOpacity
                  style={styles.Bouton}
                  onPress={() => {
                    this.setState({modalShow: false});
                  }}>
                  <Text style={{fontSize:40,textAlign:'center', marginTop:20, color:'red'}}>X</Text>
                </TouchableOpacity>
                </View>
            </Modal>
          

          <Modal
              transparent={true}
              visible={this.state.show}
              animationType="fade"
              style={{
                overlay:{
                  backgroundColor:'rgba(0,0,0,0.8)',
                }
                
              }}
              onRequestClose={() => {
                this.setState({show: false});
              }}>
              <View style={styles.Modal}>
                <List>
                

                  {this.isAdminModal(AllUserGroupe._id)}
                  {this.isSuperAdmin(AllUserGroupe._id)}





                  <ListItem
                    onPress={() => {
                      this.setState({ modalShow: true }),
                      this.setState({ show: false })
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='information' size={25} color='gray'/>
                    <Text style={{fontSize:17,marginLeft:10, marginRight:10}}>Afficher {AllUserGroupe.pseudo}</Text>
                    </View>
                  </ListItem>
                  
                  <ListItem
                    onPress={() => {
                      this.setState({ modalShow: true }),
                      this.setState({ show: false })
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <Entypo name='message' size={25} color='gray'/>
                    <Text style={{fontSize:17,marginLeft:10,marginRight:10}}>Message privé à {AllUserGroupe.pseudo}</Text>
                    </View>
                  </ListItem>
                </List>
                <TouchableOpacity
                  style={styles.Bouton}
                  onPress={() => {
                    this.setState({show: false});
                  }}>
                  <Text style={styles.connexion}>Fermer </Text>
                </TouchableOpacity>
              </View>
            </Modal>




            <Modal
              transparent={true}
              visible={this.state.show1}
              animationType="fade"
              style={{
                overlay:{
                  backgroundColor:'rgba(0,0,0,0.8)',
                }
                
              }}
              onRequestClose={() => {
                this.setState({show1: false});
              }}>
              <View style={styles.Modal}>
                <List>
                  <ListItem
                    onPress={() => {
                      this.setState({ modalShow: true }),
                      this.setState({ show1: false })
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='information' size={25} color='gray'/>
                    <Text style={{fontSize:17,marginLeft:10, marginRight:10}}>Afficher {AllUserGroupe.pseudo}</Text>
                    </View>
                  </ListItem>
                  <ListItem
                    onPress={() => {
                      this.setState({ show1: false })
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <Entypo name='message' size={25} color='gray'/>
                    <Text style={{fontSize:17,marginLeft:10,marginRight:10}}>Message privé à {AllUserGroupe.pseudo}</Text>
                    </View>
                  </ListItem>
                </List>
                <TouchableOpacity
                  style={styles.Bouton}
                  onPress={() => {
                    this.setState({show1: false});
                  }}>
                  <Text style={styles.connexion}>Fermer </Text>
                </TouchableOpacity>
              </View>
            </Modal>


          </View>
 </View>
        )
      }
    };

    const mapDispatchToProps = dispatch => {
      return {
    
        AddAdmin: (
          idCommunaute,idUser,
          onSuccess = (data) => {},
          onFailled = (data) => {},
          notifMessage = (data, error) => {}
        ) => {
          return dispatch(
            addAdmin(idCommunaute,idUser,
              {
              onSuccess,
              onFailled,
              notifMessage,
            })
          );
        },

        RemoveAdmin: (
          idCommunaute,idAdmin,
          onSuccess = (data) => {},
          onFailled = (data) => {},
          notifMessage = (data, error) => {}
        ) => {
          return dispatch(
            removeAdmin(idCommunaute,idAdmin,
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
        height: 100,
        flexDirection: 'row'
      },
      image: {
        width: 60,
        height: 60,
        margin: 5,
        backgroundColor: 'gray',
        borderRadius:50,
        borderWidth: 1,
        
      },
      content_container: {
        flex: 1,
        margin: 5
      },
      header_container: {
        flex: 3,
        flexDirection: 'row'
      },
      title_text: {
        fontSize: 18,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 15
      },
      vote_text: {
      fontStyle:'italic',
        fontSize: 15,
        color: 'green',
        marginRight:20,
      },
      description_container: {
        flex: 5
      },
      description_text: {
        fontStyle: 'italic',
        color: '#666666'
      },
     
      Modal: {
        backgroundColor: 'white',
        bottom:150,
        position: 'absolute',
        right: '10%',
        width: '80%',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.5,
        shadowRadius: 16.00,
        elevation: 24,
      },
      Bouton: {
        backgroundColor: '#fffff0',
        borderRadius:20,
        height: 45,
      },
      connexion: {
        marginVertical: 20,
        marginTop: 7,
        textAlign: 'center',
        fontSize: 17
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
      Modal1: {
        backgroundColor: '#fffff0',
        bottom:150,
        position: 'absolute',
        right: '10%',
        width: '80%',
        height: 150,
        borderRadius:20,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 30,
      },
    })
  
    export default connect(
      null,
      mapDispatchToProps,
    )(Com_infosGroupe)