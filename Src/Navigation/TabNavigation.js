import {createAppContainer} from 'react-navigation';
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomePage from '../HomePage/HomePage';
import NancyBooks from '../NancyBook/NancyBook';
import SearchPage from '../SearchPage/SearchPage';
import Community from '../pages/Communautes/Community';
import Notifications from '../pages/Notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppContainer2 from '../Navigation/StackNavigation2';
import AppContainer3 from '../Navigation/StackNavigation3';
import {Keyboard} from 'react-native';

const TabNavigator = createBottomTabNavigator(
    {

        HomePage: {
            screen: AppContainer2,
            navigationOptions: {
                title: 'Acceuil',
                headerStyle: {
                  backgroundColor : '#FFD700',
                    color: '#FFD700',
                },
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-home" size={25} color={tintColor}/>
                ),
            },
        },
        PlaneteNancy: {
            screen: AppContainer3,
            navigationOptions: {
                title: 'PlaneteNancy',
                headerStyle: {
                    backgroundColor : '#FFD700'
                },
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-planet" size={25} color={tintColor}/>
                ),
            },
        },
        Recherche: {
            screen: SearchPage,
            navigationOptions: {
                title: 'Recherche',
                headerStyle: {
                    backgroundColor : '#FFD700'
                },
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-search" size={25} color={tintColor}/>
                ),
            },
        },
        Communaute: {
            screen: Community,
            navigationOptions: {
                title: 'Communautes',
                headerStyle: {
                    backgroundColor : '#FFD700'
                },
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-people" size={25} color={tintColor}/>
                ),
            },
        },
        Notification: {
            screen: Notifications,
            navigationOptions: {
                title: 'Notifications',
                headerStyle: {
                    backgroundColor : '#FFD700'
                },
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-notifications" size={25} color={tintColor}/>
                ),
            },

        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#FFDB58',
            showIcon: true,
            showLabel: false,
            labelStyle: {
                fontSize: 12,
                backgroundColor: '#FFD700'
            },
            style: {
                backgroundColor: '#fafafa',
            },

        },

    },
);

const Navigator = createAppContainer(TabNavigator);

export default Navigator;
