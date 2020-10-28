import getGQL from "../getGQL";

export const mutationLogin = async ({login, password}) => {
    return await getGQL('/graphql')
    (`query Login($login: String!, $password: String!) {
        login(login: $login, password: $password){
                    accessToken
                    refreshToken
                }}`,
        `{"login": \"${login}\",
                       "password": \"${password}\"
                      }`)
}