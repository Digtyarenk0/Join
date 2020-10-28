import decode from 'jwt-decode'

async function refreshToken() {
    if (localStorage.authToken) {
        let tokens = JSON.parse(localStorage.authToken)
        let timeTokenAccess = decode(tokens.accessToken)
        let timeTokenRefresh = decode(tokens.refreshToken)
        if (Date.now() >= (timeTokenAccess.exp * 1000)) {
            if (Date.now() <= (timeTokenRefresh.exp * 1000)) {
                let refreshToken = {"refreshToken": tokens.refreshToken}
                let newTokens = await fetch('/refresh-tokens',
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({...refreshToken})
                    }).then(newToken => newToken.json())
                if (newTokens && newTokens.refreshToken) {
                    if (!newTokens.accessToken) {
                        console.log("SESEION ACCESS ERROR")
                        alert("Сессия завершена \n")
                        window.location = '/'
                        localStorage.clear()
                    }
                    localStorage.authToken = JSON.stringify(newTokens)
                console.log("New Token Set")
                }
            }else {
                console.log("SESEION EXP")
                alert("Сессия завершена \n")
                window.location = '/'
                localStorage.clear()
            }
        }
    }
}

export default refreshToken
