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
} from 'react-native';

import { 
  getAllCommunities,
} from '../../../redux/actions/community.actions';
import _ from 'lodash';

import {connect} from 'react-redux';


class AllCommunity extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data:[],
      fulldata:[],
      loading: false,
      query: '',
      show: false,
    };
    this.arrayholder = [];
  }



  onSuccess = (data) => {
    this.setState({ loading: !this.state.loading });
    console.log(data);
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

  onGetAllCommunity = () => {
    this.setState({ loading: !this.state.loading });

    this.props.GetAllCommunities(
      {},
      this.onSuccess,
      this.onFailled,
      this.notifMessage
    );
  };

  componentDidMount(){

    {this.onGetAllCommunity()}

  }
  



  

//c'est pas du tout efficace.. tu devrais utiliser les props directement
//ceci peut causer des disfonctionnements



  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.all_communities.length !== this.state.fulldata.length) {
      this.setState({
        data: nextProps.all_communities, //plus de parse data car donnée déjà parsé par un des composant redux
        fulldata: nextProps.all_communities, //plus de parse data car donnée déjà parsé par un des composant redux
      });
      this.arrayholder = nextProps.all_communities; //plus de parse data car donnée déjà parsé par un des composant redux
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
        <ActivityIndicator animating size="large" />
      </View>
    );
  };


  _renderdata=()=>{
    if(this.state.data.length !==0){
      return(
        <FlatList
              data={//Allgroupes
                this.state.data.sort((a, b) =>
                  a.name.localeCompare(b.name),
                ) 
              }
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
      return(
        <Text style={{textAlign:'center',marginTop:20}}>Veillez créer une communauté</Text>
      )
    }
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
          <Text style={{fontStyle:'italic'}}>Chargement</Text>
        </View>
      );
    }
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
          {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
          {this.props.loading ? (
            <ActivityIndicator color="red" />
          ) : (
            
              this._renderdata()

          )}
        </View>
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    all_communities: state.communityReducer.all_communities, // access à toute les communautés.. my_communites , created_communities pour les autres
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
});

export default connect(
  mapStateToprops,
  mapDispatchToProps,
)(AllCommunity);