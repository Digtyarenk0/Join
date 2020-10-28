import getGQL from "../../../../../../getGQL";

export const addingFriendToChannel = async ({channelId,userId}) => {
    return await getGQL('/graphql')
                (`mutation addUserTochat($chatId: ID, $userId: ID){
                                addUserToChat(chat: {chatId: $chatId, userId: $userId})
                                }`,
                    `{"chatId": \"${channelId}\",
                                    "userId": \"${userId}\"}`)
}