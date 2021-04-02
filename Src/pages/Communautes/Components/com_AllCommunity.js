import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import { 
 addUsers
} from '../../../../redux/actions/community.actions';
import { getCurrentUserId } from '../../../../redux/store';


class Com_AllCommunity extends React.Component{


  constructor(props){
    super(props)
    this.state = {
      modalShow:false,
      infoCommunity:[],
      superAdmin:[],
      loading: false,
      success:false,
      isNavigate:false,
    };
  }


  onSuccess = (data) => {
    this.setState({ loading: !this.state.loading
      });
    this.props.navigation.navigate('Com_Discussion',{
      name:this.props.Allgroupe.name,
      label:this.props.Allgroupe.label,
      id:this.props.Allgroupe.id,
      image:this.props.Allgroupe.image, 
    })
    //this.props.Allgroupe.push(this.state.item)

    console.log('itme',this.props.Allgroupe);
  };

  onFailled = (data) => {
    this.setState({ loading: !this.state.loading });
    console.log('onfailled addUsers',data)
  };
  notifMessage = (data, error) => {
    if (data) {
      return;
    }
    if (error) {
      return "Erreur lors du chargement des communautés";
    }
  };

  onAddUsers = (idCommunaute,Communaute) => {
      console.log('idCommunaute ',idCommunaute,' idUser', getCurrentUserId())
      this.setState({ 
        loading: !this.state.loading,
      });

      this.props.AddUsers(

      idCommunaute,
      getCurrentUserId(),
      this.onSuccess,
      this.onFailled,
      this.notifMessage,
    );
  };
    

  isUsers=()=>{
    const Allgroupe = this.props.Allgroupe
    var isUser=false

    Allgroupe.listeUsers.map((id)=>{
      if(id===getCurrentUserId()){
        isUser=true
      }
    })

    console.log(Allgroupe.listeUsers,getCurrentUserId())
   
    if(isUser){
      
      return(
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width:'75%'}}>
          <TouchableOpacity onPress={()=>{
            {
             
              this.props.navigation.navigate('Com_Discussion',{
                name: Allgroupe.name,
                image: Allgroupe.image,
                id:Allgroupe.id,
                label:Allgroupe.label,
              })
            }
              
            }}>
            <View style={styles.main_container}>
              <Image
                style={styles.image}
                source={require('../../../IMG/5.jpg')}
              />
              <View style={styles.content_container}>
                <View style={styles.header_container}>
          <Text style={styles.title_text} numberOfLines={1}>{Allgroupe.name}</Text>
                </View>
                <View style={styles.description_container}>
                  <Text style={styles.description_text} numberOfLines={1}>
                      {Allgroupe.label}</Text>
                  {/* La propriété numberOfLines permet de couper un texte si
                     celui-ci est trop long,il suffit de définir un nombre maximum de ligne */}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      )
    }
    if(!isUser){
      return(
        <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{width:'75%'}}>
                    <TouchableOpacity onPress={()=>{
                        Alert.alert(
                          "",
                          "Veillez Rejoindre la communauté",
                          [
                            {
                              text: "ok",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                          ],
                          { cancelable: false }
                        );
                      }}>
                      <View style={styles.main_container}>
                        <Image
                          style={styles.image}
                          source={require('../../../IMG/5.jpg')}
                        />
                        <View style={styles.content_container}>
                          <View style={styles.header_container}>
                    <Text style={styles.title_text} numberOfLines={1}>{Allgroupe.name}</Text>
                          </View>
                          <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={1}>
                                {Allgroupe.label}</Text>
                            {/* La propriété numberOfLines permet de couper un texte si
                               celui-ci est trop long,il suffit de définir un nombre maximum de ligne */}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={{borderRadius:10, borderWidth:1, height:40, width:"23%",
                      marginRight:'2%',marginTop:10}} onPress={() => {
                        console.log('id du groupe', Allgroupe._id)
                        this.onAddUsers(Allgroupe._id)
                      }}>

                  
              {this.state.loading ? (
                  <ActivityIndicator  color="red" />
                ) : (
                  
                      <Text style={{fontSize:15, marginTop:5, textAlign:'center',color:'green'}}>Rejoindre</Text>
                  
                )
              }
             </TouchableOpacity>
              </View>
      )
    }

  }





    render() {
        const Allgroupe = this.props.Allgroupe
        return ( 
        this.isUsers()
        )
      }
    };

    const mapStateToprops = state => {
      return {
        user: state.authReducer.user,
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
    
        AddUsers: (
          idCommunaute,
           idUser,
          onSuccess = (data) => {},
          onFailled = (data) => {},
          notifMessage = (data, error) => {}
        ) => {
          return dispatch(
            addUsers(idCommunaute,idUser,
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
        fontWeight: 'bold',
        fontSize: 15,
        color: 'green',
      },
      description_container: {
        flex: 5
      },
      description_text: {
        fontStyle: 'italic',
        color: '#666666'
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
  mapStateToprops,
  mapDispatchToProps,
)(Com_AllCommunity);
  