import * as actions from './actions'

export const addingReducer = (state, action ) => {
    if (action.type === 'ADDING') {
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