import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CommentPublication from '../commentPublication/commentPublication';
import HomePage from '../HomePage/HomePage';
import AddCommentaire from '../addCommentaire/addCommentaire';
import NancyBooks from '../NancyBook/NancyBook';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import CreateMessage from "../createMessage/CreateMessage";
import React from 'react';

const imgSize = 45;
const RootStack3 = createStackNavigator(
    {
        NancyBook: {
            screen: NancyBooks,
            navigationOptions: {
                headerTitle: 'Nancy Books',
                headerRight: () => {
                    return (<View style={styles.alignH}>
                        <Image source={require('../IMG/Jiraya.png')}
                               resizeMode={'cover'}
                               style={styles.avatar}
                        />
                        <IconButton icon={'settings'}
                                    size={30}
                        />

                    </View>);
                },
            },
        },
        CommentPublication: {
            screen: CommentPublication,
            navigationOptions: {
                headerTitle: 'Question - Reponses',
            },
        },
        CreateMessage: {
            screen: CreateMessage,
            navigationOptions: {
                headerTitle: 'Creation de Publication'
            }
        },
        AddCommentaire: {
            screen: AddCommentaire,
            navigationOptions: {
                headerTitle: 'Repondre',
            },
        },
    },
    {
        initialRouteName: 'NancyBook',
    },
);
const AppContainer3 = createAppContainer(RootStack3);

export default AppContainer3;

const styles = StyleSheet.create({
    alignH: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: imgSize,
        height: imgSize,
        borderRadius: 24,
        marginLeft: 15,
    }
});
