import getGQL from "../../../../../getGQL";

export const addingFriend = async ({idFriendUser}) => {
    return await getGQL('/graphql')
    (`mutation AddFriend($id: String){
                                  addFriend(id: $id){
                                    id
                                    username
                                  }
                                }
                            `, `{"id": \"${idFriendUser}\"}`)
}