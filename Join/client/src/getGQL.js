import refreshToken from "./refreshToken";

const getGQL = (url, headers = {}) =>
    (query = "", variables = {}) => {
       return refreshToken().then(() => {
            return fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.authToken,
                        ...headers
                    },
                    body: JSON.stringify({query, variables})
                })
                .then(res => res.json())
    }) }

export default getGQL