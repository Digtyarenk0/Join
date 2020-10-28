import getGQL from "../../../../getGQL";

export const getMessagesByChannel = async ({idChannel}) => {
    return await getGQL('/graphql')
    (`query getMessagesByChat($id: String){
                      getMessagesByChat(id: $id){
                        id
                        content
                        createdAt
                        user{
                          username
                        }
                      }
                    }`, `{"id": \"${idChannel}\"}`)
}