import decode from 'jwt-decode'

const initState = {
    username: '',
    tokens: ''
}

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "USER_LOGOUT": {
            localStorage.clear()
            window.location = '/'
            return {}
        }
        case "USER_LOGIN": {
            const user = decode(action.payload.accessToken)
            localStorage.authToken = JSON.stringify(action.payload)
            window.location = '/join'
            return {
                status: "LOGINED",
                payload: user.username
            }
        }
        case "CHECK_LOG": {
            let user = null
            let access = false
            try {
                const tokens = JSON.parse(localStorage.authToken)
                if (tokens && tokens.accessToken && tokens.refreshToken) {
                    user = decode(tokens.accessToken)
                    access = true
                    return {
                        user: {id: user.userId, username: user.username},
                        access: access
                    }
                }
            }catch (e){
                return  {
                    user: user,
                    access: access
                }
            }
        }
        default :
            return {...state}
    }
}