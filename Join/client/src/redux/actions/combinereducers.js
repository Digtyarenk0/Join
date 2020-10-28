// import {combineReducers} from "redux";
//
//
// const stagePromise = ((state, action) => {
//     if (action.type === 'SET_STATUS') {
//         if (action.status === 'RESOLVED' && action.payload.success === true) {
//             return {
//                 status: action.status,
//                 success: action.payload.success,
//                 token: action.payload.token,
//                 user: action.payload.user
//             }
//
//         }
//         return {
//             [action.name]: {status: action.status, payload: action.payload, error: action.error}
//         }
//     }
//
//     return {
//         ...state
//     }
//
// })
//
//
// const typeAct = ((state, action) => {
//     if (!state) {
//         if (localStorage.getItem("UserToken") === "null" || localStorage.getItem("UserToken") === null ||
//             localStorage.getItem("UserToken") === undefined || localStorage.getItem("UserToken") === "undefined") {
//             localStorage.removeItem("UserToken")
//             return {}
//         } else {
//             return {
//                 token: localStorage.getItem("UserToken"),
//                 user: JSON.parse(localStorage.getItem("UserInfo"))
//             }
//         }
//     }
//
//
//
//     if (action.type === 'AUTH_LOGOUT') {
//         localStorage.clear()
//         return {}
//     }
//
//     return {}
// })
//
//
// export default combineReducers({
//     stages: stagePromise,
//     auth: typeAct
// })