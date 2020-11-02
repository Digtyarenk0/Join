import getGQL from "../../getGQL";

export const getLastMsg = async ({id}) => {
    return await getGQL('/graphql')
    (`query getLastMSG($id: String){
  getLastMsg(id: $id){
    id
    content
    createdAt
    type
        chat{
      id
      name
    }
    user{
      id
      username
      media{
        id
        filename
        urlFilename
      }}}}`,`{"id": \"${id}\"}`)
}