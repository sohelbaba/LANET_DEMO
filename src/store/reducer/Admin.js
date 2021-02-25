import * as actionTypes from '../action/actions'

const init_state = {
    employees : null,
    error : null,
    designation : null,
    serverError : null
}

const AdminReducer = (state = init_state,action) =>{
    
    switch (action.type) {
        case actionTypes.FETCH_ALL_USER_DATA:
            return{
                ...state,
                employees : action.data
            }
        case actionTypes.ERROR_FETCH_ALL_DATA:
            return{
                ...state,
                error : action.data.error
            }
        case actionTypes.SERVER_ERROR:
            return{
                ...state,
                serverError : action.error
            }
        case actionTypes.ADD_DESIGNATIONS:
            return{
                ...state,
                designation : action.data
            }
        default:
            return state;
    }
}

export default AdminReducer