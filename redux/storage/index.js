var production = true;
//var AsyncStorage = {};
import {AsyncStorage} from 'react-native';
// import SyncStorage from 'sync-storage';

export const saveItem = (item , key = "token")=>{
    if(production){
       AsyncStorage.setItem(key , item);
       //SyncStorage.set(key , item);
    }
    else{
        localStorage.setItem(key , item);
    }

    console.log("item set" , SyncStorage.get(key));
}

export const getItem = async(key = "token")=>{
    if(production){
        return await AsyncStorage.getItem(key);

        //return SyncStorage.get(key);
    }
    else{
        return localStorage.getItem(key);
    }
}

export const removeItem = async(key = "token")=>{
    if(production){
        await AsyncStorage.removeItem(key);
        //SyncStorage.remove(key);
    }
    else {
        localStorage.removeItem(key);
    }
}
