import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton,Colors} from 'react-native-paper';

export default class TransfertBox extends React.Component{

  iconSize= 18;
  iconColor = Colors.grey400;
  constructor(props) {
    super();

    this.state = {

    }
  }


  render(){
    return(
      <View style={styles.view}>
        <IconButton
          icon={"send"}
          size={this.iconSize}
          color={this.iconColor}
          accessibilityLabel={"Envoyer en prive"}
          onPress={()=>{

          }}
        />
        <IconButton
          icon={"send-circle"}
          size={this.iconSize}
          color={this.iconColor}
          accessibilityLabel={"Envoyer a plusieur personne"}
          onPress={()=>{

          }}
        />
        <IconButton
          icon={"send-circle-outline"}
          size={this.iconSize}
          color={this.iconColor}
          accessibilityLabel={"Envoyer a un groupe de personne"}
          onPress={()=>{

          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view:{
    display: 'flex',
    flexDirection: 'row',
  }
})
