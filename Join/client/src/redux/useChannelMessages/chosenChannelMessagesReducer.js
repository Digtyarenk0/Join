import * as actions from './actions'
const initState = {
    name: "wait choose channel (msg)",
    status: "wait",
    error: null,
    loader: false
}

export const chosenChannelMessagesReducer = (state = initState, action ) => {
    if (action.type === 'SET_STATUS_CHOSEN_CHANNEL_MESSAGES') {
        if (action.status === actions.actionResolved.status){
            return {
                status: action.status,
                name: action.name,
                payload: action.payload,
                loader: action.loader
            }
        }
        return {
            [action.name]: {status: action.status, payload: action.payload, error: action.error, loader: action.loader}
        }
    }
    return {...state}
}