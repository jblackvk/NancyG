//export var baseUrl = "http://192.168.8.123:3000";
//export var baseUrl = "http://192.168.43.45:3000";
export var baseUrl = "https://nancyapi.herokuapp.com"
//export var baseUrl ="https://jsonplaceholder.typicode.com"


var token = "";
export const setToken = (token)=>{
    token = token;
}

export const getToken = ()=>{
    return token;
}

export var headersCreator = (multipart = false)=> {
    if(!multipart){
        return {"Content-Type": "application/json"};
    }
    if(multipart){
        return {"Content-Type": "multipart/form-data"};
    }
}

