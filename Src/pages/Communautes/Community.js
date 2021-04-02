import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    StatusBar,
    Text,
    Alert,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import groupes from './data_groupe';
import Com_community from './Components/Com_Community';
import HeaderCommunity from '../../Header/HeaderCommunity';
import {connect} from 'react-redux';
import {
    getMyCommunities,
} from '../../../redux/actions/community.actions';

import {
    Header,
    Icon,
    Item,
    Input,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';


class Community extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loadingdata: [],
            data: [],
            fulldata: [],
            loading: false,
            query: '',
            show: false,
            page: 1,
        };
    }


    onSuccess = (data) => {
        console.log('page', this.state.page);
        this.setState({
            loading: !this.state.loading,
            page: this.state.page + 1,
        });

    };

    onFailled = (data) => {
        this.setState({loading: !this.state.loading});
    };
    notifMessage = (data, error) => {
        if (data) {
            return;
        }
        if (error) {
            return 'Erreur lors du chargement des communautés';
        }
    };

    onGetMyCommunity = () => {
        this.setState({
            loading: !this.state.loading,
        });

        this.props.GetMyCommunities(
            {page: this.state.page},
            this.onSuccess,
            this.onFailled,
            this.notifMessage,
        );
    };

    componentDidMount = () => {
        this.onGetMyCommunity();
    };

    onEndReached = () => {
        if (this.props.my_communities.length != 0) {
            this.onGetMyCommunity();
        } else {
            this.setState({page: 1});
        }
    };

    isEmpty = () => {
        if (this.props.my_communities.length != 0) {
            return <Text>Fin de la liste</Text>;
        }
    };


    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.my_communities.length) {
            this.setState({
                data: this.state.data.concat(nextProps.my_communities), //plus de parse data car donnée déjà parsé par un des composant redux
                fulldata: this.state.fulldata.concat(nextProps.my_communities), //plus de parse data car donnée déjà parsé par un des composant redux
            });
        }
    }

    searchFilterFunction = text => {
        if (text == '') {
            this.setState({data: this.state.fulldata, value: ''});
            return;
        }
        this.setState({
            value: text,
        });

        const newData = this.state.fulldata.filter(item => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > 0 || itemData.startsWith(textData);
        });
        this.setState({
            data: newData,
        });
    };


    _renderdata = () => {
        if (this.state.data.length !== 0) {
            return (
                <>
                    <FlatList
                        data={//groupes
                            this.state.data
                        }
                        onEndReachedThreshold={0.001}
                        onEndReached={() => {
                            this.onEndReached();
                        }}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({item}) => (
                            <Com_community
                                groupe={item}
                                groupes={this.props.my_communities}
                                navigation={this.props.navigation}
                            />
                        )
                        }
                    />

                </>
            );
        } else {
            if (!this.state.loading) {
                return (
                    <Text style={{textAlign: 'center', marginTop: 20}}>Veillez créer une communauté</Text>
                );
            }

        }
    };

    render() {

        return (

            <View style={{flex: 1}}>
                <HeaderCommunity navigation={this.props.navigation} groupes={this.state.fulldata}/>
                <Header searchBar rounded iosBarStyle={'dark-content'} style={{backgroundColor: '#FFD700'}}>
                    <StatusBar backgroundColor="#FFDB58"
                               barStyle="light-content"/>
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Rechercher"
                               onChangeText={text => this.searchFilterFunction(text)}
                               autoCorrect={false}
                               value={this.state.value}/>
                        <Icon name="ios-people"/>
                    </Item>
                </Header>
                <View style={styles.main_container} onPress={() => {
                }}>
                    {this._renderdata()}


                    {this.state.loading ? (
                        <TouchableOpacity style={styles.ButtonActivity}>
                            <ActivityIndicator style={{marginTop: 5}} color="red" size="large"/>
                        </TouchableOpacity>

                    ) : (
                        <Text></Text>
                    )}
                </View>
            </View>

        );
    }
}

const mapStateToprops = state => {
    return {
        my_communities: state.communityReducer.my_communities, // access à toute les communautés.. my_communites , created_communities pour les autres
    };
};

const mapDispatchToProps = dispatch => {
    return {
        GetMyCommunities: (
            args = {},
            onSuccess = (data) => {
            },
            onFailled = (data) => {
            },
            notifMessage = (data, error) => {
            },
        ) => {
            return dispatch(
                getMyCommunities(args, {
                    onSuccess,
                    onFailled,
                    notifMessage,
                }),
            );
        },
    };
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    ButtonActivity: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 50,
        height: 50,
        marginLeft: Dimensions.get('screen').width / 2 - 25,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 24,
    },
});
export default connect(mapStateToprops, mapDispatchToProps)(Community);
