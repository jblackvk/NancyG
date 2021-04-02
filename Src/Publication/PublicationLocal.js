import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import Media from './mediaLocal';
import IconPublicationBar from '../Publication/IconPublicationBar';
import {Colors} from 'react-native-paper';
import CommentPublication from '../commentPublication/commentPublication';
import Message from '../Publication/messageLocal';

export default class Publication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: require('../IMG/avatar-1.jpg'),
      reponse: false,
      media: props.item.image,
      typeMedia: props.item.typeMedia,
      imageState: props.item.image === undefined ? 'none' : 'flex',
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
      duree: props.item.duree,
      data: props.data,
      item: props.item,
      first: props.first,
      sender: props.item.sender,

    };
  }

  iconSize = 22;
  color = Colors.grey400;

  formatTime(time) {
    if (time < 60) {
      let t = time;
      return t + 's';
    } else if (60 <= time && time < 3600) {
      let t = time / 60;
      if (time % 60 === 0) {
        return t + 'min';
      } else {
        return t.toFixed(1) + 'min';
      }
    } else if (3600 <= time && time < 86400) {
      let h = time / 3600;
      if (time % 3600 === 0) {
        return h + 'h';
      } else {
        return h.toFixed(1) + 'h';
      }
    } else if (86400 <= time && time < 604800) {
      let d = time / 86400;
      if (time % 3600 === 0) {
        return d + 'j';
      } else {
        return d.toFixed(1) + 'j';
      }
    } else if (604800 <= time && time < 2678400) {
      let s = time / 604800;
      if (time % 3600 === 0) {
        return s + 'sem';
      } else {
        return s.toFixed(1) + 'sem';
      }
    } else if (2678400 <= time && time < 31536000) {
      let m = time / 2419200;
      if (time % 3600 === 0) {
        return m + 'mois';
      } else {
        return m.toFixed(1) + 'mois';
      }
    } else if (time >= 31536000) {
      let a = time / 31536000;
      if (time % 3600 === 0) {
        return a + 'ans';
      } else {
        return a.toFixed(1) + 'ans';
      }
    }
  }

  render() {
    const addComment = this.props.addCommentaire;
    const seePublication = this.props.seePublication;
    return (
      <TouchableHighlight
        onPress={() => {
          console.log('pressed');
        }}
        style={{alignContent: 'center'}}>
        <View>
          <View style={styles.container}>
            <View style={styles.avatarBox}>
              <Image source={this.state.image} style={styles.avatar} />
              {/*
              <View style={styles.barreRep} display={this.state.typeMedia === undefined ? 'flex': 'none'}/>
*/}
              <View
                style={styles.barreRepImg}
                display={this.state.typeMedia === 'IMG' && this.state.listeCommentaires.length >= 1 ? 'flex' : 'none'}
              />
              <View
                style={styles.barreRepAud}
                display={this.state.typeMedia === 'AUD' && this.state.listeCommentaires.length !== 0 ? 'flex' : 'none'}
              />
              <View
                style={styles.barreRepVid}
                display={this.state.typeMedia === 'VID' && this.state.listeCommentaires.length !== 0  ? 'flex' : 'none'}
              />
            </View>
            <View style={styles.contenuBox}>
              <View>
                <View style={styles.titre}>
                  <View style={styles.align}>
                    <Text style={styles.nom}>{this.state.sender.pseudo}</Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.point,
                        {
                          marginTop: -10,
                          height: 10,
                          alignItems: 'stretch',
                          justifyContent: 'center',
                        },
                      ]}>
                      .
                    </Text>
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
                {/* <View style={styles.align}>
                  <Text style={styles.localisation}>Miami</Text>
                </View>*/}
              </View>
              <View style={{marginTop: 8}}>
                <View>
                  <View style={styles.msgBox}>
                    <Text style={styles.texteMsg}>
                      {this.state.texte_message}{' '}
                    </Text>
                  </View>

                  <TouchableWithoutFeedback
                    display={this.state.media === undefined ? 'none' : 'flex'}
                    onPress={() => {}}>
                    <View style={styles.mediaBox}>
                      <Media
                        type={this.state.typeMedia}
                        url={this.state.media}
                        item={this.state.item}
                        seeMedia={this.props.seeImage}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={{position: 'relative', justifyContent: 'flex-end'}}>
                  <IconPublicationBar
                    nbreCommentaire={this.state.nbreCommentaire}
                    nbreResend={this.state.nbreResend}
                    nbreLike={this.state.nbreLike}
                    nbreUnlike={this.state.nbreUnlike}
                    iconSize={this.iconSize}
                    addCommentaire={addComment}
                    item={this.state.item}
                  />
                </View>
              </View>
            </View>
          </View>
          {this.state.item.listeCommentaires.length !== 0 && (
            <View display={this.state.first === true ? 'flex' : 'none'}>
              <Message
                nbreCommentaire={
                  this.state.item.listeCommentaires[0].nbreCommentaire
                }
                nbreUnlike={this.state.item.listeCommentaires[0].nbreLike}
                nbreResend={this.state.item.listeCommentaires[0].nbreResend}
                nbreLike={this.state.item.listeCommentaires[0].nbreLike}
                sender = {
                  this.state.item.listeCommentaires[0].sender
                }
                item={this.state.item}
                typePublication={
                  this.state.item.listeCommentaires[0].typePublication
                }
                texte_message={
                  this.state.item.listeCommentaires[0].texte_message
                }
                idParentPublication={
                  this.state.item.listeCommentaires[0].idParentPublication
                }
                listeCommentaires={
                  this.state.item.listeCommentaires[0].listeCommentaires
                }
                listesLikes={this.state.item.listeCommentaires[0].listesLikes}
                image={this.state.item.listeCommentaires[0].image}
                idPublication={
                  this.state.item.listeCommentaires[0].idPublication
                }
                seePublication={this._seePublication}
                addComment={this._addCommentaire}
                unique={true}
              />
            </View>
          )}
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
    borderTopWidth: 0.8,
    borderColor: Colors.grey400,
    paddingTop: 20,
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
  point: {
    fontFamily: 'calibri',
    fontSize: 22,
    marginLeft: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    color: Colors.grey900,
    textAlign: 'center',
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
    fontFamily: 'Slabo',
    fontSize: 16,
    paddingLeft: 2,
    marginRight: 20,
  },
  avatarBox: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
  },
  barreRep: {
    borderColor: Colors.grey500,
    borderWidth: 1,
    marginBottom: 0,
    height: 120,
  },
  barreRepImg: {
    borderColor: Colors.grey500,
    borderWidth: 1,
    marginBottom: 0,
    height: 310,
  },
  barreRepAud: {
    borderColor: Colors.grey500,
    borderWidth: 1,
    marginBottom: 0,
    height: 230,
  },
  barreRepVid: {
    borderColor: Colors.grey500,
    borderWidth: 1,
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
    marginRight: 20,
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
    maxHeight: 350,
    marginRight: 20,
    marginLeft: 3,
    marginTop: 15,
    width: 250,
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 10,
  },
});
