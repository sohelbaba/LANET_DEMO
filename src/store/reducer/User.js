import * as actionTypes from '../action/actions'

const init_state = {
    employee : null,
    error : null,
    tasks : null,
    leaves : null,
    serverError : null,
    salarydetails : null,

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
        case actionTypes.FETCH_TASKS:
            return{
                ...state,
                tasks : action.data
            }
        case actionTypes.FETCH_LEAVE:
            return{
                ...state,
                leaves : action.data
            }
        case actionTypes.FETCH_EMPLOYEE_SALARY_DETAILS:
        return{
            ...state,
            salarydetails:action.data
        }

        default:
            return state;
    }
}

export default UserReducer