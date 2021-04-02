import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Avatar, Card, Title, Paragraph, Button, IconButton, Colors} from 'react-native-paper';
import {Badge} from 'react-native-elements';
import IconPublicationBar from './IconPublicationBar';
import SimpleMessage from './SimpleMessage';


export default class NancyComp extends React.Component {
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
      image: props.item.image,
      imageState: props.item.image === undefined ? 'none': 'flex',
      nbreCommentaire: props.item.nbreCommentaire,
      nbreUnlike: props.item.nbreUnlike,
      nbreResend: props.item.nbreResend,
      nbreLike: props.item.nbreLike,
      typePublication: props.item.typePublication,
      texte_message: props.item.texte_message,
      idParentPublication: props.item.idParentPublication,
      listeCommentaires: props.item.listeCommentaires,
      listesLikes: props.item.listesLikes,
      idPublication: props.item.idPublication,
      data: props.data,
      item: props.item,
    };


  }

  iconSize = 36;
  unlike = Colors.redA100;
  like = Colors.redA100;
  send = Colors.greenA100;
  color = Colors.grey400;



  render() {
    const seePublication = this.props.seePublication;
    const addComment = this.props.addCommentaire;
    return (
      <TouchableOpacity onPress={() => {
        seePublication(this.state.data, this.state.item);
      }}
      >
        {/*<TouchableOpacity onPress={() => {
        seePublication(this.state.idPublication, {data: this.state.data});
      }}
      >
        <Card style={styles.Card}>
          <Card.Title title="John Doe" subtitle="Miami"
                      left={(props) => <Avatar.Image {...props} size={40} source={require('../IMG/avatar-1.jpg')}/>}/>
          <Card.Content style={styles.publication}>
            <Text style={styles.texte}> {this.state.texte_message.trim()}</Text>
          </Card.Content>
          <View>
            <Image display={this.state.imageState} source={this.state.image} style={{width:300, height:300}}/>
          </View>
          <View style={styles.bottom}>
            <IconPublicationBar nbreCommentaire={this.state.nbreCommentaire}
                                nbreResend={this.state.nbreResend}
                                nbreLike={this.state.nbreLike}
                                nbreUnlike={this.state.nbreUnlike}
                                iconSize={this.iconSize}
            />
          </View>
        </Card>
      </TouchableOpacity>*/}

        <Card style={styles.Card}>
          <Card.Title title="John Doe" subtitle="Miami"
                      left={(props) => <Avatar.Image {...props} size={40} source={require('../IMG/avatar-1.jpg')}/>}/>
          <View style={styles.publication}>
            <Text style={styles.texte}> {this.state.texte_message}</Text>
          </View>
          <View>
            <Image display={this.state.imageState} source={this.state.image} style={{width:300, height:300}}/>
          </View>
          <View style={styles.reponseBox}>
            <SimpleMessage nbreCommentaire={this.state.listeCommentaires[0].nbreCommentaire}
                           nbreUnlike={this.state.listeCommentaires[0].nbreUnlike}
                           nbreResend={this.state.listeCommentaires[0].nbreResend}
                           nbreLike={this.state.listeCommentaires[0].nbreLike}
                           typePublication={this.state.listeCommentaires[0].typePublication}
                           texte_message={this.state.listeCommentaires[0].texte_message}
                           idParentPublication={this.state.listeCommentaires[0].idParentPublication}
                           listeCommentaires={this.state.listeCommentaires[0].listeCommentaires}

            />
          </View>
          <View style={styles.bottom}>
            <IconPublicationBar nbreCommentaire={this.state.nbreCommentaire}
                                nbreResend={this.state.nbreResend}
                                nbreLike={this.state.nbreLike}
                                nbreUnlike={this.state.nbreUnlike}
                                iconSize={this.iconSize}
                                addCommentaire = {addComment}
                                item = {this.state.item}

            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  iconButton: {
    marginLeft: 25,
    backgroundColor: Colors.grey400,
  },

  texte: {
    fontFamily: 'verdana',
    includeFontPadding: false,
    fontSize: 20,
  },

  reponseBox: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 1,
    maxHeight: 140,
    borderColor: Colors.grey500,
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
    paddingLeft: 60,
  },

  View0: {
    marginTop: 5,
    borderTopWidth: 0.4,
  },

  Card: {
    borderTopColor: 'grey',
    borderTopWidth: 0.3,
    paddingLeft: 5,
  },
});
