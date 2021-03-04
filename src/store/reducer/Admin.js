import * as actionTypes from '../action/actions'

const init_state = {
    employees : null,
    error : null,
    designation : null,
    serverError : null,
    Alltasks : null,
    AllLeaves : null,
    salarydetails : null,
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
        case actionTypes.SET_DATA_ERROR:
            return{
                ...state,
                error : action.error
            }
        case actionTypes.GET_TASKS:
            return{
                ...state,
                Alltasks : action.data
            }
        case actionTypes.GET_LEAVES:
            return{
                ...state,
                AllLeaves:action.data
            }
        case actionTypes.FETCH_ALL_SALARY_DETAILS:
            return{
                ...state,
                salarydetails : action.data
            }
        default:
            return state;
    }
}

export default AdminReducer