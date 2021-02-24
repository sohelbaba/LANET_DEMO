import * as actionTypes from '../action/actions'

const init_state = {
    employee : null,
    error : null,
    serverError : null
}

const UserReducer = (state = init_state,action) =>{
    
    switch (action.type) {
        case actionTypes.FETCH_USER_DATA:
            return{
                ...state,
                employee : action.data
            }
        case actionTypes.ERROR_FETCH_DATA:
            return{
                ...state,
                error : action.data.error
            }
        case actionTypes.SERVER_ERROR:
            return{
                ...state,
                serverError : action.error
            }
        default:
            return state;
    }
}

export default UserReducer