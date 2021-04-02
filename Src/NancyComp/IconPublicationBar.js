import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Card, Title, Paragraph, Button, IconButton, Colors} from 'react-native-paper';


export default class IconPublicationBar extends React.Component {
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

      //couleur de l'icone lorsqu'elle est decochee
      inActive: Colors.grey400,

      //couleur  de cochage de l'icone
      active: Colors.yellow300,
      //couleur par defaut des icones
      checked: Colors.grey400,
      checked2: Colors.grey400,
      checked3: Colors.grey400,
      //etat par defaut des icones
      likee: false,
      likee2: false,
      likee3: false,
      iconLike: 'heart-outline',
      iconSize: props.iconSize,
      addComment: props.addCommentaire,
      item: props.item,

    };


  }

  unlike = Colors.redA100;
  like = Colors.redA100;
  send = Colors.greenA100;
  color = Colors.grey400;

  render() {
    return (
      <View style={styles.bottom}>

        <View style={styles.blockIcon}>
          <IconButton icon={this.state.iconLike} style={styles.iconButton} color={this.state.checked}
                      size={this.state.iconSize}
                      onPress={() => {
                        if (this.state.likee) {
                          this.setState({
                            nbreLike: this.state.nbreLike - 1,
                            likee: false,
                            iconLike: 'heart-outline',
                            checked: this.state.inActive,
                          });
                        } else {
                          this.setState({
                            nbreLike: this.state.nbreLike + 1,
                            likee: true,
                            iconLike: 'cards-heart',
                            checked: this.state.active,
                          });
                        }
                      }}
          />
          <Text>{this.state.nbreLike}</Text>
        </View>

        {/*<View>
          <IconButton icon="thumb-down-outline" style={styles.iconButton}
                      color={this.state.checked} size={this.state.iconSize}
                      onPress={() => {
                        if (!this.state.likee) {
                          this.setState({
                            nbreUnLike: this.state.nbreUnLike - 1,
                            likee: false,
                            iconLike: 'heart-outline',
                            checked: this.state.inActive,
                          });
                        } else {
                          this.setState({
                            nbreUnLike: this.state.nbreUnLike + 1,
                            likee: true,
                            iconLike: 'cards-heart',
                            checked: this.state.active,
                          });
                        }
                      }}
          />
          <Text>{this.state.nbreUnlike}</Text>
        </View>*/}

        {/* TODO mettre un champ pour afficher les images */}

        <View style={styles.blockIcon}>

          <IconButton icon="chat" style={styles.iconButton}
                      color={this.state.checked2} size={this.state.iconSize}
                      onPress={() => {
                        this.props.navigation.navigate('')
                        if (this.state.likee2) {
                          this.setState({
                            nbreCommentaire: this.state.nbreCommentaire - 1,
                            likee2: false,
                            checked2: this.state.inActive,
                          });
                        } else {
                          this.setState({
                            nbreCommentaire: this.state.nbreCommentaire + 1,
                            likee2: true,
                            checked2: this.state.active,
                          });
                        }
                      }}
          />
          <Text>{this.state.nbreCommentaire}</Text>
        </View>
        <View style={styles.blockIcon}>
          <IconButton icon="send" style={styles.iconButton}
                      color={this.state.checked3} size={this.state.iconSize}
                      onPress={() => {
                        if (this.state.likee3) {
                          this.setState({
                            nbreResend: this.state.nbreResend - 1,
                            likee3: false,
                            checked3: this.state.inActive,
                          });
                        } else {
                          this.setState({
                            nbreResend: this.state.nbreResend + 1,
                            likee3: true,
                            checked3: this.state.active,
                          });
                        }
                      }}
          />
          <Text>{this.state.nbreResend}</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  iconButton: {
    marginLeft: 25,
  },

  blockIcon: {
    alignItems: 'center',
    alignContent: 'stretch',
    alignSelf: 'center',
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    marginRight: 25,
    display: 'flex',
    flexDirection: 'row',
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

});
