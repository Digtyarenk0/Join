import io from 'socket.io-client';

const socket = io.connect();
const socketPostUserData = (data) => socket.emit("UserDataInf", data)

function socketMyChannelsParticipation(data) {
    return socket.emit('channelsUserParticipation', data)
}

function socketStatusUser(){
    socket.on("connectionStatus",data => {
        if(data){
            document.querySelector('.StatusUser').style.color = "#41B581"
        }else {
            document.querySelector('.StatusUser').style.color = "#474951"
        }
    })
}

function socketJoinToChannel() {
    return socket.on("userJoin", data => {
        return data
    })
}

function socketNotiUserThatDel (data) {
    socket.emit("notificationThatUserWasOutChannel", data)
}

function socketWaitingNotiUserThatDel(dispatchOutChannel) {
    socket.on("notificationThatYouWasOutChannel", (data) => {
        if(data && data.not) {
            dispatchOutChannel()
        }
    })
}


function socketAddToChannel(data) {
    socket.emit("addUserToChannel", data)
}

function waitAddMeToNewChannel(dispatchGetNewChannel) {
    socket.on("getUserAddToNewChannel", (data) => {
        if(data && data.channelId) {
            dispatchGetNewChannel()
        }
    })
}

function socketNewMSGWait(dispatchGetMSG) {
    socket.on("newMessagePleaseUpdateHistory", async data => {
        if (data && data.idChannel) {
            dispatchGetMSG({idChannel: data.idChannel})
        }
    })
}

function socketSendMessage(data) {
    return socket.emit("sendMessageToChannel", data)
}


export {
    socketPostUserData,
    socketMyChannelsParticipation,
    socketStatusUser,
    socketJoinToChannel,
    socketSendMessage,
    socketNewMSGWait,
    socketAddToChannel,
    waitAddMeToNewChannel,
    socketNotiUserThatDel,
    socketWaitingNotiUserThatDel
}