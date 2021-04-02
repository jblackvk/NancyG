import React from 'react';
import {
  StyleSheet,
  FlatList,
  StatusBar,
  View,
  Animated,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Mygroupes from './dataMygroupe';
import Com_MyCommunity from './Components/Com_MyCommunity';
import HeaderMyCommunity from '../../Header/HeaderMyCommunity';
import {Header, Icon, Item, Input} from 'native-base';
import {connect} from 'react-redux';
import { 
  getCreatedCommunities,
} from '../../../redux/actions/community.actions';
import { ScrollView } from 'react-native-gesture-handler';


class Community extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fulldata: [],
      loading: false,
      query: '',
      show: false,
      page:1,
    };
  }



   onSuccess = (data) => {
    console.log('page',this.state.page);
    this.setState({ 
      loading: !this.state.loading,
      page:this.state.page+1
    });
   
  };

  onFailled = (data) => {
    this.setState({ loading: !this.state.loading });
  };
  notifMessage = (data, error) => {
    if (data) {
      return;
    }
    if (error) {
      return "Erreur lors du chargement des communautés";
    }
  };

  onGetCreatedCommunity = () => {
    this.setState({ loading: !this.state.loading });

    this.props.GetCreatedCommunities(
      {page:this.state.page},
      this.onSuccess,
      this.onFailled,
      this.notifMessage
    );
  };

  onEndReached=()=>{
    if(this.props.created_communities.length!=0){
      this.onGetCreatedCommunity()
    }else{
      this.setState({page:1})
    }
  }
  
  isEmpty=()=>{
    if(this.props.created_communities.length!=0){
      return <Text>Fin de la liste</Text>
    }
  }

  componentDidMount(){

    {this.onGetCreatedCommunity()}

  }


UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.created_communities) {
      this.setState({
        data: this.state.data.concat(nextProps.created_communities), //plus de parse data car donnée déjà parsé par un des composant redux
        fulldata: this.state.data.concat(nextProps.created_communities), //plus de parse data car donnée déjà parsé par un des composant redux
      });
    }
  }



  searchFilterFunction = text => {
    if (text == '') {
      this.setState({data: this.state.fulldata, value: ''});
      return;
    }
    this.setState({
      value: text,
    });

    const newData = this.state.fulldata.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > 0 || itemData.startsWith(textData);
    });
    this.setState({
      data: newData,
    });
  };


  
  _renderdata=()=>{
    if(this.state.data.length !==0){
      return(
        <FlatList
              data={//Mygroupes
                this.state.data
              }
              onEndReachedThreshold={0.000001}
              onEndReached={() => {
                this.onEndReached()
                }}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Com_MyCommunity
                  Mygroupe={item}
                  navigation={this.props.navigation}
                />
              )}
            />
      )
    }else{
      if(!this.state.loading){
        return(
          <Text style={{textAlign:'center',marginTop:20}}>Vous n'avez pas encore de communauté</Text>
        )
      }
      
    }
  }


  render() {
    
    return (
      <View style={{flex: 1}}>
        <HeaderMyCommunity navigation={this.props.navigation} />
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
       
        <View style={styles.main_container} onPress={() => {}}>
          { this._renderdata()}
          {this.state.loading ? (
            <TouchableOpacity style={styles.ButtonActivity}>
                <ActivityIndicator style={{marginTop:5}} color="red" size="large" />
            </TouchableOpacity>
          ) : (
            
            <Text></Text>

          )}
        </View>
       
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CreateCommunity')}>
            <Animated.View style={[styles.button, styles.menu]}>
              <MaterialCommunityIcons
                name="account-multiple-plus-outline"
                size={34}
                color="#FFD700"
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    created_communities: state.communityReducer.created_communities, // access à toute les communautés.. my_communites , created_communities pour les autres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetCreatedCommunities: (
      args = {},
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        getCreatedCommunities(args, {
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
    marginTop: 2,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
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
    shadowOpacity: 0,
    shadowRadius: 7.49,
    elevation: 30,
  },
  menu: {
    backgroundColor: 'yellow',
  },
  ButtonActivity:{
    backgroundColor:"white",
    borderRadius:50,
    width:50,
    height:50,
    marginTop:10,
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
)(Community);
