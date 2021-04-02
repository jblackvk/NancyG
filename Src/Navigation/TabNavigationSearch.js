import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import PreviousSearch from '../SearchPage/PreviousSearch';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommunitySearch from '../SearchPage/CommunitySearch';
import ProfilSearch from '../SearchPage/ProfilSearch';
import {Colors} from 'react-native-paper';

const iconsize =30;
const searchNavigator = createMaterialTopTabNavigator({
    previousSearch: {
        screen: PreviousSearch,
        navigationOptions: {
            title: 'previous',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name="md-search" size={iconsize} color={tintColor}/>
            ),
        },
    },
    communitySearch:{
        screen: CommunitySearch,
        navigationOptions: {
            title: 'community',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name="md-people" size={iconsize}  color={tintColor}/>
            ),
        },
    },
    profilSearch:{
        screen: ProfilSearch,
        navigationOptions: {
            title: 'profile',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name="md-contact" size={iconsize} color={tintColor}/>
            ),
        }
    }

}, {
    tabBarOptions: {
        activeTintColor: Colors.yellow700,
        inactiveTintColor: Colors.grey700,
        showIcon: true,
        showLabel: false,
        iconStyle: {

        },
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: '#fafafa',
            height: 50,
            padding: -5
        },
    }
});

const SearchNavigator =  createAppContainer(searchNavigator);

export default SearchNavigator;
