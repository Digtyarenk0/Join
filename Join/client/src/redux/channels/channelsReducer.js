import * as actions from './actions'

const initState = {
    name: "wait fetch channels",
    status: "wait",
    error: null,
    loader: false
}

export const channelsReducer = (state = initState, action) => {
    if (action.name == "getChannelLastMSG") {
        if (action.status == "RESOLVED") {
            if (state.getChannels){
                state.getChannels.payload.data.getChatsUs.map(channel => {
                    if (channel.id == action.payload.data.getLastMsg.chat.id) {
                        channel.lastMessage = action.payload.data.getLastMsg
                    }
                })
                return {
                    [action.name]: {
                        status: action.status,
                        payload: state.getChannels.payload,
                        error: action.error,
                        loader: action.loader
                    }
                }
            }
            state.getChannelLastMSG.payload.data.getChatsUs.map(channel => {
                if (channel.id == action.payload.data.getLastMsg.chat.id) {
                    channel.lastMessage = action.payload.data.getLastMsg
                }
            })
            return {
                "getChannels": {
                    status: action.status,
                    payload: state.getChannelLastMSG.payload,
                    error: action.error,
                    loader: action.loader
                }
            }
        }
        return {...state}
    }
    if (action.type === 'SET_STATUS_CHANNELS') {
        if (action.status === actions.actionResolved.status) {
            return {
                status: action.status,
                name: action.name,
                payload: action.payload,
                loader: action.loader
            }
        }
        return {
            [action.name]: {
                status: action.status,
                payload: action.payload,
                error: action.error,
                loader: action.loader
            }
        }
    }
    return {...state}
}