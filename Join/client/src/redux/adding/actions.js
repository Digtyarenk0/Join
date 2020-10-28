const actionPending = name => ({
        type: 'ADDING',
        status: 'PENDING',
        name: name,
        payload: null,
        error: '',
    }
)


const actionResolved = (payload, name) => ({
    type: 'ADDING',
    status: 'RESOLVED',
    name: name,
    payload,
    error: '',
})
const actionRejected = (error, name) => ({
    type: 'ADDING',
    status: 'REJECTED',
    name: name,
    payload: null,
    error
})

function actionPromiseAdding(prom, name) {
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

export {actionPromiseAdding,actionPending,actionResolved,actionRejected}
