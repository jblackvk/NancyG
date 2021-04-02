import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import {} from 'react-native-paper';

//import NancyComp from '../NancyComp/NancyComp';
import CreateMessage from '../createMessage/CreateMessage';
import Publication from '../Publication/Publication';
import {connect} from 'react-redux';
import {getPublications} from '../../redux/actions/publication.actions';
import {Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import {Colors} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import CommentMessage from '../createMessage/CommentMessage';

class HomePage extends React.Component {
  /*state = {
            liste ,
          }
          componentDidMount(): void {
            //todo ici on doit recuperer la liste des discussions
            this.state.liste = [[test1, test2], [test3, test4], [test5, test6]]
          }*/

  constructor() {
    super();
    this.state = {
      isLoading: false,
      data: [],
      scroll: 'flex',
      has_more: true, // to know if there is next page for loading
      next_page: 1, // current page
      refresh: false,
    };
    this.nbrePublication = 0;
    this.totalPublication = 0;
    this.nbrePage = 0;
    this.page = 0;
    this.asc = 'ascend';
    this.des = 'descend';
  }

  /*UNSAFE_componentWillReceiveProps() {
        // This will erase any local state updates!
        // Do not do this.
        // if (nextProps.data && nextProps.data.length !== this.state.data.length) {
        //   //pck les notifications arrivent dans data
        //   console.log("data", nextProps.data);
        //   this.setState({
        //     data: [...this.state.data, nextProps.data],
        //   });
        // }

    }*/

  //   UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
  //     console.log('next props', nextProps.data);
  //   }

  /*UNSAFE_componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {
        console.log('update');
    }*/
  /*componentWillReceiveProps(nextProps) {
              // This will erase any local state updates!
              // Do not do this.
              this.setState({data: ParseDataFromBackend(nextProps.publications)});
          }*/

  componentDidMount() {
    //je lance le loader
    this.setState({isLoading: !this.state.isLoading});
    //je passe les args , puis mes callback defini
    //je je veux passer la page , je le fait dans le premier argument

    this.props.GetPublications(
      {},
      this.onSuccess,
      this.onFailled,
      this.notifMessage,
    );
    // console.log('data from onSuccess: ', this.state.publications)
     //pas encore de data apres l'appel , c'est asynchrone
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      return {
        refresh: !state.refresh,
        data: props.data,
      };
    }
    return null;
  }

  _onLoading() {
    if (this.state.isLoading) {
      return (
        <view>
          <ActivityIndicator size={'large'} color={'#FFDB58'} />
        </view>
      );
    }
  }

  /*getPublication(idUser, page) {
        /!*todo verifier et modifier ce code avec le backend*!/
        this.props.getPublications({page: page});
    }
*/
  _loadPublication(mode) {
    this.setState({isLoading: true});
    if (mode === 'ascend') {
      this.getPublication(this.page).then(newData => {
        this.page++;
        const dataAdd = [...this.state.data, ...newData];
        this.setState({data: dataAdd});
        /*todo verifier et modifier ce code avec le backend*/
        this.setState({isLoading: false});
      });
    } else if (mode === 'descend') {
      this.getPublication(this.page).then(newData => {
        this.page++;
        const dataAdd = [...newData, ...this.state.data];
        this.setState({data: dataAdd});
        /*todo verifier et modifier ce code avec le backend*/
        this.setState({isLoading: false});
      });
    }
  }

  /* _updatePublication() {
        this.page = 0;
        this.nbrePage = 0;
        this.setState(
            {
                data: [],
            },
            () => {
                this._loadPublication(this.des);
            },
        );
    }*/

  /* updatePublication() {
        this.setState({isLoading: true});
        //je passe les args , puis mes callback defini
        //je je veux passer la page , je le fait dans le premier argument

        this.props.GetPublications(
            {},
            this.onSuccess,
            this.onFailled,
            this.notifMessage,
        );
    }*/

  _seePublication = (data, item) => {
    /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
    /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
    this.props.navigation.navigate('CommentPublication', {
      data: data,
      item: item,
      seePublication: this._seePublication,
    });
  };

  _seeImage = item => {
    this.props.navigation.navigate('ImageOnly', {
      type: item == null ? '' : item.mediaType,
      lien: item.mediaUrl,
    });
  };

  _seeVideo = (data, item) => {
    this.props.navigation.navigate('ImageOnly', {data: data, item: item});
  };
  _seeAudio = (data, item) => {
    this.props.navigation.navigate('ImageOnly', {data: data, item: item});
  };
  _addCommentaire = item => {
    /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
    /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
    this.props.navigation.navigate('AddCommentaire', {
      item: item
    });

  };
  _createMessage = () => {
    this.props.navigation.navigate('CreateMessage');
  };
  iconColor = '#FFDB58';
  getHeader = () => {
    return (
      <TouchableWithoutFeedback onPress={this._createMessage}>
        <View
          style={{
            borderBottomWidth: 0.4,
          }}>
          <TextInput
            placeholder="Appuyez ici pour Creer une publication"
            style={styles.textArea}
            multiline
            numberOfLines={3}
            blurOnSubmit={true}
            underlineColorAndroid={'transparent'}
            maxLength={200}
            autoFocus={true}
            editable={false}
            onAccessibilityTap={this._createMessage}
          />
          <View style={styles.icone}>
            <IconButton
              icon={'send'}
              size={this.iconSize}
              color={this.iconColor}
              disabled={true}
            />
            <IconButton
              icon={'send-circle-outline'}
              size={this.iconSize}
              color={this.iconColor}
              disabled={true}
            />
            <IconButton
              icon={'camera'}
              size={this.iconSize}
              color={this.iconColor}
              disabled={true}
            />
            <IconButton
              icon={'video'}
              size={this.iconSize}
              color={this.iconColor}
              disabled={true}
            />
            <IconButton
              icon={'microphone'}
              size={this.iconSize}
              color={this.iconColor}
              disabled={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  /* getFooter = () => {
        return (
            <IconButton
                icon={'reload'}
                size={25}
                onPress={() => {
                    this.setState({isLoading: true});
                    //je passe les args , puis mes callback defini
                    //je je veux passer la page , je le fait dans le premier argument

                    this.props.GetPublications(
                        {},
                        this.onSuccess,
                        this.onFailled,
                        this.notifMessage,
                    );
                }}
            />
        );
    };*/

  setEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        {!this.props.get_loading && (
          <View
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('window').height / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 15}}>
              {' '}
              Vous n'avez pas encore de publication !
            </Text>
          </View>
        )}
      </View>
    );
  };

  onSuccess = data => {
    //access direct aux data
    console.log('on success begin');
    //console.log('data on success:', data.publications);
    var finish = data.publications.length === 0;
    //dont uses data in props
    var next_page = finish ? this.state.next_page : this.state.next_page + 1;
    this.setState({
      isLoading: !this.state.isLoading,
      has_more: !finish,
      next_page: next_page,
    });
    console.log('on success end!');
    //this.setState({isLoading: !this.state.isLoading});
  };
  onFailled = error => {
    this.setState({isLoading: !this.state.isLoading});
    showMessage({
      message: 'Notification',
      // le message . je pouvais aussi choisir statusText ou meme formater le body
      description: error.message,
      type: 'danger',
      icon: {
        icon: 'danger',
        position: 'left',
      },
      duration: 1000,
    });
  };

  //facultatif
  notifMessage = (data, error) => {
    if (data) {
      //je ne fais rien
    } else if (error) {
      //retourne le corps du message
      return error.message;
    }
  };

  renderFloatButton = () => {};

  render() {
    return (
      <View style={{marginBottom: 115}}>
        <View
          style={[
            styles.alignH,
            {
              backgroundColor: Colors.white,
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
            },
          ]}
        >
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{fontSize: 21}}> Planete Nancy</Text>
          </View>
          <View style={styles.alignH}>
            <TouchableOpacity
              onPress={() => {
                /*const user = {
                                                nom: this.state.sender.prenom + this.state.sender.nom,
                                                profilUrl: this.state.sender.profilUrl,
                                                pseudo: this.state.sender.pseudo,
                                                nombreAbonne: this.state.sender.nbreAbonnes,
                                                nombreAbonnement: this.state.sender.nbreAbonnemments,
                                                email: this.state.sender.mail,
                                            };*/
                this.props.navigation.navigate('Profil');
              }}>
              <Image
                source={require('../IMG/person_120px.png')}
                resizeMode={'cover'}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconButton icon={'settings'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View >
          {/*todo chercher a corriger le warning liee au conflit  entre scrollview et FlatList*/}
          <FlatList
            data={
              this.state.data.length
                ? [this.state.data[0] ,  ...this.state.data.slice(1)].sort((a, b)=> a._id > b._id ? -1 : 1)
                : []
            }
            extraData={this.state.refresh}
            renderItem={({item}) => (
              <Publication
                item={item}
                data={this.state.data}
                seePublication={this._seePublication}
                addCommentaire={this._addCommentaire}
                seeImage={this._seeImage}
                navigation={this.props.navigation}
                // update={this.updatePublication()}
                first={true}
                comment={false}
              />
            )}
            onEndReachedThreshold={2}
            onEndReached={() => {
              if (this.state.has_more && !this.state.isLoading) {
                this.props.GetPublications(
                  {page: this.state.next_page},
                  this.onSuccess,
                  this.onFailled,
                  this.notifMessage,
                );
              }
            }}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={this.getHeader}
            // ListFooterComponent={this.getFooter}
            ListEmptyComponent={this.setEmpty}
          />

          {/*{this._onLoading()}*/}
          {/* check if loading then loading */}
          {this.state.isLoading && <ActivityIndicator color="#FFDB58" size={this.state.data.length === 0 ? 'large' : 'small' }  />}
        </View>
        <View
          style={styles.container}
          ref={view => {
            this.floatView = view;
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CreateMessage')}>
            <Animated.View style={[styles.button, styles.menu]}>
              <Foundation name="pencil" size={24} color="#fcfcfa" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const imgSize = 45;
const styles = StyleSheet.create({
  alignH: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 20,
    paddingBottom: -20,
    fontSize: 18,
  },
  avatar: {
    height: imgSize,
    width: imgSize,
    borderRadius: 24,
    resizeMode: 'cover',
    marginLeft: 15,
  },
  container: {
    alignItems: 'center',
    bottom: -35,
    right: 25,
    position: 'absolute',
  },
  icone: {
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    position: 'relative',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    opacity: 0.84,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.30,
    shadowRadius: 7.49,
    elevation: 30,

  },
  menu: {
    backgroundColor: Colors.yellow400,
  },
});

const parseDataFromRedux = data => {
  return {
    image: data.fichiers,
    nbreCommentaire: data.nbreCommentaire,
    nbreUnlike: data.nbreUnlike,
    nbreResend: data.nbreResend,
    nbreLike: data.nbreLike,
    typePublication: data.typePublication,
    texte_message: data.message,
    idParentPublication: data.idParentPublication,
    listeCommentaires: data.listeCommentaires,
    listesLikes: data.listesLikes,
    idPublication: data.id,
    duree: data.duree,
    sender: data.sender,
  };
};

const mapStateToprops = state => {
  return {
    //je recupere tout dans data. c'est un choix
    data: state.publicationReducer.planeteNancyPublications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // je ne peut pas faire de setState ici, c'est hors de mon component
    // args c'est pour prendre les parametres http comme page
    GetPublications: (args, onSuccess, onFailled, notifMessage) => {
      return dispatch(
        // undifined pour dire que je ne connais pas l'id de la communauté
        getPublications(undefined, args, {
          onSuccess: onSuccess,
          onFailled: onFailled,
          notifMessage: notifMessage,
        }),
      );
    },
  };
};

/*const Book = liste.map((list)=>{
<NancyComp nbreCommentaire={0} nbreUnlike={0} nbreResend={0} nbreLike={0} typePublication=""
texte_message = "bonjour pourquoi je ne sais pas quoi ecrire?" idParentPublication={ []}
listeCommentaires={[]}
listesLikes={[]}></NancyComp>
})*/

export default connect(
  mapStateToprops,
  mapDispatchToProps,
)(HomePage);
