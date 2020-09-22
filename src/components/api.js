const TEST = 'http://localhost:5000'
const PROD = 'https://api.joincobble.com'
const API_SOURCE = PROD

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
