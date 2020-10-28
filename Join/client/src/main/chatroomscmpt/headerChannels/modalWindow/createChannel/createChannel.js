import getGQL from "../../../../../getGQL";

export const createChannel = async ({inputChatName}) => {
    return await getGQL('/graphql')
    (`mutation CrateChat($chatName: String){
                          createChat(chat: {name: $chatName}){
                            id
                            name
                            users{
                              id
                            }}}`, `{"chatName": \"${inputChatName}\"}`)
}