/*import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Dimensions} from 'react-native';

import SignUp from '../pages/SignUp';
import Accueil from '../pages/Accueil';
import Email from '../pages/Email';
import NewPassword from '../pages/Newpassword';
import ConfCode from '../pages/ConfCode';
import Login from '../pages/login';
import HomePage from '../HomePage/HomePage';
import NancyBooks from '../NancyBook/NancyBook';
import SearchNavigator from '../Navigation/TabNavigationSearch';
import Community from '../pages/Communautes/Community';
import Notifications from '../pages/Notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SideMenu from '../pages/Communautes/sideMenu';
import AllCommunity from '../pages/Communautes/AllCommunity';
import CreateCommunity from '../pages/Communautes/createCommunity';
import MyCommunity from '../pages/Communautes/MyCommunity';
import Com_Discussion from '../pages/Communautes/Com_Discussion';
import MediaGroupe from '../pages/Communautes/MediaGroupe';
import infosGroupe from '../pages/Communautes/infosGroupe';
import gestionMembres from '../pages/Communautes/gestionMembres';
import ModifyInfos from '../pages/Communautes/ModifyInfos';
import AddInfosCom from '../pages/Communautes/AddInfosCom';
import SearchPage from '../SearchPage/SearchPage';



const TabNavigator = createBottomTabNavigator({

        HomePage: {
            screen: HomePage,
            navigationOptions: {
                title: 'Acceuil',
                headerShown: false,
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-home" size={25} color={tintColor}/>
                ),
            },
        },
        PlaneteNancy: {
            screen: NancyBooks,
            headerMode: 'none',
            navigationOptions: {
                headerVisible: false,
                headerShown: false,
                title: 'PlaneteNancy',
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-planet" size={25} color={tintColor}/>
                ),
            },
        },
        Recherche: {
            screen: SearchPage,
            headerShown: true,
            navigationOptions: {
                title: 'Recherche',
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-search" size={25} color={tintColor}/>
                ),
            },
        },
        Communaute: {
            screen: Community,
            navigationOptions: {
                title: 'Communautes',
                headerShown: false,
                tabBarIcon: ({tintColor}) => (
                    <Ionicons name="md-people" size={25} color={tintColor}/>
                ),
            },
        },
        Notification: {
            screen: Notifications,
            navigationOptions: {
                title: 'Notifications',
                headerShown: false,
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
            },
            style: {},
        },
    },
);


const StackNavigator = createStackNavigator(
    {
        Accueil: {
            screen: Accueil,
            navigationOptions: {
                headerShown: false,
            }
        },
        Login: {
            screen: Login,
        },
        SignUp: {
            screen: SignUp,
        },
        NewPassword: {
            screen: NewPassword,
        },
        Email: {
            screen: Email,
        },
        ConfCode: {
            screen: ConfCode,
        },
        TabNavigator: {
            screen: TabNavigator,
        },
        AllCommunity: {
            screen: AllCommunity,
        },
        createCommunity: {
            screen: CreateCommunity,
        },
        MyCommunity: {
            screen: MyCommunity,
        },
        Com_Discussion: {
            screen: Com_Discussion,
        },
        MediaGroupe: {
            screen: MediaGroupe,
        },
        infosGroupe: {
            screen: infosGroupe,
        },
        gestionMembres: {
            screen: gestionMembres,
        },
        ModifyInfos: {
            screen: ModifyInfos,
        },
        AddInfosCom: {
            screen: AddInfosCom,
        },
        Community:{
            screen:Community,
        }
    },
    {
        initialRouteParams: 'Accueil',
        headerMode: 'none',
    },
);


const MyDrawerNavigator = createDrawerNavigator(
    {
        drawer: StackNavigator,
    },
    {
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width * 3 / 5,
        drawerPosition: 'right',
    },
);

const DrawerNavigator = createAppContainer(MyDrawerNavigator);

export default DrawerNavigator;*/
