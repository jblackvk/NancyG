import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Card, Title, Paragraph, Button, IconButton, Colors} from 'react-native-paper';
import {Badge} from 'react-native-elements';
import {likePublication} from '../../redux/actions/publication.actions';
import {connect} from 'react-redux';

 class IconPublicationBar extends React.Component {
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
            id: props.id,

        };

    }

    unlike = Colors.redA100;
    like = Colors.redA100;
    send = Colors.greenA100;
    color = Colors.grey400;

    formatLike(like) {
        if (like < 1000) {
            return like;
        }else if (like === 1000) {
            return '1K';
        }
        else if (like === 1000000) {
            return '1M';
        } else if (like === 1000000000) {
            return '1M+';
        }
        else if (1000 <= like && like < 999899) {
            let k = (like / 1000).toFixed(1);
            return k + 'K';
        } else if (999899 <= like && like < 999899999) {
            let m = (like / 1000000).toFixed(1);
            return m + 'M';
        } else if (999899999 <= like) {
            let m = (like / 1000000000).toFixed(1);
            return m + 'M+';
        }
    }


    onSuccess = data => {
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
    }
    render() {
        return (
            <View style={styles.bottom}>

                <View style={styles.blockIcon}>
                    <IconButton icon="share-variant" style={styles.iconButton}
                                color={this.state.checked3} size={this.state.iconSize}
                                onPress={() => {
                                    this.setState({
                                        nbreResend: this.state.nbreResend + 1,
                                        likee3: true,
                                    });
                                    if (this.state.likee3) {
                                        this.setState({
                                            nbreResend: this.state.nbreResend - 1,
                                            likee3: false,
                                        });
                                    } else {

                                    }
                                }}
                    />
                    <Text style={styles.text}>{this.formatLike(this.state.nbreResend)}</Text>
                </View>

                <View style={styles.blockIcon}>

                    <IconButton icon="chat" style={styles.iconButton}
                                color={this.state.checked2} size={this.state.iconSize}
                                onPress={() => {
                                    // this.state.addComment(this.state.item);
                                    this.props.navigation.navigate('AddCommentaire', {idParent: this.state.id})
                                    this.setState({
                                        nbreCommentaire: this.state.nbreCommentaire + 1,
                                        likee2: true,
                                    });
                                }}
                    />
                    <Text style={styles.text}>{this.formatLike(this.state.nbreCommentaire)}</Text>
                </View>

                <View style={styles.blockIcon}>
                    <IconButton icon={this.state.iconLike} style={styles.iconButton} color={this.state.checked}
                                size={this.state.iconSize}
                                onPress={() => {
                                    this.props.LikePublication(this.onSuccess , (err)=>{console.log(err)} , this.state.id , this.state.likee)
                                }}
                    />
                    <Text style={styles.text}>{this.formatLike(this.state.nbreLike)}</Text>
                </View>

                <View style={styles.blockIcon}>
                    <IconButton icon="book" style={styles.bookButton}
                                color={this.state.checked2} size={this.state.iconSize}
                                onPress={() => {

                                }}
                    />
                </View>

                {/* TODO mettre un champ pour afficher les images */}


            </View>
        );
    }
}

const styles = StyleSheet.create({

    iconButton: {},
    bookButton: {},

    blockIcon: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
    },

    bottom: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginLeft: -10,
        maxWidth: 280,
        display: 'flex',
        flexDirection: 'row',
    },
    publication: {},
    text: {
        fontSize: 12,
    },

});

const mapDispatchToProps = dispacth => {
    return {
        LikePublication: (onSuccess , onFailled , publicationId , like) => {
            return dispacth(
                likePublication(
                    undefined,
                    like,
                    publicationId,
                    {
                        onSuccess: onSuccess,
                        onFailled : onFailled,
                    }
                ),
            )
        }
    }


}

export default connect( null,
    mapDispatchToProps
)(IconPublicationBar);
