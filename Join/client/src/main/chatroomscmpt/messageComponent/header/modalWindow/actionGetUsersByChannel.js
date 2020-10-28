import getGQL from "../../../../../getGQL";

export const getUsersByChannel = async ({channelId}) => {
    return await getGQL('/graphql')
    (`query getUsersByChat($id: String){
                              getUsersByChannel(id: $id){
                                username
                                id
                              }
                            }`,
        `{"id": \"${channelId}\"}`)
}