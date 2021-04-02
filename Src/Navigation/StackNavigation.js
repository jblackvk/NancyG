import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {AppRegistry} from 'react-native';
import SignUp from '../pages/SignUp';
import Accueil from '../pages/Accueil';
import Email from '../pages/Email';
import NewPassword from '../pages/Newpassword';
import ConfCode from '../pages/ConfCode';
import ConfEmail from '../pages/ConfEmail';
import Login from '../pages/login';
import Navigator from '../Navigation/TabNavigation';
import ImageOnly from '../Publication/ImageOnly';
import AllCommunity from '../pages/Communautes/AllCommunity';
import CreateCommunity from '../pages/Communautes/createCommunity';
import MyCommunity from '../pages/Communautes/MyCommunity';
import Com_Discussion from '../pages/Communautes/Com_Discussion';
import MediaGroupe from '../pages/Communautes/MediaGroupe';
import infosGroupe from '../pages/Communautes/infosGroupe';
import Join_Community from '../pages/Communautes/Join_Community';
import updateCom from '../pages/Communautes/updateCom';
import AddUsersCom from '../pages/Communautes/AddUsersCom';
import CreateMessage from '../createMessage/CreateMessage';
import VideoPlayer from '../VideoPlayer/videoPlayer';
import Profil from '../Profil/Profil';
import EditProfil from '../Profil/editProfil';
import ListUser from '../ListUser/ListUser';
import ModifyImage from '../Profil/modifImage';
import ProfilOthers from '../Profil/ProfilOthers';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import React from 'react';
import AudioPlayer from '../AudioManager/audioPlayer';




const RootStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: true,
            },
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                headerShown: false,
            },
        },
        Accueil: {
            screen: Accueil,
            navigationOptions: {
                headerShown: false,
            },
        },
        NewPassword: {
            screen: NewPassword,
            navigationOptions: {
                headerShown: false,
            },
        },
        Email: {
            screen: Email,
            navigationOptions: {
                headerShown: false,

            },
            params:{
                message: undefined
            },

        },
        ConfCode: {
            screen: ConfCode,
            navigationOptions: {
                headerShown: false,
            },
        },
        ConfEmail: {
            screen: ConfEmail,
            navigationOptions: {
                headerShown: false,
            },
        },
        TabNavigator: {
            screen: Navigator,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        AllCommunity: {
            screen: AllCommunity,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        createCommunity: {
            screen: CreateCommunity,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        MyCommunity: {
            screen: MyCommunity,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        Com_Discussion: {
            screen: Com_Discussion,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        MediaGroupe: {
            screen: MediaGroupe,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        infosGroupe: {
            screen: infosGroupe,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        
        CreateMessage: {
            screen: CreateMessage,
            navigationOptions: {
                headerTitle: 'Creation de Publication'
            }
        },
        ImageOnly: {
            screen: ImageOnly,
            navigationOptions: {
                headerShown: false,
            },
        },
        VideoPlayer: {
            screen: VideoPlayer,
            navigationOptions: {
                headerShown: false,
            }
        },
        AudioPlayer:{
            screen: AudioPlayer,
            navigationOptions: {
                headerShown: false,
            }

        },
        Profil: {
            screen: Profil,
            navigationOptions: {
                headerShown: true,
            }
        },
        ProfilOthers: {
            screen: ProfilOthers,
            navigationOptions:{
                headerTitle: `Son Profil`  ,
                headerShown: true,
            }
        },
        EditProfil: {
            screen: EditProfil,
            navigationOptions: {
                headerShown: false
            }
        },
        ListUser: {
            screen: ListUser,
            navigationOptions: {
                headerShown: true
            }
        },
        ModifyImage: {
            screen: ModifyImage,
            navigationOptions: {
                headerShown: false,
            }
        },
        Join_Community: {
            screen: Join_Community,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',

            },
        },
        updateCom: {
            screen: updateCom,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
        AddUsersCom: {
            screen: AddUsersCom,
            navigationOptions: {
                headerShown: false,
                headerTintColor: '#fafafa',
            },
        },
    },
    {
        initialRouteName: 'Accueil',
    },
);



const AppContainer = createAppContainer(RootStack);
export default AppContainer;
