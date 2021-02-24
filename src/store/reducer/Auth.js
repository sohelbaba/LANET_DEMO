import * as actionTypes from '../action/actions'

const INIT_STATE = {
    token :null,
    role : null,
    error : null,
    Server_Error : null
}

const AuthReducer = (state = INIT_STATE,action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.data.access_token,
                role : action.data.role,
                error : null
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error : action.data.error
            }
        case actionTypes.SERVER_ERROR:
            return {
                ...state,
                Server_Error : action.error
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                token : null,
                role :null,
            }
            
        default:
            return state
    }
}

export default AuthReducer