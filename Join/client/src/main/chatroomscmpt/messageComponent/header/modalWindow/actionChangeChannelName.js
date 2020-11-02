import getGQL from "../../../../../getGQL";

export const changeChannelName = async ({id,name}) => {
    return await getGQL('/graphql')
    (`mutation changenameChat($id: String, $name: String){
                              changeNameChat(id: $id, name: $name){
                                id
                                name
                              }
                            }`,
        `{"id": \"${id}\",
                    "name": \"${name}\"}`)
}