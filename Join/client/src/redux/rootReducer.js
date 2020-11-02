import {combineReducers} from "redux";
import {userReducer} from './user/userReducer'
import {stageReducer} from './stage/stageReducer'
import {channelsReducer} from './channels/channelsReducer'
import {channelsLSTMSGReducer} from './channelsLastMSG/channelsLSTMSGReducer'
import {chosenChannelReducer} from './useChannel/useChannelReducer'
import {chosenChannelMessagesReducer} from './useChannelMessages/chosenChannelMessagesReducer'
import {addingReducer} from './adding/addingReducer'

export const rootReducer = combineReducers({
        user: userReducer,
        channels: channelsReducer,
        channelLSTMSG: channelsLSTMSGReducer,
        chosenChannel: chosenChannelReducer,
        chosenChannelMessages: chosenChannelMessagesReducer,
        stage: stageReducer,
        adding: addingReducer
})