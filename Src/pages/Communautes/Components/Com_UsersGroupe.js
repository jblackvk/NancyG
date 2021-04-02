import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    Modal,
} from 'react-native';

export default class Com_AllCommunity extends React.Component{


  constructor(props){
    super(props)
    this.state = {
      modalShow:false,
    };
  }
  
 

    render() {
        const Usersgroupe = this.props.Usersgroupe
        return ( 

              <View style={{flex: 1, flexDirection: 'row',}}>
                  <View style={{width:'75%'}}>
                    <TouchableOpacity
                        onPress={() => 
                            this.setState({ modalShow: true })}>
                      <View style={styles.main_container}>
                        <Image
                          style={styles.image}
                          source={require('../../../IMG/5.jpg')}
                        />
                        <View style={styles.content_container}>
                          <View style={styles.header_container}>
                            <Text style={styles.title_text} numberOfLines={1}>{Usersgroupe.prenom} {Usersgroupe.nom}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={{borderRadius:10, borderWidth:1, height:40, width:"23%",
                      marginRight:'2%',marginTop:10}} onPress={() => 
                        this.setState({ modalShow: true })}>
                    <Text style={{fontSize:15, marginTop:5, textAlign:'center',color:'green'}}>S'abonner</Text>
                  </TouchableOpacity>


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
         
        )
      }
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