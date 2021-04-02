import React from 'react';
import {TextInput, RadioButton, ActivityIndicator} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwasome from 'react-native-vector-icons/FontAwesome';


import {
 updateCommunity,PostCommunity
} from  '../../../redux/actions/community.actions';

import {connect} from 'react-redux';

import {Header, Left, Body, Button, Icon, Title, Right} from 'native-base';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

class updateCom extends React.Component {

   params =this.props.navigation.state.params;
  constructor(props) {
    
    super(props);
    this.state = {
      name:this.params.name,
      description:this.params.description,
      new_community: null,
      loading: false,
    };
  }


  
  onSuccess = (data) => {

    this.setState({loading:!this.state.loading})
    this.props.navigation.navigate('infosGroupe')
    console.log('Community update', data);

  };

  onFailled = (data) => {
  this.setState({loading:!this.state.loading})
   console.log('onfailled update', data)
  };

  notifMessage = (data, error) => {
    if (data) {
      return;
    }
    if (error) {
      return "Erreur lors du chargement des communautés";
    }
  };
  
  UpdateCom = () => {

    this.setState({loading:!this.state.loading})
    let params=this.props.navigation.state.params;
    let nom=this.state.name
    let label=this.state.description

    console.log('id '+params.id,' nom ',nom,' label ',label)


    this.props.UpdateCommunity(
      {nom:nom,description:label},
      params.id,
      this.onSuccess,
      this.onFailled,
      this.notifMessage
    );
  };
componentDidMount=()=>{

  let params =this.props.navigation.state.params
  this.setState({
    name:params.name,
    description:params.description
  })
  console.log('params' ,this.state.name)
}






  render() {
    let params=this.props.navigation.state.params
   
    if(this.props.errors){
      console.log(this.props.errors);
    }
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <Header
            iosBarStyle={'dark-content'}
            style={{backgroundColor: '#FFD700'}}>
            <StatusBar backgroundColor="#FFDB58" barStyle="light-content" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title_text}>Mise à jour</Title>
            </Body>
            <Right></Right>
          </Header>
          <View>
            {this.props.errors && (
              // Object.keys(this.props.errors['error']['errors']).map((key) => (
              //   <Text style={styles.errorText}>
              //     {this.props.errors['error']['errors'][0]['msg']}
              //   </Text>
              <Text style={styles.errorText}>
                Erreurs lors de la creation de la communauté
              </Text>
            )}
            <TextInput
              label="Thème de la communauté"
              style={styles.input}
              onChangeText={(text) => this.setState({name: text})}
              underlineColorAndroid="#FFDB58"
              placeholder={params.name}
            />
            <TextInput
              label="Description"
              style={styles.input}
              onChangeText={(text) => this.setState({description: text})}
              multiline={true}
              numberOfLines={3}
              placeholder={params.label}
            />
             <View style={styles.main_container2}>
              </View>
             <Text style={{fontSize: 20, marginBottom: 30,marginLeft:25, fontWeight:'bold'}}>
                Photo de profil de la communauté
              </Text>
              <View style={{flex: 1, flexDirection: 'row',justifyContent:"center"}}>
                  <View style={{marginRight:30}}>
                    <TouchableOpacity>
                    <Animated.View style={[styles.camera]}>
                      <FontAwasome name="photo" size={34} color="#FFD700" />
                    </Animated.View>
                    </TouchableOpacity>
                    <Text style={{fontSize:16}}>Galerie</Text>
                  </View>
                  <View >
                   <TouchableOpacity>
                    <Animated.View style={[styles.camera]}>
                      <AntDesign name="camera" size={34} color="#FFD700" />
                    </Animated.View>
                  </TouchableOpacity>
                  <Text style={{fontSize:16}}>Camera</Text>
                </View>
              </View>
            <View style={styles.main_container2}>
            </View>
            
          </View>
          <View style={styles.container}>
            {
              /*
          gestion du loading (en cours d'enregistrement)
          */
              this.state.loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity onPress={() => this.UpdateCom()}>
                  <Animated.View style={[styles.check, styles.menu]}>
                    <Text style={{fontSize:18}}>Valider</Text>
                  </Animated.View>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    
    UpdateCommunity: (
      {nom,description},
      id,
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        updateCommunity({nom,description},id, {
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
  main_container2: {
    height:2,
    marginTop:15,
    marginBottom:15,
    backgroundColor:'gray',
    position:"relative",
    
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
    color: '#ffffff',
  },
  title_text: {
    fontSize: 20,
    flexWrap: 'wrap',
    paddingLeft: 0,
    marginLeft: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:20
  },
  check: {
    width: 80,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 2,
  },
  menu: {
    backgroundColor: '#FFD700',
  },
  input: {
    paddingHorizontal: 15,
    fontSize: 20,
    marginVertical: 10,
    justifyContent: 'center',
    marginTop: 15,
    borderColor: '#FFDB58',
    marginLeft: 25,
    marginRight: 25,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'gray',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
  },
  camera: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 50,
    marginTop: -15,
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

export default connect(null, mapDispatchToProps)(updateCom);
