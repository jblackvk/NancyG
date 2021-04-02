import React from 'react';
import {} from 'react-native-paper';
import {connect} from 'react-redux';
import {FlatList, ScrollView, View, SafeAreaView, ActivityIndicator} from 'react-native';
import Message from './message';
import NancyComp from '../NancyComp/NancyComp';
import CreateMessage from '../createMessage/CreateMessage';
import Publication from '../Publication/Publication';
import {GetPublicationCommentList} from '../../redux/actions/publication.actions';
import {showMessage} from 'react-native-flash-message';

class CommentPublication extends React.Component {
    constructor(props) {
        super(props);
        // console.log(' item publication: ', props.navigation.state.params.item);
        this.state = {
            data: props.navigation.state.params.data,
            item: props.navigation.state.params.item,
            idCommunaute: props.navigation.state.params.idCommunaute,
            listeCommentaire: [],
            isLoading: false,
            has_more: true,
            next_page: 1,
            refresh: false,
        };
    }

    chargerCommentaire = (page) => {
        this.setState({isLoading: !this.state.isLoading});
        /* console.log('id communaute recu: ', this.state.idCommunaute)
         console.log('id publication recu: ', this.state.item.id)*/
        this.props.GetCommentaires(
            this.state.idCommunaute,
            this.state.item._id,
            page,
            this.onSuccess,
            this.onFailled,
            this.notifMessage,
        );
    };

    componentDidMount() {
        this.chargerCommentaire({});
    }



    onSuccess = data => {
        //access direct aux data
        console.log('data liste_commentaire: ', data.commentaires);
        // console.log('on success begin');
        //console.log('data on success:', data.publications);
        var finish = data.commentaires.length === 0;
        //dont uses data in props
        var next_page = finish ? this.state.next_page : this.state.next_page + 1;
        this.setState({
            listeCommentaire: [...this.state.listeCommentaire, ...data.commentaires],
            isLoading: !this.state.isLoading,
            has_more: !finish,
            next_page: next_page,
        });
        // console.log('data liste_commentaire: ', data.commentaires);
        //this.setState({isLoading: !this.state.isLoading});
    };
    onFailled = error => {
        this.setState({isLoading: !this.state.isLoading});
        /*console.log('error', error);
        console.log('error detail: ', error.body.errors);*/
        console.log(error)
        if (error.body == null) {
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
        } else if (error.body.errors == null) {
            showMessage({
                message: 'Notification',
                // le message . je pouvais aussi choisir statusText ou meme formater le body
                description: error.body,
                type: 'danger',
                icon: {
                    icon: 'danger',
                    position: 'left',
                },
                duration: 1000,
            });
        } else {
            error.body.errors.map((error, index) => showMessage({
                    message: 'Notification',
                    // le message . je pouvais aussi choisir statusText ou meme formater le body
                    description: error.msg,
                    type: 'danger',
                    icon: {
                        icon: 'danger',
                        position: 'left',
                    },
                    duration: 1000 * (index + 1),
                }),
            );

        }
    };

    //facultatif
    notifMessage = (data, error) => {
        if (data) {
            //je ne fais rien
            return;
        } else if (error) {
            //retourne le corps du message
            return error.message;
        }
    };


    _seePublication = (data, item) => {
        /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
        /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
        this.props.navigation.navigate('CommentPublication', {
            data: data,
            item: item,
            idCommunaute: this.state.idCommunaute,
        });

    };

    _seeCommentaire = (data, item) => {
        this.props.navigation.state.params.seePublication(data, item);

    };

    -seeImage = (data, item) => {
        this.props.navigation.navigate('ImageOnly', {data: data, item: item});
    };

    -seeVideo = (data, item) => {
        this.props.navigation.navigate('ImageOnly', {data: data, item: item});
    };
    -seeAudio = (data, item) => {
        this.props.navigation.navigate('ImageOnly', {data: data, item: item});
    };

    _addCommentaire = (item) => {
        /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
        /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
        this.props.navigation.navigate('AddCommentaire', {item: item});

    };
    getHeader = () => {
        return (
            <Publication item={this.state.item}
                         seePublication={this._seePublication}
                         addCommentaire={this._addCommentaire}
                         navigation={this.props.navigation}
                         data={this.state.data}
                         first={false}
                         comment={true}
            />
        );
    };

    render() {
        return (
            <SafeAreaView>
                <FlatList data={
                    this.state.listeCommentaire.length
                        ? [this.state.listeCommentaire[0], ...this.state.listeCommentaire.slice(1)].sort((a, b) => a.id > b.id ? -1 : 1)
                        : []
                }
                          renderItem={
                              ({item, index}) => (<Message nbreCommentaire={item.nbreCommentaire}
                                                           nbreUnlike={item.nbreLike} nbreResend={item.nbreResend}
                                                           nbreLike={item.nbreLike}
                                                           typePublication={item.typePublication}
                                                           texte_message={item.contenu}
                                                           idParentPublication={item.idParentPublication}
                                                           listeCommentaires={item.listeCommentaires}
                                                           listesLikes={item.listesLikes}
                                                           image={item.fichiers}
                                                           item={item}
                                                           seeCommentaire={this._seeCommentaire}
                                                           data={this.state.item.listeCommentaires}
                                                           idPublication={item.id}
                                                           seePublication={this._seePublication}
                                                           unique={index === (this.state.listeCommentaire.length - 1)}
                                                           sender={item.sender}
                                                           {...this.props}
                              />)
                          }
                          extraData={this.state.listeCommentaire}
                          onEndReachedThreshold={2}
                          onEndReached={() => {
                              if (this.state.has_more && !this.state.isLoading) {
                                  this.chargerCommentaire({page: this.state.next_page});
                              }
                          }}
                          keyExtractor={((item, index) => index)}
                          ListHeaderComponent={this.getHeader}
                >
                </FlatList>
                {this.state.isLoading &&
                <ActivityIndicator size={this.state.listeCommentaire.length === 0 ? 'large' : 'small'}
                                   color="#FFDB58"/>}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetCommentaires: (idCommunaute, idPublication, args, onSuccess, onFailed, notifMessage) => {
            return dispatch(
                GetPublicationCommentList(idCommunaute, idPublication, args, {
                    onSuccess: onSuccess,
                    onFailled: onFailed,
                    notifMessage: notifMessage,
                }),
            );
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(CommentPublication);
