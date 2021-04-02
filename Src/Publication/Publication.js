import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback, TouchableOpacity,
} from 'react-native';
import Media from './media';
import IconPublicationBar from '../Publication/IconPublicationBar';
import {Colors} from 'react-native-paper';
import CommentPublication from '../commentPublication/commentPublication';
import Message from '../commentPublication/message';
import {getUserFollowers, } from '../../redux/actions/user.action';
import moment from 'moment';
import connect from 'react-redux/lib/connect/connect';

class Publication extends React.Component {
    constructor(props) {
        super(props);
        const fichiers = props.item.fichiers;
        this.state = {
            image: props.item.sender && props.item.sender.profilUrl!== "" ? props.item.sender.profilUrl : require('../IMG/person_120px.png'),
            reponse: false,
            media: fichiers,
            typeMedia: fichiers.length === 0 ? null : fichiers[0].mediaType,
            imageState: fichiers === [] ? 'none' : 'flex',
            nbreCommentaire: props.item.nbreCommentaire,
            nbreResend: props.item.nbreResend,
            nbreLike: props.item.nbreLike,
            typePublication: props.item.typePublication,
            texte_message: props.item.contenu,
            idParentPublication: props.item.idParentPublication,
            listeCommentaires: props.item.listeCommentaires,
            listesLikes: props.item.listeLikes,
            idPublication: props.item._id,
            duree: moment(new Date(Date.now())).diff(moment(props.item.createdAt)),
            data: props.data,
            item: props.item,
            first: props.first,
            sender: props.item.sender,
        };
    }

    iconSize = 22;
    color = Colors.grey400;

/*
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
*/

    _seeImage = item => {
        this.props.navigation.navigate('ImageOnly', {
            type: item == null ? '' : item.mediaType,
            lien: item.mediaUrl,
        });
    };

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

    _seePublication = (data, item) => {
        /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
        /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
        this.props.navigation.navigate('CommentPublication', {
            data: data,
            item: item,
            seePublication: this._seePublication,
        });
    };
    _addCommentaire = item => {
        /*todo creer une navigation vers la vue qui affiche une publication et ses publications enfants (reponses */
        /*todo faire attention aux props et binding quand on va remplir de code vid 3c7*/
        this.props.navigation.navigate('AddCommentaire', {item: item});
    };

    render() {
        const addComment = this._addCommentaire;
        const seePublication = this._seePublication;
        return (
            <TouchableHighlight
                onPress={() => {
                    seePublication(this.state.data, this.state.item);
                }}
                style={{alignContent: 'center'}}>
                <View >
                    <View style={styles.container}>
                        <View style={styles.avatarBox}>
                            <TouchableOpacity onPress={
                                () => {

                                    let abonnes = this.props.GetUserFollower(this.state.sender._id);
                                    const user = {
                                        nom: this.state.sender.prenom +' ' + this.state.sender.nom,
                                        profilUrl: this.state.sender.profilUrl,
                                        id: this.state.sender._id,
                                        pseudo: this.state.sender.pseudo,
                                        nombreAbonne: this.state.sender.nbreAbonnes,
                                        nombreAbonnement: this.state.sender.nbreAbonnemments,
                                        email: this.state.sender.mail,
                                        listeAbonnes: abonnes,

                                    };
                                    this.props.navigation.navigate('ProfilOthers', {user: user});
                                }
                            }>
                                <Image source={this.state.image} style={styles.avatar}/>
                            </TouchableOpacity>

                            <View style={styles.barreRep}
                                  display={this.state.nbreCommentaire >= 1 && !(['IMG', 'AUD', 'VID'].includes(this.state.typeMedia))  ? 'flex' : 'none'}
                            />
                            <View style={styles.barreRep}
                                  display={this.props.comment? 'flex' :'none'}
                            />

                            <View
                                style={styles.barreRepImg}
                                display={this.state.typeMedia === 'IMG'  && this.state.listeCommentaires.length >= 1 ? 'flex' : 'none'}
                            />
                            <View
                                style={styles.barreRepAud}
                                display={this.state.typeMedia === 'AUD' &&  this.state.listeCommentaires.length !== 0 ? 'flex' : 'none'}
                            />
                            <View
                                style={styles.barreRepVid}
                                display={this.state.typeMedia === 'VID'  && this.state.listeCommentaires.length !== 0 ? 'flex' : 'none'}
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
                                            {this.state.texte_message}
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
                                <View
                                    style={{position: 'relative', justifyContent: 'flex-end', marginTop: 5}}>
                                    <IconPublicationBar
                                        nbreCommentaire={this.state.nbreCommentaire}
                                        nbreResend={this.state.nbreResend}
                                        nbreLike={this.state.nbreLike}
                                        nbreUnlike={this.state.nbreUnlike}
                                        iconSize={this.iconSize}
                                        addCommentaire={addComment}
                                        navigation={this.props.navigation}
                                        id={this.state.idPublication}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.state.item.listeCommentaires.length !== 0 && (
                        <View display={this.state.first === true ? 'flex' : 'none'} style={{
                            backgroundColor: '#fafafa'
                        }}>
                            <Message
                                nbreCommentaire={
                                    this.state.item.listeCommentaires[0].nbreCommentaire
                                }
                                nbreUnlike={this.state.item.listeCommentaires[0].nbreLike}
                                nbreResend={this.state.item.listeCommentaires[0].nbreResend}
                                nbreLike={this.state.item.listeCommentaires[0].nbreLike}
                                navigation={this.props.navigation}
                                item={this.state.item.listeCommentaires[0]}
                                data={this.state.data}
                                sender={
                                    this.state.item.listeCommentaires[0].sender
                                }
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
                                addComment={addComment}
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
        flexDirection: 'column',
        alignItems: 'center',
    },
    barreRep: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        flex: 1,

    },
    barreRepImg: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        flex: 1,
    },
    barreRepAud: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        flex : 1,
    },
    barreRepVid: {
        borderColor: Colors.grey500,
        borderWidth: 1,
        marginBottom: 0,
        flex: 1,
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
        resizeMode: 'cover',
        paddingBottom: 10,
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
        maxWidth: 260,
        borderWidth: 1,
        borderRadius: 10,
    },
});


const mapDispatchToProps = dispatch => {
    return {
        GetUserFollower: (idUser, onSuccess, onFailed, notifMessage) => {
            return dispatch(
                getUserFollowers(
                    idUser,
                    {
                        onSuccess: onSuccess,
                        onFailled: onFailed,
                        notifMessage: notifMessage,
                    }
                )
            )
        }
    }
}

export default connect( null, mapDispatchToProps) (Publication);
