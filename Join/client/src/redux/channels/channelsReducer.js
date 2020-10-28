import * as actions from './actions'
const initState = {
    name: "wait fetch channels",
    status: "wait",
    error: null,
    loader: false
}

export const channelsReducer = (state = initState, action ) => {
    if (action.type === 'SET_STATUS_CHANNELS') {
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