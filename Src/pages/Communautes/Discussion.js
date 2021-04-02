import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';


export default class Discussion extends React.Component{


  constructor(props){
    super(props)
  }
  

    render() {
        const Imagedata = this.props.Imagedata
        
        return ( 
          <TouchableOpacity>
          <View style={styles.main_container}>
            <Image
              style={styles.image}
              source={Imagedata.image}
            />
          </View>
          </TouchableOpacity>
        )
      }
    }

    const styles = StyleSheet.create({
      main_container: {
        height: 100,
        flexDirection: 'row'
      },
      image: {
        width: 90,
        height: 150,
        margin:5,
        backgroundColor: 'gray',
        borderRadius:10,
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
    })