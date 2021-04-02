import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    TouchableOpacity,
    FlatList ,
    Modal,
    Dimensions,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Colors} from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Com_infosGroupe from './Components/Com_infosGroupe';
import {moreAboutCommunity,removeUser} from '../../../redux/actions/community.actions';
//import {getUserInfo} from '../../../redux/actions/user.action'
import _ from 'lodash';
import {connect} from 'react-redux';
import { getCurrentUserId } from '../../../redux/store';
import { showMessage } from 'react-native-flash-message';



const HEADER_MAX_HEIGHT = 120
const HEADER_MIN_HEIGHT = 50
const PROFILE_IMAGE_MAX_HEIGHT= Dimensions.get('screen').width*2/5
const PROFILE_IMAGE_MIN_HEIGHT=Dimensions.get('screen').width*1/4


class infosGroupe extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          scrollY: new Animated.Value(0),
          modalShow:false,
          showHeader: true,
          data:[],
          fulldata:[],
          loading: false,
          loading_info:false,
          query: '',
          show: false,
          infoCommunity:[],
          superAdmin:[],
          listeAdmins:[],
          listeUsers:[],
          nbreUser:0,
        };
      }
      onSuccess_info = (data) => {

        this.setState({loading_info:!this.state.loading_info})
        console.log('onsuccess infoCommunity ', data);
        console.log('onsuccess infoCommunity.listeUsers ', data.listeUsers);
        console.log('onsuccess infoCommunity.listeAdmins ', data.listeAdmins);
        this.setState({
          infoCommunity:data,
          listeAdmins:data.listeAdmins,
          data:data.listeUsers,
          fulldata:data.listeUsers,
          superAdmin:data.superAdmin,
          nbreUser: data.nbreUser,
        })
      };
    
      onFailled_info = (data) => {
      this.setState({loading_info:!this.state.loading_info})
       console.log('onfailled infoCommunity', data)
      };

      notifMessage_info = (data, error) => {
        if (data) {
          return;
        }
        if (error) {
          return "Erreur lors du chargement des communautés";
        }
      };
      
      onGetCommunityInfo = () => {

        let params=this.props.navigation.state.params;
        this.setState({loading_info:!this.state.loading_info})
        console.log('id '+params.id)
        this.props.getCommunitiesInfo(
          params.id,
          {},
          this.onSuccess_info,
          this.onFailled_info,
          this.notifMessage_info
        );
      };



      onSuccess_remove = (data) => {
        console.log('onsuccess remove ', data);
        
        showMessage({
          duration:1000,
          message: 'succes',
        // le message . je pouvais aussi choisir statusText ou meme formater le body
        description:"utilisateur rétiré",
        type: "success",
        icon: {
          icon: "success",
          position: 'left',
        },
          })

        this.setState({
          loading:!this.state.loading,
          nbreUser:this.state.nbreUser-1,
        })
        
      };
    
      onFailled_remove = (data) => {
       
       console.log('onfailled remove', data)
       this.setState({loading:!this.state.loading})
       showMessage({
        duration:1000,
        message: 'echec',
      // le message . je pouvais aussi choisir statusText ou meme formater le body
      description: data.message,
      type: 'danger',
      icon: {
        icon: 'danger',
        position: 'left',
      },
        })
      };

      notifMessage_remove = (data, error) => {
        if (data) {
          return;
        }
        if (error) {
          return "Erreur lors du chargement des communautés";
        }
      };
      
      onRemoveUser = (idCommunity,idUser) => {

        this.setState({loading:!this.state.loading})
        console.log('idUser',idUser,'current User',getCurrentUserId())
        this.props.RemoveUser(
          idCommunity,
          idUser,
          this.onSuccess_remove,
          this.onFailled_remove,
          this.notifMessage_remove
        );
      };

      componentDidMount(){

        {this.onGetCommunityInfo()}
    
      }

      searchFilterFunction = text => {
        if(text == ''){
          this.setState({data : this.state.fulldata , value : ""})
          return ;
        }
        this.setState({
          value: text,
        });
    
        const newData = this.state.fulldata.filter(item => {
          const itemData = item.nom.toUpperCase()+ item.prenom.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData)  > 0 || itemData.startsWith(textData);
        });
        this.setState({
          data: newData,
        });
      };


      isAdmin=()=>{

        var newMap = this.state.listeAdmins.filter(elt => elt._id === getCurrentUserId())
        if(newMap.length===1){
          return(
            <View>
                  <View style={{marginTop:20, marginBottom:0, marginRight:'35%',borderRadius:10,borderWidth:3
                                , borderColor:'green',marginLeft:'5%'}}>
                    <TouchableOpacity style={{height:25, width:180}}  onPress={() => {
                                        this.props.navigation.navigate('AddUsersCom',{
                                          idCommunity:this.state.infoCommunity._id,
                                          listeUsers: this.state.data,
                                        })}}>
                        <View style={{flex: 1, flexDirection: 'row',marginLeft:5}}>
                          <View style={{marginTop:2}}>
                              <AntDesign name='addusergroup' size={18} color='green'/>
                          </View>
                          <View>
                            <Text style={{marginTop:2,fontSize:13,marginLeft:5,marginRight:5, color:'green'
                                          ,fontWeight:'bold'}}>Ajouter des participants</Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.main_container2}></View>
                </View>
               
          )
        }
      }


      typeCommunaute=(type)=>{
        if(type==='public'){
          return(
            <>
            <View style={{flex: 1, flexDirection: 'row',marginLeft:20, marginTop:10}}>
                <View>
                    <Fontisto name='world-o' size={22} color='gray'/>
                </View>
                <View>
                    <Text style={{marginLeft:15,fontSize:20, color:'green'}}>Communauté Public</Text>
                </View>
            </View>
                  <Text style={{marginTop:2,marginLeft:20,fontSize:16, fontStyle: 'italic',marginBottom:20}} 
                          numberOfLines={3}>tout le monde peut voir qui est dans la communautée et
                          ce qui est publié</Text>
          </>
          )
        }
        else{
          return(
            <>
            <View style={{flex: 1, flexDirection: 'row',marginLeft:20, marginTop:10}}>
                <View>
                    <Fontisto name='world-o' size={22} color='gray'/>
                </View>
                <View>
                    <Text style={{marginLeft:15,fontSize:20, color:'green'}}>Communauté Privée</Text>
                </View>
            </View>
                  <Text style={{marginTop:2,marginLeft:20,fontSize:16, fontStyle: 'italic',marginBottom:20}} 
                          numberOfLines={3}>seuls les membres peuvent voir qui est dans la
                          communauté et ce qui est publié</Text>
          </>
          )
        }
      }


      goback=()=>{
        
        if(this.state.showHeader){
          return(
            <TouchableOpacity style={{marginTop:50, marginLeft:10,height:30 ,marginBottom:-80}}
            onPress={() =>  this.props.navigation.navigate('Com_Discussion',{
              name:this.state.infoCommunity.nom,
              image: this.state.infoCommunity.image,
              id : this.state.infoCommunity.id,
              label:this.state.infoCommunity.label,
            })}>
            <View >   
                <AntDesign name='arrowleft' size={30} color='#fafafa'/> 
            </View>
            </TouchableOpacity>
          )
        }else{
          return(
            <TouchableOpacity style={{marginTop:50, marginLeft:10,height:30 ,marginBottom:-40}}
            onPress={() => this.setState({ showHeader: true })}>
            <View style={{top:0}}>   
                <AntDesign name='arrowleft' size={30} color='#fafafa'/> 
            </View>
            </TouchableOpacity>
            
          )
        }
      }






      _renderHeader=()=> {
       
        let params=this.props.navigation.state.params
        var date = (this.state.infoCommunity.createdAt)
        console.log(date)
        const profileImageHeight = this.state.scrollY.interpolate({
          inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
          outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
          extrapolate: 'clamp'
        });
    
        const profileImageMarginTop = this.state.scrollY.interpolate({
          inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
          outputRange: [
            HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
            HEADER_MAX_HEIGHT + 5
          ],
          extrapolate: 'clamp'
        });
       
    
        if (this.state.showHeader) {          
          return (
            <View>
              
              {this.goback()}

              <Animated.View
                style={{
                  height: profileImageHeight,
                  width: profileImageHeight,
                  borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                  borderColor: '#fafafa',
                  borderWidth: 5,
                  overflow: 'hidden',
                  marginTop: profileImageMarginTop,
                  marginLeft:Dimensions.get('screen').width*3/10, 
                }}>
                
                <Image
                   source={require('../../IMG/5.jpg')}
                  style={{ flex: 1, width: null, height: null }}
                />
              </Animated.View>
              
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 22,textAlign:"center"}} >
                      {this.state.infoCommunity.nom}
                    </Text>
                  </View>
                  <View style={{marginTop:-10, marginBottom:30, marginRight:20,marginLeft:10,
                          borderColor:'#DCDCDC'}}>
                    <TouchableOpacity style={{height:35, width:90,backgroundColor:'#ffffe0',
                          borderRadius:10, borderWidth:3,marginLeft:(Dimensions.get('screen').width-90)*1/2,
                          marginTop:20}} onPress={() => 
                            {
                            this.props.navigation.navigate('updateCom',{
                              name: this.state.infoCommunity.nom,
                              image: this.state.infoCommunity.image,
                              id:this.state.infoCommunity.id,
                              label:this.state.infoCommunity.label,
                            
                          })}}>

                        <View style={{flex: 1, flexDirection: 'row',marginLeft:5}}>
                          <View>
                              <Feather name='edit-2' size={22} color='gray'/>
                          </View>
                          <View>
                            <Text style={{fontSize:18,marginRight:5}}>Editer</Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                  </View>

              <View style={styles.main_container3}>
              </View>


              {
                this.state.loading_info ? (
                  <ActivityIndicator size="large" color="red" />
                ) : (   
              <>
                <View>
                    <Text style={{marginLeft:20,fontSize:20, color:'green'}}>Description</Text>
                </View>
                <View>
                    <Text style={{marginTop:2,marginLeft:20,fontSize:16, fontStyle: 'italic'}} 
                            numberOfLines={3}>{this.state.infoCommunity.description} </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row',marginLeft:20, marginTop:10}}>
                  <View>
                      <Fontisto name='date' size={22} color='gray'/>
                  </View>
                  <View>
                      <Text style={{marginLeft:15,fontSize:20, color:'green'}}>Date de création :</Text>
                  </View>
                  <View>
                      <Text style={{fontSize:18, marginTop:2, marginLeft:10,fontStyle: 'italic', width:105}} numberOfLines={1}>
                      {date}</Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row',marginLeft:20, marginTop:10}}>
                  <View>
                      <Feather name='users' size={22} color='gray'/>
                  </View>
                  <View>
                      <Text style={{marginLeft:15,fontSize:20, color:'green'}}>Membres :</Text>
                  </View>
                  <View>
                    <Text style={{fontSize:18, marginTop:2, marginLeft:10,fontStyle: 'italic'}}>{parseInt(this.state.nbreUser,10) + parseInt(params.itemNumber,10)} </Text>
                  </View>
                </View>
              </>
                )}
                
                    {this.typeCommunaute(this.state.infoCommunity.typeCommunaute)}

              <View style={{flex: 1, flexDirection: 'row',marginLeft:5,justifyContent:"space-between"}}>
                          
              </View>
                <View style={styles.main_container3}>
                        <View style={{flex: 1, flexDirection: 'row',marginLeft:5,justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={() => 
                                this.setState({ showHeader: false,fulldata:this.state.data.concat(params.users_add) })}>
                            <View style={{ marginLeft:'90%',marginTop:3}}>
                                <Feather name='search' size={25} color='green'/>
                            </View>
                          </TouchableOpacity>
                        </View>
                </View>
               {this.isAdmin()}
              
            </View>
          );
  


      } else {
          return(
            <View style={{marginTop:60,backgroundColor:'#fafafa'}}>
            
             <View style={{flex: 1, flexDirection: 'row',marginLeft:20}}>
                <View style={{marginTop:15}}>
                <TouchableOpacity onPress={() => this.setState({ showHeader: true })}>
                  <AntDesign name='arrowleft' size={30} color='black'/> 
                  
              </TouchableOpacity>
                </View>
                <View style={{marginRight:-50,marginLeft:20,marginTop:17}}>
              <AntDesign name='search1' size={25} color='black'/>
              </View>
                <TextInput
                placeholder={'Rechercher'}
                style={[styles.searchBar]}
                onChangeText={text => this.searchFilterFunction(text)}
                autoFocus={true}
                inlineImageLeft='magnify'
                inlineImagePadding={20}
            />
            </View>
          </View>
          );
      }
       }   
  





      _renderFooter=()=>{
        if(this.state.showHeader){
          return(
            <View>
              <View style={styles.main_container2}>
                </View>
                {
             
             this.state.loading ? (
               <ActivityIndicator size="large" color="red" />
             ) : (
                    
              <TouchableOpacity style={{height:30, width:'100%'}} onPress={() => 

                Alert.alert(
                  "Attention!",
                  "Vous allez quitter la Communauté",
                  [
                    {
                      text: "Annuler",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => this.onRemoveUser(this.state.infoCommunity._id, getCurrentUserId())}
                  ],
                  { cancelable: false }
                )

                }>
                  <View style={{flex: 1, flexDirection: 'row',marginLeft:5}}>
                  <View style={{marginTop:5, marginLeft:50}}>
                  <AntDesign name='logout' size={30} color='red'/>
                  </View>
                      <View>
                      <Text style={{fontSize:20,marginLeft:10, marginTop:5 ,color:'red'}}>
                        Quitter la communauté</Text>
                      </View>
                  </View>
              </TouchableOpacity>

                    )
                    }
                    
                <View style={styles.main_container2}>
                </View>
            </View>
          )
        }

      }





        
      render() {

        let params=this.props.navigation.state.params
       
  
        const headerHeight = this.state.scrollY.interpolate({
          inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
          outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
          extrapolate: 'clamp'
        });
        
        const headerZindex = this.state.scrollY.interpolate({
          inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
          outputRange: [0, 0, 1000],
          extrapolate: 'clamp'
        });
    
        const headerTitleBottom = this.state.scrollY.interpolate({
          inputRange: [
            0,
            HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
            HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT +5 + PROFILE_IMAGE_MIN_HEIGHT,
            HEADER_MAX_HEIGHT -
              HEADER_MIN_HEIGHT +
              5 +
              PROFILE_IMAGE_MIN_HEIGHT +
              26
          ],
          outputRange: [-80, -100, -1000, 2],
          extrapolate: 'clamp'
        });
    
        return (
          <View style={{ flex: 1, backgroundColor:'#fafafa'}}>
            <Animated.View
              style={{
                position: 'absolute',
                top:0,
                left: 0,
                right: 0,
                backgroundColor: '#FFD700',
                height: headerHeight,
                zIndex: headerZindex,
                //elevation: headerZindex, //required for android
                alignItems: 'center'
              }}
            >
                
              <Animated.View
                style={{ position: 'absolute', bottom: headerTitleBottom}}>
                 
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{marginTop:-50,width:'15%',marginLeft:'2%',marginRight:'2%'}}>

                             {this.goback()}

                            </View>
                            <View style={{width:'62%'}}>
                                <Text style={{ color: '#fafafa', fontSize: 20, fontWeight: 'bold' }} 
                                numberOfLines={1}>{this.state.infoCommunity.nom}</Text>
                                <Text style={{ fontStyle: 'italic', fontSize: 15,color: '#fafafa' }} 
                                numberOfLines={1}>Créée par {this.state.superAdmin.prenom} {this.state.superAdmin.nom} </Text>
                            </View>
                            <View style={{width:'15%',marginRight:'2%',marginLeft:'2%'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('updateCom',{
                              name: this.state.infoCommunity.nom,
                              image: this.state.infoCommunity.image,
                              id:this.state.infoCommunity.id,
                              label:this.state.infoCommunity.label,
                          })}>
                        <View style={{marginTop:10}}>
                            <Feather name='edit-2' size={25} color='#fafafa'/>
                        </View>
                        </TouchableOpacity>
                        </View>
                      </View>
              </Animated.View>
            </Animated.View>
            
            <ScrollView
              style={{ flex: 1 }}
              scrollEventThrottle={16}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
              ])}>

                  {this._renderHeader()}

                <View style={styles.main_container}>
            <FlatList
              data={this.state.data.concat(params.users_add)}
              extraData={this.state.data}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <Com_infosGroupe
                AllUserGroupe={item}
                navigation={this.props.navigation}
                onRemoveUser={this.onRemoveUser}
                listeAdmins ={this.state.listeAdmins}
                superAdmin ={this.state.superAdmin}
                listeUsers ={this.state.data}
                />
              )}
              ListFooterComponent={this.renderFooter}
            />
        </View>


                {this._renderFooter()}

            </ScrollView>


            
            <Modal transparent={true}
              visible={this.state.modalShow}
              animationType="fade"
              onRequestClose={() => {
                this.setState({modalShow: false});
              }}
              >
                <View style={styles.Modal1}>
              <Text style={{fontSize:18,marginLeft:30,marginRight:15,marginTop:50}}>
                fonctionnalitée indisponible </Text>
                <TouchableOpacity
                  style={styles.Bouton}
                  onPress={() => {
                    this.setState({modalShow: false});
                  }}>
                  <Text style={{fontSize:40,textAlign:'center', marginTop:20, color:'red'}}>X</Text>
                </TouchableOpacity>
                </View>
            </Modal>
                
          </View>
        );
      }
}


const mapDispatchToProps = (dispatch) => {
  return {

    getCommunitiesInfo: (
      id,
      args = {},
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        moreAboutCommunity(id,args, {
          onSuccess,
          onFailled,
          notifMessage,
        })
      );
    },

    RemoveUser: (
      idCommunity,
      idUser,
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        removeUser(
          idCommunity,
          idUser,
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
        marginTop: 20,
      },
    main_container1: {
        height:1,
        marginTop:0,
        backgroundColor:'black',
        position:"relative",
        marginBottom:10,
        
      },
      main_container2: {
        height:1,
        marginTop:25,
        backgroundColor:'black',
        position:"relative",
        marginBottom:5,
        
      },
      main_container3: {
        height:30,
        marginTop:20,
        backgroundColor:'#d3d3d3',
        position:"relative",
        marginBottom:10,
        
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
      searchBar: {
        borderColor: Colors.black,
        textAlign:'center',
        color: Colors.green900,
        marginLeft: 20,
        marginTop: 10,
        width: Dimensions.get('screen').width - 90,
        marginBottom: 10,
        height: 40,
        borderWidth: 0.8,
        borderRadius: 10,
        paddingLeft: 0,
    },
     
})
export default connect(
  null,
  mapDispatchToProps,
)(infosGroupe);
