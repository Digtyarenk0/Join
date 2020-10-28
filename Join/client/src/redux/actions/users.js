export function userFetchDataSuccess(user) {
    return {
        type: "USERS_FETCH_DATA_SUCCESS",
        user
    }
}

export function userFetchData(url) {
    console.log("USERS RED", url)
    return dispatch => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(user => {
                dispatch(userFetchDataSuccess((user)))
            })
    }
}