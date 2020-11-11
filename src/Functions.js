import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";


 
// var token = "eyJ0eXAiO.../// jwt token";
// var decoded = jwt_decode(token);


const baseURL = "http://localhost:8000/";
const loginURL = baseURL + "api/login/";
const openScrapURL = baseURL +"api/open_scrap/"
const closedScrapURL = baseURL +"api/closed_scrap/"
const graphURL = baseURL +"api/graph_data/"
const getTokenURL = baseURL +"api/get_token/"
const logoutURL = baseURL + "api/logout/"
const prodURL = baseURL + "api/get_products/"
const failURL = baseURL + "api/get_failures/"
const createScrapURL = baseURL + "api/create_scrap/"
const checkTokenURL = baseURL + "api/check_token/"
const checkRefURL = baseURL + "api/check_refresh_token/"




export default {loginURL, baseURL};



/*        const response = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: messageValue,
                user_name: usernameValue
            })
        });

        
        const body = await response.json()

        return body */


async function login(userName, password){
        console.log('logging in')
        console.log(`our passed username is ${userName}`);
        console.log('starting fetch')
        
        const response = await fetch(loginURL, {
            method: 'POST',
            body: JSON.stringify({
                username: userName,
                password: password
            })
        });


        const body = await response.json()
        
        console.log(body)
        console.log(body['error'])

        const token = body['token'];
        const refreshToken = body['refresh_token'];
        const refID = body['ref_id'];

        window.localStorage.setItem('token', token)
        window.localStorage.setItem('refresh_token', refreshToken)
        window.localStorage.setItem('ref_id', refID)
        window.localStorage.setItem('username', userName)

}

async function logout(){
    const userName = localStorage.getItem('username');

    console.log(`our passed username is ${userName}`);
    console.log('starting fetch')
    localStorage.removeItem('token')
    window.localStorage.removeItem('refresh_token')
    window.localStorage.removeItem('ref_id')
    window.localStorage.removeItem('username')

    
    const response = await fetch(logoutURL, {
        method: 'POST',
        body: JSON.stringify({
            username: userName,

            
        })
    });


    const body = await response.json()
    
    console.log(body['logged out'])
    console.log('removing all local memory items')


    return('logged out')

}
    
    


async function isRefreshValid() {
        const refreshToken = localStorage.getItem('refresh_token');
        const refID = localStorage.getItem('ref_id')

        const response = await fetch(checkRefURL, {
            method: 'POST',
            body: JSON.stringify({
                refresh_token: refreshToken,
                id: refID,
            })
        });

        const data = await response.json()
        const token = data['token']

        if (token.length > 0){
            console.log(` true our recieved validation was: ${token}`)
    
            return true

        }else{
            console.log(`our recieved validation was: ${token}`)
    
            return false
    
        }

}
      
async function isTokenValid() {

    const response = await fetch(checkTokenURL, {
        method: 'POST',  
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json()

    if (data['token'] == 'is valid'){
        return true
    }else{
        localStorage.removeItem('token')
        return false

    }



} 

async function getNewToken() {


        const refreshToken = localStorage.getItem('refresh_token');
        const refreshTokenID = localStorage.getItem('ref_id');


        const response = await fetch(getTokenURL, {
            method: 'POST',
            body: JSON.stringify({
                refreshToken: refreshToken,
                refreshTokenID: refreshTokenID
            })
        });


        const body = await response.json()
        
        console.log(body)
        
        if (body['error'] != null){
            console.log(body['error'])
            
        }

        const token = body['token'];

        window.localStorage.setItem('token', token)

}

async function getOpenScrap(page){

        var valid = isTokenValid();
        if(valid === false){
            await isRefreshValid();
            await getNewToken();
        }

        const response = await fetch(openScrapURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        
        const body = await response.json()

        return body 
}

async function getClosedScrap(page){

    var valid = isTokenValid();
    if(valid === false){
        await getNewToken();
    }

    const response = await fetch(closedScrapURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    const body = await response.json()

    return body 
}

async function getProd(){

    var valid = await isTokenValid();
    console.log(`our valid response was ${valid}`)
    if(valid === false){
        await getNewToken();
        //TODO add a try/catch that forces you to log out.

    }

    const response = await fetch(prodURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    const data = await response.json()

    console.log(data)




    const lenData = Object.keys(data).length;
    let prodID = [];
    let prodDesc = [];
    let unitCost = [];
    let unit = [];
    let id = [];

    for(var i=0; i<lenData; i++){
    
        prodID.push(data[i][0]);
        prodDesc.push(data[i][1]);
        unitCost.push(data[i][2]);
        unit.push(data[i][3]);
        id.push(data[i][4]);

    }

    console.log(`Our list of prds is ${prodID}`)
    console.log(prodID[0])


    return {prodID, prodDesc, unitCost, unit, id};
}

async function get_failures(id){

    const url = failURL + `?id=${id}`;


    var valid = await isTokenValid();
    console.log(`our valid response was ${valid}`)
    if(valid === false){
        await isRefreshValid()
        await getNewToken();
        //TODO add a try/catch that forces you to log out.

    }


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
        
    });

    
    const data = await response.json()

    console.log(data)




    const lenData = Object.keys(data).length;
    let failures = [];
    

    for(var i=0; i<lenData; i++){
    
        failures.push(data[i][0]);

    }

    console.log(`Our list of failures is ${failures}`)
   


    return failures;


}

async function submitScrap(user, cost, units, prodID, failure){
    
    var valid = await isTokenValid();
    if(valid === false){
    
        await getNewToken();
        //TODO add a try/catch that forces you to log out.
        //Also we need to check if our refresh token is valid.

        
    }

    const response = await fetch(createScrapURL, {
        method: 'POST',  
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            cost: cost,
            units: units,
            prodID: prodID,
            failure: failure,
        })
    });

    const data = await response.json()

    if(data['scrap'] == 'scrap created'){
        console.log('yay, scrap created')
        return true
    }else{
        return false
    }



}




export{ submitScrap, get_failures, getProd, login, logout, isRefreshValid, getNewToken, isTokenValid }
