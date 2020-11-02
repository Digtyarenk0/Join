import io from 'socket.io-client';

const socket = io.connect();
const socketPostUserData = (data) => socket.emit("UserDataInf", data)

socket.on('connect', function() {
    let status = document.querySelector('.StatusUser')
    if (status){
        status.style.color = "#41B581"
    }
});

socket.on('disconnect', function() {
    let status = document.querySelector('.StatusUser')
    if (status){
        status.style.color = "#474951"
    }
});

function socketMyChannelsParticipation(data) {
    return socket.emit('channelsUserParticipation', data)
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

function socketNewMSGWait(dispatchGetMSG,dispatchGetNewLastMsgChannel) {
    socket.on("newMessagePleaseUpdateHistory", async data => {
        if (data && data.idChannel) {
            console.log("FAFA", data)
                dispatchGetMSG({idChannel: data.idChannel})
                dispatchGetNewLastMsgChannel({id: data.idChannel})
        }
    })
}

function socketSendMessage(data) {
    return socket.emit("sendMessageToChannel", data)
}


export {
    socketPostUserData,
    socketMyChannelsParticipation,
    socketJoinToChannel,
    socketSendMessage,
    socketNewMSGWait,
    socketAddToChannel,
    waitAddMeToNewChannel,
    socketNotiUserThatDel,
    socketWaitingNotiUserThatDel
}