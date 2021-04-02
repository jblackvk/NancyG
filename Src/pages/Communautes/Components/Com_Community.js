import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';


export default class Com_community extends React.Component{

    render() {
        const groupe = this.props.groupe
        return (
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('Com_Discussion',{
              name: groupe.name,
              image: groupe.image,
              id : groupe.id,
              label:groupe.label,
            })
          }
          }>
          <View style={styles.main_container} >
            <Image
              style={styles.image}
              source={require('../../../IMG/5.jpg')}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text} numberOfLines={1}>{groupe.name}</Text>
                <Text style={styles.vote_text}>{groupe.Nbre_message}</Text>
              </View>
              <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={2}>{groupe.label}</Text>
                {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
              </View>
            </View>
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
        //paddingRight: 15,
        marginRight:50,
      },
      vote_text: {
        marginRight:5,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'green',
      },
      description_container: {
        flex: 5
      },
      description_text: {
        fontStyle: 'italic',
        color: '#666666',
        marginRight:50,
        marginTop:-10,
      },
    })