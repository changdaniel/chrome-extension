export const defaultState = {
    gotBalance:false,
    token:window.localStorage.getItem("token"),
    user:false
}

export function reducer(state=defaultState,action){
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user:action.payload
            }
        case "SET_BALANCE":
            return {
                ...state,
                user:{
                    ...state.user,
                    balance:action.payload
                }
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