import getGQL from "../../../getGQL";

export const getChosenChannel = async (idChannel) => {
    return await getGQL('/graphql')
    (`query GetChatById($id: String){
                  getChatById(id: $id){
                    id
                    name
                    users {
                      id
                      username
                    }}}`, `{"id": \"${idChannel}\"}`)
}