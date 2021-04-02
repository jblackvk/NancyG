import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Card, Title, Paragraph, Button, IconButton, Colors} from 'react-native-paper';
import {Badge} from 'react-native-elements';
import IconPublicationBar from './IconPublicationBar';


export default class SimpleMessage extends React.Component {
  // state = {
  //   envoyer,
  //   Texte,
  //   icons,
  //   nbreCommentaire,
  //   nbreLike,
  //   typePublication,
  //   texte_message,
  //   idParentPublication,
  //   listeCommentaires,
  //   listesLikes,
  //
  //
  // }
  constructor(props) {
    super(props);
    this.state = {

      //parametre d'une publication
      nbreCommentaire: props.nbreCommentaire,
      nbreUnlike: props.nbreUnlike,
      nbreResend: props.nbreResend,
      nbreLike: props.nbreLike,
      typePublication: props.typePublication,
      texte_message: props.texte_message,
      idParentPublication: props.idParentPublication,
      listeCommentaires: props.listeCommentaires,
      listesLikes: props.listesLikes,

      //couleur de l'icone lorsqu'elle est decochee
      inActive: Colors.grey400,

      //couleur  de cochage de l'icone
      active: Colors.redA100,
      //couleur par defaut des icones
      checked: Colors.grey400,
      checked2: Colors.grey400,
      checked3: Colors.grey400,
      //etat par defaut des icones
      likee: false,
      likee2: false,
      likee3: false,
      iconLike: 'heart-outline',
    };
    if (props.texte_message.length > 40) {
      this.state.texte_message = this.state.texte_message.substring(0, 20) + '...';
    }

  }

  iconSize = 18;
  unlike = Colors.redA100;
  like = Colors.redA100;
  send = Colors.greenA100;
  color = Colors.grey400;

  render() {
    return (
      <View style={styles.view}>
        <Card style={styles.Card}>
          <Card.Title title="John Doe"
                      subtitle={'miami'}
                      style={{marginBottom: 0,
                        titleFontSize: 8
                      }}
                      left={(props) =>
                        <Avatar.Image {...props}
                                      size={24}
                                      source={require('../IMG/avatar-1.jpg')}/>}/>
          <Card.Content style={styles.publication}>
            <Text style={styles.texte}> {this.state.texte_message}</Text>
          </Card.Content>
          <View style={styles.bottom}>
            <IconPublicationBar nbreCommentaire={this.state.nbreCommentaire}
                                nbreResend={this.state.nbreResend}
                                nbreLike={this.state.nbreLike}
                                nbreUnlike={this.state.nbreUnlike}
                                iconSize={this.iconSize}
            />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  iconButton: {
    marginLeft: 25,
  },

  texte: {
    fontFamily:  'Helvetica',
    fontSize: 12,
  },
  view: {},

  reponseBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey400,
  },
  bottom: {
    alignItems: 'center',
    alignContent: 'stretch',
    alignSelf: 'center',
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  publication: {
    marginTop: 0,
    paddingLeft: 60,
  },

  View0: {
    marginTop: 5,
    borderTopWidth: 0.4,
  },

  Card: {
    borderTopColor: 'grey',
    marginTop: 1,
    paddingLeft: 5,
    borderRadius: 20,
  },
});
