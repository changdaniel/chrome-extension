TEST = 'http://localhost:5000'
PROD = 'https://api.joincobble.com'
API_SOURCE = PROD

export const makeRequest = (endpoint, params) => {

    return fetch(`${API_SOURCE}/${endpoint}`, params)
}

export const generateAuthParam = (token) => {

    param = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'authorization': token
          }
    }

    return param

}



// export const makeDeposit = (token) => {

//     param = generateAuthParam(token)
//     makeRequest('/deposit/card', param)
//     .then(res => res.text())
//     .then(openP)
// }