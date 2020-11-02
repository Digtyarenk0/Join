import getGQL from "../../getGQL";

export const getLastMsg = async ({id}) => {
    console.log(id)
    return await getGQL('/graphql')
    (`query getLastMSG($id: String){
  getLastMsg(id: $id){
    id
    content
    createdAt
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