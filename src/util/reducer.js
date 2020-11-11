export const defaultState = {
    balance:20,
    gotBalance:false,
    token:window.localStorage.getItem("token")
}

export function reducer(state=defaultState,action){
    switch(action.type){
        case "SET_BALANCE":
            return {
                ...state,
                balance:action.payload
            }
        case "SET_TOKEN":
            return {
                ...state,
                token:action.payload
            }
        case "SET_GOT_BALANCE":
            return {
                ...state,
                gotBalance:action.payload
            }
        default:
            return state
    }
}