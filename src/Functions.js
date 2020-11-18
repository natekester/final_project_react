
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
const closeScrapURL = baseURL + "api/close_scrap/"
const openGraphURL =baseURL +"api/open_graph_data/"
const closedGraphURL = baseURL+"api/closed_graph_data/"




//TODO - make sure each function throws an error if we can't validate and recieve a token- so we can push a new login.

async function login(userName, password){
        
        const response = await fetch(loginURL, {
            method: 'POST',
            body: JSON.stringify({
                username: userName,
                password: password
            })
        });


        const body = await response.json()

        const token = body['token'];
        const refreshToken = body['refresh_token'];
        const refID = body['ref_id'];
        
        if( body['error'] == "creditials incorrect")
        {
            return false

        }else{

            //TODO: change to cache for better security.

            window.localStorage.setItem('token', token)
            window.localStorage.setItem('refresh_token', refreshToken)
            window.localStorage.setItem('ref_id', refID)
            window.localStorage.setItem('username', userName)

            return true

        }

}

async function logout(){
    const userName = localStorage.getItem('username');

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

        if (response.status === 403){
            window.localStorage.removeItem('refresh_token');
            window.localStorage.removeItem('ref_id');
            return false
        }

        const data = await response.json()
        const token = data['token']

        if (token.length > 0){
    
            return true

        }else{
    
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
        
        
        if (body['error'] != null){
            
        }

        const token = body['token'];

        window.localStorage.setItem('token', token)

}

async function getOpenScrap(page){

    const openURL = openScrapURL + `?page=${page}`

    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }

    const response = await fetch(openURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    const data = await response.json()

    page = data[0][2];
    const hasNext = data[0][0];
    const hasPrev = data[0][1];
    const numItem = data[0][3];
    let prodID = [];
    let desc = [];
    let failure = [];
    let isOpen = [];
    let lotID = [];
    let user = [];
    let time = [];
    let units = [];
    let index = [];
    let cost = [];
    let scrapPK= [];
    const lenData = Object.keys(data).length;

    //data[0] = [page.has_next(), page.has_previous(), curr_page]

//db return view: data[f'{position}'] = [item.prod_id.prod_id, item.prod_id.description, item.failure.failure_mode, item.is_open, item.lot_id, item. item.user.username, item.total_cost, item.time.strftime("%m/%d/%Y, %H:%M:%S"), item.units_scrapped]


    for(var i=1; i<lenData; i++){

        prodID.push(data[`${i}`][0])
        desc.push(data[`${i}`][1])
        failure.push(data[`${i}`][2])
        isOpen.push(data[`${i}`][3])
        lotID.push(data[`${i}`][4])
        user.push(data[`${i}`][5])
        cost.push(data[`${i}`][6])
        time.push(data[`${i}`][7])
        units.push(data[`${i}`][8])
        index.push(data[`${i}`][10])
        scrapPK.push(data[`${i}`][9])


    }


    return {page, hasNext, hasPrev, numItem, prodID, desc, failure, isOpen, lotID, user, cost, time, units, index, scrapPK}
}

async function getClosedScrap(page){
    const closedURL = closedScrapURL + `?page=${page}`

    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }

    const response = await fetch(closedURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    const data = await response.json()

    page = data[0][2];
    const hasNext = data[0][0];
    const hasPrev = data[0][1];
    const numItem = data[0][3];
    let prodID = [];
    let desc = [];
    let failure = [];
    let isOpen = [];
    let lotID = [];
    let user = [];
    let time = [];
    let units = [];
    let index = [];
    let cost = [];
    let scrapPK = [];
    const lenData = Object.keys(data).length;

    //data[0] = [page.has_next(), page.has_previous(), curr_page]

//db return view: data[f'{position}'] = [item.prod_id.prod_id, item.prod_id.description, item.failure.failure_mode, item.is_open, item.lot_id, item. item.user.username, item.total_cost, item.time.strftime("%m/%d/%Y, %H:%M:%S"), item.units_scrapped]


    for(var i=1; i<lenData; i++){

        prodID.push(data[`${i}`][0])
        desc.push(data[`${i}`][1])
        failure.push(data[`${i}`][2])
        isOpen.push(data[`${i}`][3])
        lotID.push(data[`${i}`][4])
        user.push(data[`${i}`][5])
        cost.push(data[`${i}`][6])
        time.push(data[`${i}`][7])
        units.push(data[`${i}`][8])
        index.push(data[`${i}`][10])
        scrapPK.push(data[`${i}`][9])



    }


    return {page, hasNext, hasPrev, numItem, prodID, desc, failure, isOpen, lotID, user, cost, time, units, index, scrapPK}
}

async function getGraphScrap(){

    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }

    const response = await fetch(graphURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    var data = await response.json();
    var products = data[1];
    var labels = data[2];
    data = data[0];

    const prod1 = data[0];
    const prod2 = data[1];
    const prod3 = data[2];
    const prod1Desc = products[0];
    const prod2Desc = products[1];
    const prod3Desc = products[2];
    console.log(`our prod data is: ${prod1}| ${prod2} | ${prod3}`)
    console.log(`our prod desc is: ${prod1Desc}| ${prod2Desc} | ${prod3Desc}`)
    console.log(`our lables are: ${labels}`)



    return {prod1, prod2, prod3, prod1Desc,prod2Desc,prod3Desc, labels}

}


async function getOpenGraphScrap(){

    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }

    const response = await fetch(openGraphURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    var data = await response.json();
    var products = data[1];
    var labels = data[2];
    data = data[0];

    const prod1 = data[0];
    const prod2 = data[1];
    const prod3 = data[2];
    const prod1Desc = products[0];
    const prod2Desc = products[1];
    const prod3Desc = products[2];
    console.log(`our prod data is: ${prod1}| ${prod2} | ${prod3}`)
    console.log(`our prod desc is: ${prod1Desc}| ${prod2Desc} | ${prod3Desc}`)
    console.log(`our lables are: ${labels}`)



    return {prod1, prod2, prod3, prod1Desc,prod2Desc,prod3Desc, labels}

}


async function getClosedGraphScrap(){

    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }

    const response = await fetch(closedGraphURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    var data = await response.json();
    var products = data[1];
    var labels = data[2];
    data = data[0];

    const prod1 = data[0];
    const prod2 = data[1];
    const prod3 = data[2];
    const prod1Desc = products[0];
    const prod2Desc = products[1];
    const prod3Desc = products[2];
    console.log(`our prod data is: ${prod1}| ${prod2} | ${prod3}`)
    console.log(`our prod desc is: ${prod1Desc}| ${prod2Desc} | ${prod3Desc}`)
    console.log(`our lables are: ${labels}`)



    return {prod1, prod2, prod3, prod1Desc,prod2Desc,prod3Desc, labels}

}


async function getProd(){



    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }

    const response = await fetch(prodURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    });

    
    const data = await response.json()





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



    return {prodID, prodDesc, unitCost, unit, id};
}

async function getFailures(id){

    const url = failURL + `?id=${id}`;


    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
        
    });

    
    const data = await response.json()





    const lenData = Object.keys(data).length;
    let failures = [];
    

    for(var i=0; i<lenData; i++){
    
        failures.push(data[i][0]);

    }

   


    return failures;


}

async function submitScrap(lotID, user, cost, units, prodID, failure){
    

    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
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
            lotID: lotID
        })
    });

    const data = await response.json()

    if(data['scrap'] == 'scrap created'){
        return true
    }else{
        return false
    }
}



async function closeScrap(scrapID, comment){
    

    var valid = await isTokenValid();
    if(valid === false){
        const ref = await isRefreshValid()

        if(ref == true){
            await getNewToken();
        }
        else{
            throw "need to sign back in"
        }
    }

    const response = await fetch(closeScrapURL, {
        method: 'POST',  
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            scrapID: scrapID,
            comment: comment,
        })
    });

    const data = await response.json()

    if(data['scrap'] == 'scrap closed'){
        return true
    }else{
        return false
    }
}



export {getClosedGraphScrap, getOpenGraphScrap,closeScrap, getGraphScrap, submitScrap, getFailures, getProd, login, logout, isRefreshValid, getNewToken, isTokenValid, getOpenScrap, getClosedScrap }
