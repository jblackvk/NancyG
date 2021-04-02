import React from 'react';
import {View, SafeAreaView, ScrollView, Modal,Text,Button} from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Title, List, ListItem} from 'native-base';


export default class ModalCom extends React.Component{

    constructor(){
        super();
        this.state={
            show:false
        }
    }
    render(){
        return(
           <View style={{flex:1,margin:100}}>
               <Text style={{fontSize: 80}}>normal Screen text</Text>
               <Button title='lol' onPress={()=>{this.setState({show:true})}}>show modal</Button>
               <Modal transparent={true}
                      visible={this.state.show}>
                   <View style={{backgroundColor:"#000000aa", flex:1}}>
                       <View style={{backgroundColor:'#ffffff', margin:50,padding:40, borderRadius:10}}>
                       <List>
                        <ListItem onPress={()=> this.props.navigation.navigate('CreateCommunity')}>
                            <Text>Créer une communauté</Text>
                        </ListItem>
                        <ListItem onPress={()=> this.props.navigation.navigate('AllCommunity')}>
                            <Text>Toute les communautés</Text>
                        </ListItem>
                        <ListItem onPress={()=> this.props.navigation.navigate('MyCommunity')}>
                            <Text>Mes communautés</Text>
                        </ListItem>
                    </List>
                            <Button title='Button' onPress={()=>{this.setState({show:false})}}/>
                       </View>
                   </View>
                  
               </Modal>
               
           </View>
        )
    }
}
