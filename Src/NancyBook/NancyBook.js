import React from 'react';
import {View, ScrollView, FlatList, SafeAreaView, ActivityIndicator, Text} from 'react-native';
import {} from 'react-native-paper';

import NancyComp from '../NancyComp/NancyComp';
import iterableToArray from '@babel/runtime/helpers/esm/iterableToArray';
import CreateMessage from '../createMessage/CreateMessage';
import Publication from '../Publication/PublicationLocal';

export default class NancyBooks extends React.Component {

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
            data: [
                {
                    id: 1,
                    _id:1,
                    nbreCommentaire: 999,
                    nbreUnlike: 10000,
                    nbreLike: 999999,
                    nbreResend: 1000000000,
                    typeMedia: 'IMG',
                    duree: 1209600,
                    image: [require('../IMG/Jiraya.png')],
                    idPublication: {},
                    typePublication: '',
                    texte_message: 'bonjour pourquoi je ne sais pas quoi ecrire🤣?',
                    idParentPublication: {},
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 5,
                            duree: 189216020,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire🤣?',
                        },
                        {
                            id: 2,
                            _id:2,
                            nbreCommentaire: 7,
                            nbreUnlike: 14,
                            duree: 189216020,
                            nbreResend: 5,
                            nbreLike: 12,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire2🤣?',
                        },
                        {
                            id: 3,
                            _id: 3,
                            nbreCommentaire: 5,
                            duree: 189216020,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],
                },
                {
                    id: 2,
                    _id: 2,
                    nbreCommentaire: 5,
                    nbreUnlike: 6,
                    nbreLike: 7,
                    nbreResend: 9,
                    typeMedia: 'VID',
                    duree: 30240005,
                    image: require('../IMG/soulVideo.mp4'),
                    idPublication: {},
                    typePublication: '',
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    texte_message: 'bonjour pourquoi je ne sais toujours pas quoi ecrire mais je dois ecrire quelque chose;😂?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 7,
                            duree: 189216020,
                            nbreUnlike: 14,
                            nbreResend: 6,
                            nbreLike: 12,
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            typePublication: '',
                            texte_message: 'pourquoi dois-je ecrire2🤣?',
                        },
                        {
                            id: 2,
                            _id: 2,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            duree: 189216020,
                            nbreLike: 16,
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            typePublication: '',
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],

                },
                {
                    id: 3,
                    _id: 3,
                    nbreCommentaire: 4,
                    nbreUnlike: 12,
                    nbreLike: 3,
                    nbreResend: 12,
                    typeMedia: 'VID',
                    duree: 172800,
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    image: require('../IMG/video.mp4'),
                    idPublication: {},
                    typePublication: '',
                    texte_message: 'bof j\'abandonne😕?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 4,
                            nbreUnlike: 12,
                            duree: 189216020,
                            nbreResend: 3,
                            nbreLike: 12,
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            typePublication: '',
                            texte_message: 'quelqu\'un doit-il ecrire2🤣?',
                        },
                        {
                            id: 2,
                            _id: 2,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            duree: 189216020,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],

                },
                {
                    id: 4,
                    _id: 4,
                    nbreCommentaire: 10,
                    nbreUnlike: 67474,
                    nbreLike: 6333,
                    nbreResend: 22,
                    duree: 35,
                    idPublication: {},
                    typeMedia: 'IMG',
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    image: [require('../IMG/Malaisie.jpg'), require('../IMG/image5.jpg')],
                    typePublication: '',
                    texte_message: 'bonjour pourquoi je ne sais pas quoi ecrire🤣?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            duree: 189216020,
                            nbreResend: 5,
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            nbreLike: 16,
                            typePublication: '',
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire🤣?',
                        },
                        {
                            id: 2,
                            _id: 2,
                            nbreCommentaire: 7,
                            duree: 189216020,
                            nbreUnlike: 14,
                            nbreResend: 5,
                            nbreLike: 12,
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            typePublication: '',
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire2🤣?',
                        },
                        {
                            id: 3,
                            _id: 2,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            duree: 189216020,
                            nbreResend: 5,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],
                },
                {
                    id: 5,
                    _id: 5,
                    nbreCommentaire: 5,
                    nbreUnlike: 6,
                    nbreLike: 7,
                    nbreResend: 9,
                    typeMedia: 'IMG',
                    duree: undefined,
                    image: [require('../IMG/malaisie2.jpg'),
                        require('../IMG/image4.jpg'), require('../IMG/image3.jpg')],
                    idPublication: {},
                    typePublication: '',
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    texte_message: 'bonjour pourquoi je ne sais toujours pas quoi ecrire mais je dois ecrire quelque chose;😂?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 7,
                            duree: 189216020,
                            nbreUnlike: 14,
                            nbreResend: 6,
                            nbreLike: 12,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi dois-je ecrire2🤣?',
                        },
                        {
                            id: 2,
                            _id: 2,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            duree: 189216020,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],

                },
                {
                    id: 6,
                    _id: 6,
                    nbreCommentaire: 4,
                    nbreUnlike: 12,
                    nbreLike: 3,
                    duree: 378432000,
                    nbreResend: 12,
                    typeMedia: 'IMG',
                    image: [require('../IMG/image3.jpg'),
                        require('../IMG/soleil.jpg'),
                        require('../IMG/automneColor.jpg'),
                        require('../IMG/cascade.jpg'),
                    ],
                    idPublication: {},
                    typePublication: '',
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    texte_message: 'bof j\'abandonne😕?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 4,
                            duree: 189216020,
                            nbreUnlike: 12,
                            nbreResend: 3,
                            nbreLike: 12,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'quelqu\'un doit-il ecrire2🤣?',
                        },
                        {
                            id: 2,
                            _id: 2,
                            nbreCommentaire: 5,
                            duree: 189216020,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],

                },
                {
                    id: 7,
                    _id: 7,
                    nbreCommentaire: 0,
                    nbreUnlike: 0,
                    nbreLike: 0,
                    nbreResend: 0,
                    duree: undefined,
                    typeMedia: 'IMG',
                    image: [require('../IMG/image4.jpg')],
                    idPublication: {},
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    typePublication: '',
                    texte_message: 'bonjour pourquoi je ne sais pas quoi ecrire🤣?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            nbreLike: 16,
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            duree: 189216020,
                            typePublication: '',
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire🤣?',
                        },
                        {
                            id: 2,
                            _id: 2,
                            nbreCommentaire: 7,
                            nbreUnlike: 14,
                            duree: 189216020,
                            nbreResend: 5,
                            nbreLike: 12,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire2🤣?',
                        },
                        {
                            id: 3,
                            _id: 3,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            duree: 189216020,
                            nbreResend: 5,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],
                },
                {
                    id: 8,
                    _id: 8,
                    nbreCommentaire: 5,
                    nbreUnlike: 6,
                    nbreLike: 7,
                    nbreResend: 9,
                    duree: 189216020,
                    typeMedia: 'IMG',
                    image: [require('../IMG/image5.jpg')],
                    idPublication: {},
                    typePublication: '',
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    texte_message: 'bonjour pourquoi je ne sais toujours pas quoi ecrire mais je dois ecrire quelque chose;😂?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 7,
                            nbreUnlike: 14,
                            nbreResend: 6,
                            duree: 189216020,
                            nbreLike: 12,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi dois-je ecrire2🤣?',
                        },
                        {
                            id: 2,
                            _id: 1,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            nbreResend: 5,
                            duree: 189216020,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],

                },
                {
                    id: 9,
                    _id: 9,
                    nbreCommentaire: 4,
                    nbreUnlike: 12,
                    nbreLike: 3,
                    duree: 189216020,
                    nbreResend: 12,
                    typePublication: '',
                    typeMedia: 'IMG',
                    image: [require('../IMG/automneColor.jpg')],
                    idPublication: {},
                    sender: {
                        pseudo: 'Jack Doe',
                    },
                    texte_message: 'bof j\'abandonne😕?',
                    idParentPublication: {},
                    listeCommentaires: [
                        {
                            id: 1,
                            _id: 1,
                            nbreCommentaire: 4,
                            nbreUnlike: 12,
                            duree: 189216020,
                            nbreResend: 3,
                            nbreLike: 12,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'quelqu\'un doit-il ecrire2🤣?',
                        },
                        {
                            id: 2,
                            _id: 2,
                            nbreCommentaire: 5,
                            nbreUnlike: 8,
                            duree: 189216020,
                            nbreResend: 5,
                            nbreLike: 16,
                            typePublication: '',
                            sender: {
                                pseudo: 'Jack Doe',
                            },
                            texte_message: 'pourquoi je ne sais encore pas quoi ecrire3🤣?',
                        },
                    ],

                },
            ],
        };
        this.nbrePublication = 0;
        this.totalPublication = 0;
        this.nbrePage = 0;
        this.page = 0;
        this.asc = 'ascend';
        this.des = 'descend';
    }

    _onLoading() {
        if (this.state.isLoading) {
            return (
                <view>
                    <ActivityIndicator size={'large'}/>
                </view>
            );
        }
    }

    getPublication(idUser, page) {
        /*todo verifier et modifier ce code avec le backend*/

    }

    _loadPublication(mode) {
        this.setState({isLoading: true});
        if (mode === 'ascend') {
            this.getPublication(this.page).then((newData) => {
                this.page++;
                data = [...this.state.data, ...newData];
                /*todo verifier et modifier ce code avec le backend*/
                this.setState({isLoading: false});
            });
        } else if (mode === 'descend') {
            this.getPublication(this.page).then((newData) => {
                this.page++;
                data = [...newData, ...this.state.data];
                /*todo verifier et modifier ce code avec le backend*/
                this.setState({isLoading: false});
            });
        }

    }

    _updatePublication() {
        this.page = 0;
        this.nbrePage = 0;
        this.setState({
            data: [],
        }, () => {
            this._loadPublication(this.des);
        });
    }

    _seePublication = (data, item) => {
        /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
        /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
        this.props.navigation.navigate('CommentPublication', {data: data, item: item});

    };

    -seeImage = (item) => {
        this.props.navigation.navigate('ImageOnly', {type: item.typeMedia, lien: item.image});
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
            <CreateMessage></CreateMessage>
        );
    };

    render() {


        return (

            <SafeAreaView>
                {/*todo chercher a corriger le warning liee au conflit  entre scrollview et FlatList*/}
                <FlatList data={this.state.data}
                          renderItem={
                              ({item}) => (
                                  <Publication
                                      item={item}
                                      data={this.state.data}
                                      seePublication={this._seePublication}
                                      addCommentaire={this._addCommentaire}
                                      seeImage={this.seeImage}
                                      seeVideo={this.seeVideo}
                                      seeAudio={this.seeAudio}
                                      first={true}
                                  />
                              )
                          }
                          onEndReachedThreshold={2}
                          onEndReached={() => {
                              if (this.state.data.length > 0 && this.page < this.nbrePage) {
                                  this._loadPublication(this.asc);
                              }
                          }}
                          keyExtractor={item => item.id.toString()}
                >
                </FlatList>
                {/*{this._onLoading()}*/}
            </SafeAreaView>
        )
            ;
    }

}

/*const Book = liste.map((list)=>{
  <NancyComp nbreCommentaire={0} nbreUnlike={0} nbreResend={0} nbreLike={0} typePublication=""
texte_message = "bonjour pourquoi je ne sais pas quoi ecrire?" idParentPublication={ []}
listeCommentaires={[]}
listesLikes={[]}></NancyComp>
})*/
