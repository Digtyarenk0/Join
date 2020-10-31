import getGQL from "../../getGQL";

export const getChannels = async () => {
    return await getGQL('/graphql')
    (`query GetMyChatRooms{
                      getChatsUs{
                        id
                        name
                        lastMessage{
                        id
                        content
                        createdAt
                         user{
                            id
                            username
                             media{
                              id
                              filename
                              urlFilename
                            }
                          }
                      }}}`)
}