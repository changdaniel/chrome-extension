export const initialState = {
    gotBalance:false,
    token:window.localStorage.getItem("token"),
    user:false
}


export function reducer(oldState,action,...args){
    let state = {...oldState}

    let actions = {}

    if(action === String(action))
        return actions[action](...args)
    else
        return action(state)
}