const actionPending = name => ({
    type: 'SET_STATUS',
    status: 'PENDING',
    name: name,
    payload: null,
    error: '',
    loader: true}
    )


const actionResolved = (payload, name) => ({
    type: 'SET_STATUS',
    status: 'RESOLVED',
    name: name,
    payload,
    error: '',
    loader: false
})
const actionRejected = (error, name) => ({
    type: 'SET_STATUS',
    status: 'REJECTED',
    name: name,
    payload: null,
    loader: false,
    error})

function actionPromise(prom, name) {
    return async function (dispatch) {
        dispatch(actionPending(name))
        try {
            let promsave = await prom
            dispatch(actionResolved(promsave, name))
            return promsave
        } catch (e) {
            dispatch(actionRejected(e, name))
        }
    }
}

export {actionPromise,actionPending,actionResolved,actionRejected}
