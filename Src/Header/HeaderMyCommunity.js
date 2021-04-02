import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title,List, ListItem} from 'native-base';
import {StatusBar,Modal,View,Text,StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from 'react-native'


export default class HeaderMyCommunity extends React.Component {

  constructor(){
    super();
    this.state={
        show:false
    }
}
    render(){
        return(

            <Header iosBarStyle={"dark-content"} style={{backgroundColor:'#FFD700'}}>
              <StatusBar backgroundColor="#FFDB58"
                 barStyle="light-content"/>
              <Left>
                <Button transparent onPress={()=>this.props.navigation.goBack()} >
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title >Mes communautées</Title>
              </Body>
              <Right>
                <Button transparent onPress={()=>{this.setState({show:true})}}
                                  /*onPress={()=>this.props.navigation.openDrawer()}*/>
                  <Icon name='more' />
                </Button>
                
                <Modal 
                      transparent={true}
                      visible={this.state.show}
                      animationType='fade'
                      onRequestClose={() => { this.setState({show:false}) } }>

                       <View style={styles.Modal}>
                       <List>
                        <ListItem onPress={()=>
                        {
                          this.props.navigation.navigate('createCommunity')
                          this.setState({show:false})
                        }
                        }>
                            <Text>Créer une communauté</Text>
                        </ListItem>
                        <ListItem onPress={()=> 
                          {
                            this.props.navigation.navigate('AllCommunity')
                            this.setState({show:false})
                          }
                          }>
                            <Text>Toutes les communautés</Text>
                        </ListItem>
                        <ListItem onPress={()=> 
                        {
                          this.props.navigation.navigate('MyCommunity')
                          this.setState({show:false})
                        }
                        }>
                            <Text>Mes communautés</Text>
                        </ListItem>
                    </List>
                        <TouchableOpacity style={styles.Bouton}  onPress={()=>{this.setState({show:false})}}>
                          <Text style={styles.connexion}>Fermer </Text>
                        </TouchableOpacity>
                   </View>
                  
               </Modal>
              
              </Right>
            </Header>
        );
    }
}
const styles = StyleSheet.create({

  Modal:{
    backgroundColor:'#fffffd',
    marginTop:10,
    position: "absolute",
    right: 10,
    width:190,
    height: 190,
    shadowColor: "#000",
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
    paddingLeft:20
  },
})




