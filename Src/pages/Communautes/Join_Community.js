import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    TouchableOpacity,
    FlatList ,
    Modal,
    TextInput,
    Dimensions,
} from 'react-native';
import {Colors} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import UsersGroupes from './dataAllUserGroupe';
import Com_UsersGroupe from './Components/Com_UsersGroupe';
import {moreAboutCommunity} from '../../../redux/actions/community.actions';
import {connect} from 'react-redux';


HEADER_MAX_HEIGHT = 120
HEADER_MIN_HEIGHT = 50
PROFILE_IMAGE_MAX_HEIGHT= Dimensions.get('screen').width*2/5
PROFILE_IMAGE_MIN_HEIGHT=Dimensions.get('screen').width*1/4


class Join_Community extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          scrollY: new Animated.Value(0),
          modalShow:false,
          showHeader: true,
          data: [],
          fulldata:[],
          loading: false,
          query: '',
          show: false,
          infoCommunity:[],
          superAdmin:[],
          listeAdmins:[],
        };
      }

      onSuccess = (data) => {
        console.log('onsuccess infoCommunity Join', data);
        console.log('onsuccess infoCommunity.listeUsers ', data.listeUsers);
        this.setState({
          infoCommunity:data,
          listeAdmins:data.listeAdmins,
          superAdmin:data.superAdmin,
          data:data.listeUsers,
          fulldata:data.listeUsers
        })
      };
    
      onFailled = (data) => {
       
       console.log('onfailled infoCommunity Join fdhjj', data)
      };

      notifMessage = (data, error) => {
        if (data) {
          return;
        }
        if (error) {
          return "Erreur lors du chargement des communautés";
        }
      };
      
      onGetCommunityInfo = () => {

        let params=this.props.navigation.state.params;

        console.log('id '+params.id)
        this.props.getCommunitiesInfo(
          params.id,
          {},
          this.onSuccess,
          this.onFailled,
          this.notifMessage
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
          const itemData = item.nom.toUpperCase()+item.prenom.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData)  > 0 || itemData.startsWith(textData);
        });
        this.setState({
          data: newData,
        });
      };


      goback=()=>{
        if(this.state.showHeader){
          return(
            <TouchableOpacity style={{marginTop:50, marginLeft:10,height:30 ,marginBottom:-80}}
            onPress={() =>  this.props.navigation.navigate('AllCommunity')}>
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
              <Text style={{ fontWeight: 'bold', fontSize: 22,textAlign:'center'}} >
           {params.name}
              </Text>
          </View>
          <View style={{marginTop:-10, marginBottom:30, marginRight:20,marginLeft:10,
                        borderColor:'#DCDCDC'}}>
          </View>
        <View style={styles.main_container2}>
            <Text style={{fontSize:22,marginLeft:20}}>A propos</Text>
          </View>

              <View>
                  <Text style={{marginLeft:20,fontSize:20, color:'green'}}>Description</Text>
              </View>
              <View>
              <Text style={{marginTop:2,marginLeft:20,fontSize:16, fontStyle: 'italic'}} 
                          numberOfLines={3}>{this.state.infoCommunity.label}</Text>
              </View>
        
          <View style={{flex: 1, flexDirection: 'row',marginLeft:20, marginTop:10}}>
              <View>
                  <AntDesign name='user' size={22} color='gray'/>
              </View>
              <View>
                  <Text style={{marginLeft:15,fontSize:20, color:'green'}}>Créée par</Text>
              </View>
              <View>
                  <Text style={{fontSize:18, marginTop:2,marginRight:10, fontStyle: 'italic'}}
                  numberOfLines={1}> {this.state.superAdmin.prenom} {this.state.superAdmin.nom}</Text>
              </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row',marginLeft:20, marginTop:10}}>
              <View>
                  <Fontisto name='date' size={22} color='gray'/>
              </View>
              <View>
                  <Text style={{marginLeft:15,fontSize:20, color:'green'}}>Date de création :</Text>
              </View>
              <View>
                  <Text style={{fontSize:18, marginTop:2, marginLeft:10,fontStyle: 'italic'}}>16/03/2020</Text>
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
                  <Text style={{fontSize:18, marginTop:2, marginLeft:10,fontStyle: 'italic'}}>{this.state.infoCommunity.nbreUser}</Text>
              </View>
          </View>
          
          <View style={styles.main_container1}>
             
          <View style={{flex: 1, flexDirection: 'row',marginLeft:20, justifyContent:'space-between'}}>
  
              <View>
                  <Text style={{fontSize:22,marginLeft:5}}>Voir les participants</Text>
              </View>
              <TouchableOpacity onPress={() => 
                                this.setState({ showHeader: false })}>
              <View style={{ marginRight:20,marginTop:5}}>
                  <Feather name='search' size={30} color='gray'/>
              </View>
              </TouchableOpacity>
              
          </View>
         
          </View>
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
                style={{ position: 'absolute', bottom: headerTitleBottom, marginLeft:200 }}>
                 
                        <View style={{flex: 1, flexDirection: 'row',marginLeft:-75}}>
                            <View style={{marginRight:30,marginTop:-50}}>
                                {this.goback()}
                            </View>
                            <View >
                                <Text style={{ color: '#fafafa', fontSize: 20, fontWeight: 'bold',marginBottom:10, }} 
                                numberOfLines={1}>{params.name}</Text>
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
               
                  {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
                  {this.props.loading ? (
                    <ActivityIndicator color="red" />
                  ) : (
                    
                    <FlatList
                    data={this.state.data}
                      keyExtractor={item => item._id.toString()}
                      renderItem={({item}) => (
                        <Com_UsersGroupe
                          Usersgroupe={item}

                          navigation={this.props.navigation}
                        />
                      )}
                      ListFooterComponent={this.renderFooter}
                    />
                  )}
                </View>
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
  };
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20,
      },
    main_container1: {
        height:40,
        marginTop:30,
        backgroundColor:'#DCDCDC',
        position:"relative",
        marginBottom:5,
        
      },
      main_container2: {
        height:40,
        marginTop:0,
        backgroundColor:'#DCDCDC',
        position:"relative",
        marginBottom:20,
        
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
)(Join_Community);