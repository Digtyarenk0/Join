import getGQL from "../../../../../getGQL";

export const delUserOfChannel = async ({channelId,userId}) => {
    console.log(channelId,userId)
    return await getGQL('/graphql')
    (`mutation DelUserForChannel($idChannel: String, $idUser: String){
                                      deleteUserOfChannel(idChannel: $idChannel, idUser: $idUser){
                                        text
                                        content
                                      }
                                    }`,
        `{"idChannel": \"${channelId}\",
                                    "idUser": \"${userId}\"}`)
}