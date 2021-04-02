import React from 'react';
import Allgroupes from './dataAllgroupe';
import Com_AllCommunity from './Components/com_AllCommunity';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Item,
  Input,
  List,
  ListItem,
} from 'native-base';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  StatusBar,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { 
  getAllCommunities,
} from '../../../redux/actions/community.actions';
//import { getMyInfo } from "../../../redux/actions/user.action";

import _ from 'lodash';

import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';



class AllCommunity extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data:[],
      fulldata:[],
      loading: false,
      query: '',
      show: false,
      user:[],
      page:1,
    };
  }


  onSuccess_com = (data) => {
    console.log('page',this.state.page);
    this.setState({
       loading: !this.state.loading,
       page:this.state.page+1
      });
   
  };

  onFailled_com = (data) => {
    this.setState({ loading: !this.state.loading });
    console.log('onfailled',data)
  };
  notifMessage_com = (data, error) => {
    if (data) {
      return;
    }
    if (error) {
      return "Erreur lors du chargement des communautés";
    }
  };

  onGetAllCommunity = () => {
    this.setState({ loading: !this.state.loading });

    this.props.GetAllCommunities(
      {page:this.state.page},
      this.onSuccess_com,
      this.onFailled_com,
      this.notifMessage_com
    );
  };


  onEndReached=()=>{
    if(this.props.all_communities.length !==0){
      this.onGetAllCommunity()
    }
  }
  
  isEmpty=()=>{
    if(this.props.all_communities.length!=0){
      return <Text>Fin de la liste</Text>
    }
  }

  componentDidMount(){
    {this.onGetAllCommunity()} 
  }
  



  

//c'est pas du tout efficace.. tu devrais utiliser les props directement
//ceci peut causer des disfonctionnements



  UNSAFE_componentWillReceiveProps(nextProps) {
    
    if (nextProps.all_communities) {
      this.setState({
        data:this.state.data.concat(nextProps.all_communities), 
        fulldata:this.state.data.concat(nextProps.all_communities), 
      });
    }
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
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData)  > 0 || itemData.startsWith(textData);
    });
    this.setState({
      data: newData,
    });
  };





  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#FFDB58',
        }}>
        <Text>Fin de la liste</Text>
      </View>
    );
  };


  _renderdata=()=>{
    if(this.state.data.length !==0){
      return(
        <FlatList
              data={//Allgroupes
                this.state.data
              }
              onEndReachedThreshold={0.0001}
              onEndReached={() => {
                this.onEndReached()
                }}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Com_AllCommunity
                  Allgroupe={item}
                  navigation={this.props.navigation}
                />
              )}
              ListFooterComponent={this.renderFooter}
            />
      )
    }else{
      if(!this.state.loading){
        return(
          <Text style={{textAlign:'center',marginTop:20}}>Veillez créer une communauté{this.state.user.id}</Text>
          )
      } 
    }
  }


  render() {
    
    return (
      <View style={{flex: 1}}>
        <Header
          iosBarStyle={'dark-content'}
          style={{backgroundColor: '#FFD700'}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Toutes les communautées</Title>
          </Body>
          <Right>
            <Button
              transparent /*onPress={()=>this.props.navigation.openDrawer()}*/
              onPress={() => this.setState({show: true})}>
              <Icon name="more" />
            </Button>
            <Modal
              transparent={true}
              visible={this.state.show}
              animationType="fade"
              onRequestClose={() => {
                this.setState({show: false});
              }}>
              <View style={styles.Modal}>
                <List>
                  <ListItem
                    onPress={() => {
                      this.props.navigation.navigate('CreateCommunity');
                      this.setState({show: false});
                    }}>
                    <Text>Créer une communauté</Text>
                  </ListItem>
                  <ListItem
                    onPress={() => {
                      this.props.navigation.navigate('AllCommunity');
                      this.setState({show: false});
                    }}>
                    <Text>Toute les communautés</Text>
                  </ListItem>
                  <ListItem
                    onPress={() => {
                      this.props.navigation.navigate('MyCommunity');
                      this.setState({show: false});
                    }}>
                    <Text>Mes communautés</Text>
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
          </Right>
        </Header>
        <Header
          searchBar
          rounded
          iosBarStyle={'dark-content'}
          style={{backgroundColor: '#FFD700'}}>
          <StatusBar backgroundColor="#FFDB58" barStyle="light-content" />
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Rechercher"
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.value}
            />
            <Icon name="ios-people" />
          </Item>
        </Header>
         
          <View style={styles.main_container}>
            {this._renderdata()}

            {this.state.loading ? (
              <TouchableOpacity style={styles.ButtonActivity}>
                <ActivityIndicator style={{marginTop:5}} color="red" size="large" />
              </TouchableOpacity>
              
            ) : (
              
              <Text></Text>

            )}
          </View>
          
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    all_communities: state.communityReducer.all_communities,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {

    GetAllCommunities: (
      args = {},
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        getAllCommunities(args, {
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
  ButtonActivity:{
    backgroundColor:"white",
    borderRadius:50,
    width:50,
    height:50,
    marginLeft:Dimensions.get('screen').width/2 - 25,
    paddingBottom:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 24,
  },
});

export default connect(
  mapStateToprops,
  mapDispatchToProps,
)(AllCommunity);