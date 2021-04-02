import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CommentPublication from '../commentPublication/commentPublication';
import HomePage from '../HomePage/HomePage';
import AddCommentaire from '../addCommentaire/addCommentaire';
import {Colors, IconButton, Button} from 'react-native-paper';
import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import ImageOnly from '../Publication/ImageOnly';
import CreateMessage from '../createMessage/CreateMessage';

const imgSize = 45;

const navigateToProfile = (props) => {
    console.log(props.navigation)
    props.navigation.navigate('Profil');
}

const RootStack2 = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                headerTitle: 'Planete Nancy',
                headerTitleAlign: 'left',
                headerShown: false
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
                headerTitle: 'Comment une publication',
                headerStyle: {
                    backgroundColor: '#FFD700',
                },
/*
                headerRight: () => {
                    return (
                        <View >
                            <Button  mode={'contained'}
                                     onPress={() => {}}
                                     color = {'#FFDB58'}
                                     style = {styles.poster}
                            >Poster </Button>
                        </View>
                    );
                },
*/
            },
        },
    },
    {
        initialRouteName: 'HomePage',

    },
);
const AppContainer2 = createAppContainer(RootStack2);

export default AppContainer2;

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
    },
    poster: {
        borderRadius: 25,
        borderColor: Colors.black,
        marginRight: 10,

    },
});
