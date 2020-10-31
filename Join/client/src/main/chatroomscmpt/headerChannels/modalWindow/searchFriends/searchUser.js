import getGQL from "../../../../../getGQL";

export const searchUser = async ({valueSearchFriend}) => {
    return await getGQL('/graphql')
    (`query getUsersUsername($username: String){
                          getUsersByUsername(username: $username){
                            id
                            username
                             media{
                              id
                              filename
                              urlFilename
                            }
                          }
                        }`, `{"username": \"${valueSearchFriend}\"}`)
}