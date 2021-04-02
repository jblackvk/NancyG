import React from 'react';
import {TextInput, RadioButton, ActivityIndicator} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwasome from 'react-native-vector-icons/FontAwesome';


import {
  PostCommunity,
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
} from 'react-native';

class CreateCommunity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'public',
      name: '',
      description: '',
      new_community: null,
      loading: false,
    };
  }


  notifMessage = (data, error) => {
    if (data) {
      return "communauté créé avec succès";
    }
    if (error) {
      return "echec de la création de la communauté";
    }
  };
  onSuccess = (data) => {
    this.setState({ loading: !this.state.loading });
    console.log(data);
  };

  onFailled = (data) => {
    this.setState({ loading: !this.state.loading });
  };

  createCommunity = () => {

    if(this.state.description !=='' && this.state.name !==''){
      
      this.setState({ loading: !this.state.loading });
      this.props.addCommunity(
        { nom: this.state.name, description: this.state.description, typeCommunaute: this.state.checked },
        
        (data) => this.setState({ new_community: data }),
        (error) => {
          console.log(error);
        },
        (data, error) => {
          if (data) {
            console.log(data.name)
          this.onSuccess
          } else {
          this.onFailled
          }
        }
      );
    } 
  };










  render() {
    const {checked} = this.state;
    if (this.state.new_community !==null && this.state.loading) {
      
      console.log("id "+this.state.new_community.id+" superAdmin"+this.state.new_community.superAdmin)
      this.props.navigation.navigate('Com_Discussion',{
        name: this.state.name,
        image:'',
        description:this.state.description,
        typeCommunaute: this.state.checked == 'privée' ? 'private' : 'public',
        id:this.state.new_community.id,
        superAdmin:this.state.new_community.superAdmin,
        nbreUser:this.state.new_community.nbreUser,
      });
      
    }
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
              <Title style={styles.title_text}>Nouv.Communauté</Title>
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
            />
            <TextInput
              label="Description"
              style={styles.input}
              onChangeText={(text) => this.setState({description: text})}
              multiline={true}
              numberOfLines={3}
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
            <View style={{marginLeft: 25, marginRight: 25}}>
              <Text style={{fontSize: 20, marginBottom: 10, fontWeight:'bold'}}>
                Cette Communauté est:
              </Text>
              
              <Text>
                Public, tout le monde peut voir qui est dans la communauté et
                ce qui est publié
              </Text>
              <RadioButton
                value="public"
                status={checked === 'public' ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: 'public'});
                }}
              />
              <Text>
                Privée, seuls les membres peuvent voir qui est dans la
                communauté et ce qui est publié
              </Text>
              <RadioButton
                value="privée"
                status={checked === 'privée' ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: 'privée'});
                }}
              />
            </View>
          </View>
          <View style={styles.container}>
            {
             
              this.state.loading ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                <TouchableOpacity onPress={() => this.createCommunity()}>
                  <Animated.View style={[styles.check, styles.menu]}>
                    <AntDesign name="check" size={34} color="#FFD700" />
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

const mapStateToprops = (state) => {
  return {
    errors: state.communityReducer.post_errors,
    loading: state.communityReducer.loading,
    posted: state.communityReducer.community_posted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    addCommunity: (
      data,
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        PostCommunity(
          { community: data },
          {
            onSuccess,
            onFailled,
            notifMessage,
          }
        )
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
    justifyContent: 'flex-end',
    bottom: 0,
    right: 15,
    position: 'absolute',
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
  menu: {
    backgroundColor: 'yellow',
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

export default connect(mapStateToprops, mapDispatchToProps)(CreateCommunity);
