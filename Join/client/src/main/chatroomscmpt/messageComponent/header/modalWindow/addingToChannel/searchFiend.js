import getGQL from "../../../../../../getGQL";

export const searchFriendUser = async ({usernameSearchFriend}) => {
    return await getGQL('/graphql')
                (`query getFriends($username: String){
                          getFriends(username: $username){
                            id
                            username

                          }
                        }`, `{"username": \"${usernameSearchFriend}\"}`)
}