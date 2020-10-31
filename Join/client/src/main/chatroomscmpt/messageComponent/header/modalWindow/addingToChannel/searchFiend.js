import getGQL from "../../../../../../getGQL";

export const searchFriendUser = async ({usernameSearchFriend}) => {
    return await getGQL('/graphql')
                (`query getFriends($username: String){
                          getFriends(username: $username){
                            id
                            username
                             media{
                                  id
                                  filename
                                  urlFilename
                                }
                          }
                        }`, `{"username": \"${usernameSearchFriend}\"}`)
}