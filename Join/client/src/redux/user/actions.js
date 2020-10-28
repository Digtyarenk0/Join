export const actionLogin = (token) => ({type: "USER_LOGIN", payload: token})
export const actionCheckLog = () => ({type: "CHECK_LOG", user: '' , access: false})
export const actionLogout = () => ({type: "USER_LOGOUT"})

