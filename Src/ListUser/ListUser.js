import React from 'react';
import {FlatList, View} from 'react-native';
import UserComponent from './userComponent';


export default class ListUser extends React.Component {

    constructor(props) {
        super(props);
        /*const user1 = {
            image: require('../IMG/person_120px.png'),
            nom: 'Jack Reacher',
            pseudo: 'the Black Mamba',
            abonne: false
        }
        const user2 = {
            image: require('../IMG/person_120px.png'),
            nom: 'John Rush',
            pseudo: 'rushCore',
            abonne: true
        }
        this.state = {
            listOfUser: [user1, user1,user2,user1,user2,user2,user1, user1,user2,user1,user2,user2],
        };*/

        this.state = {
            listOfUser: props.navigation.state.params.list,
        };
    }

    render() {
        return (
            <View>
                <FlatList data={this.state.listOfUser}
                          renderItem={
                              ({item}) => (
                                  <UserComponent data={item}/>
                              )
                          }
                          keyExtractor={(item,index ) => {
                              index
                          }}
                />
            </View>
        );
    }
}
