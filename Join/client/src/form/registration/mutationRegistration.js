import getGQL from "../../getGQL";

export const mutationRegistration = async ({login, password,username}) => {
    return await getGQL('/graphql')
    (`mutation registration($username: String,$login: String,$password: String){
                registration(user: {username: $username, login: $login, password: $password}){
                            id
                            username
                        }}`, `{  "username": \"${username}\",
                        "login": \"${login}\",
                       "password": \"${password}\"}`)
}