import getGQL from "../../../../getGQL";

export const sendMessageInChosenChannel = async ({idChannel, messageContent}) => {
    return  await getGQL('/graphql')
    (`mutation postMSG($id: ID, $content: String!){
                          postMessage(message: {chatId: $id, content:$content}){
                            id
                            content
                            createdAt
                            user{
                              id
                              username
                            }
                          }
                        }`, `{"id": \"${idChannel}\",
                                    "content": \"${messageContent}\"}`)
}