import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';


export default class Discussion extends React.Component{


  constructor(props){
    super(props)
  }
  

    render() {
        const Imagedata = this.props.Imagedata;
        
        return ( 
          <TouchableOpacity>
          <View style={styles.main_container}>
            
             <View style={styles.content_container}>
              <View style={styles.header_container}>
                
                  <Image
                  style={styles.image}
                  source={require('../../../IMG/5.jpg')}
                  />

              </View>
              <View style={styles.description_container}>
        <Text style={styles.description_text} numberOfLines={1}>{Imagedata.pseudo}</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )
      }
    }

    const styles = StyleSheet.create({
      main_container: {
        height: 80,
        flexDirection: 'row'
      },
      content_container: {
        flex: 1,
        margin:5
      },
      header_container: {
        flex: 3,
        flexDirection: 'row'
      },
      description_container: {
        flex: 5
      },
      description_text: {
        fontStyle: 'italic',
        color: 'black',
        marginTop:30,
        textAlign:'center',
      },
      image: {
        width: 60,
        height: 60,
        marginRight:10,
        backgroundColor: 'gray',
        borderRadius:50,
        borderWidth: 1,
      }
    })