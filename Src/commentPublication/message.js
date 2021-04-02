import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback, TouchableHighlight,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Button,
  IconButton,
  Colors,
} from 'react-native-paper';
import IconPublicationBar from './IconPublicationBar';
import SimpleMessage from './SimpleMessage';
import Media from '../Publication/media';
import moment from 'moment';

export default class Message extends React.Component {
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
    // console.log('sender: ', props.sender.pseudo);
    const fichiers = props.item.fichiers;

    this.state = {
      //parametre d'une publication
      image: props.item.sender.profilUrl || require('../IMG/Jiraya.png'),
      media: fichiers,
      typeMedia: fichiers.length === 0 ? null : fichiers[0].mediaType,
      imageState: fichiers === [] ? 'none' : 'flex',
      nbreCommentaire: props.nbreCommentaire,
      nbreUnlike: props.nbreUnlike,
      nbreResend: props.nbreResend,
      nbreLike: props.nbreLike,
      typePublication: props.typePublication,
      texte_message: props.texte_message,
      idParentPublication: props.idParentPublication,
      listeCommentaires: props.listeCommentaires,
      listesLikes: props.listesLikes,
      idPublication: props.item.id,
      duree: moment(new Date(Date.now())).diff(moment(props.item.createdAt)),
      sender: props.sender,
      unique: props.unique,
      item: props.item
    };
  }

  iconSize = 21;
  unlike = Colors.redA100;
  like = Colors.redA100;
  send = Colors.greenA100;
  color = Colors.grey400;

  formatTime(time) {
    const years = moment.duration(time).years();
    if (years > 1) {
      return years + ' years'
    }else if(years === 1){
      return years + ' year'
    } else {
      const month = moment.duration(time).months();
      if (month > 1){
        return month + ' months'
      }else if (month === 1) {
        return month + ' month'
      }else {
        const day = moment.duration(time).days();
        if (day > 1){
          return day + ' days'
        }else if (day === 1) {
          return day + ' day'
        }else {
          const minute = moment.duration(time).minutes();
          if (minute > 1){
            return minute + ' min'
          }else {
            const second = moment.duration(time).seconds();
            if (second > 1){
              return second + ' s'
            }
          }
        }
      }
    }
  }
  _seeImage = item => {
    this.props.navigation.navigate('ImageOnly', {
      type: item == null ? '' : item.mediaType,
      lien: item.mediaUrl,
    });
  };

  _addCommentaire = item => {
    /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
    /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
    this.props.navigation.navigate('AddCommentaire', {item: item});
  };
  render() {
    const seeCommentaire = this.props.seePublication;
    const addComment = this._addCommentaire;
    return (
      <TouchableHighlight
        onPress={() => {
          /*this.props.navigation.setParams({
            data: this.props.data,
            item: this.props.item,
          })*/
          this.props.navigation.push('CommentPublication', {
            data: this.props.data,
            item: this.props.item,
          });

          // seeCommentaire(this.props.data, this.props.item);
          // this.props.navigation.navigate('CreateMessage');
        }}
      >
        <View style={styles.container}>
          <View style={styles.avatarBox}>
            <View style={styles.barreRepPre} />
            <TouchableOpacity onPress={() => {
              const user = {
                nom: this.state.sender.prenom + this.state.sender.nom,
                profilUrl: this.state.sender.profilUrl,
                pseudo: this.state.sender.pseudo,
                nombreAbonne: this.state.sender.nbreAbonnes,
                nombreAbonnement: this.state.sender.nbreAbonnemments,
                email: this.state.sender.mail,
              };
              this.props.navigation.navigate('ProfilOthers', {user: user});

            }}>
              <Image source={this.state.image} style={styles.avatar} />

            </TouchableOpacity>
            <View
              style={styles.barreRep}
              display={
                this.state.unique || ['IMG', 'AUD', 'VID'].includes(this.state.typeMedia)  ? 'none' : 'flex'
              }
            />

            <View
                style={styles.barreRepImg}
                display={this.state.typeMedia === 'IMG' && !this.state.unique ? 'flex' : 'none'}
            />
            <View
                style={styles.barreRepAud}
                display={this.state.typeMedia === 'AUD' && !this.state.unique ? 'flex' : 'none'}
            />
            <View
                style={styles.barreRepVid}
                display={this.state.typeMedia === 'VID' && !this.state.unique ? 'flex' : 'none'}
            />
          </View>
          <View style={styles.contenuBox}>
            <View>
              <View style={styles.titre}>
                <View style={styles.align}>
                  <Text style={styles.nom}>{ this.state.sender.pseudo }</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.duree}>
                    {' '}
                    {this.state.duree === undefined
                        ? ''
                        : this.formatTime(this.state.duree)}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View style={styles.msgBox}>
                  <Text style={styles.texteMsg}>
                    {this.state.texte_message}{' '}
                  </Text>
                </View>
                <View display={this.state.media.length < 1 ? 'none' : 'flex'}>
                  <TouchableWithoutFeedback
                      display={this.state.media.length < 1 ? 'none' : 'flex'}
                      onPress={() => {
                        console.log('pressed');
                      }}>
                    <View style={[styles.mediaBox, {
                      borderColor: this.state.media.length < 1 ? Colors.red200 : Colors.grey100,
                    }]}
                          display={this.state.media.length < 1 ? 'none' : 'flex'}>
                      <Media
                          type={this.state.typeMedia}
                          url={this.state.media}
                          item={this.state.item}
                          seeMedia={this._seeImage}
                          navigation={this.props.navigation}
                      />
                    </View>
                  </TouchableWithoutFeedback>

                </View>
              </View>
              <View>
                <IconPublicationBar
                  nbreCommentaire={this.state.nbreCommentaire}
                  nbreResend={this.state.nbreResend}
                  nbreLike={this.state.nbreLike}
                  nbreUnlike={this.state.nbreUnlike}
                  iconSize={this.iconSize}
                  addCommentaire={addComment}
                  item={this.state.item}
                  id={this.state.idPublication}
                  navigation={this.props.navigation}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderColor: Colors.grey300,
  },
  nom: {
    fontFamily: 'Slabo',
    fontSize: 16,
    fontWeight: 'bold',
  },
  duree: {
    fontFamily: 'calibri',
    fontSize: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignContent: 'center',
    color: Colors.grey500,
  },
  align: {
    justifyContent: 'center',
  },
  localisation: {
    fontFamily: 'Lora-Italic',
    fontSize: 10,
    paddingLeft: 6,
    color: Colors.grey400,
  },
  texteMsg: {
    fontFamily: 'Simonetta-regular',
    fontSize: 16,
    paddingLeft: 2,
    marginRight: 20,
  },
  avatarBox: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  barreRep: {
    borderColor: Colors.grey300,
    borderWidth: 1.5,
    marginBottom: 0,
    flex: 1,
  },
  barreRepPre: {
    borderColor: Colors.grey300,
    borderWidth: 0.4,
    marginBottom: 0,
  },
  barreRepImg: {
    borderColor: Colors.grey300,
    borderWidth: 1.5,
    marginBottom: 0,
    flex: 1,
  },
  barreRepAud: {
    borderColor: Colors.grey300,
    borderWidth: 1.5,
    marginBottom: 0,
    height: 230,
  },
  barreRepVid: {
    borderColor: Colors.grey300,
    borderWidth: 1.5,
    marginBottom: 0,
    height: 310,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 18,
  },
  contenuBox: {
    flex: 8,
    display: 'flex',
    /*
        flexDirection: 'row',
    */
  },
  titre: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  msgBox: {
    flex: 8,
  },
  mediaBox: {
    maxHeight: 300,
    marginRight: 20,
    marginLeft: 3,
    marginTop: 5,
    minHeight: 200,
    maxWidth: 250,
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 15,
  },
});
