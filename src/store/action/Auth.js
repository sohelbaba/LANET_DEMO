import * as actionTypes from './actions'
import axios from 'axios'

const Auth_Success = (data) =>{
    return{
        type :actionTypes.AUTH_SUCCESS,
        data
    }
}

const Auth_Fail = (data) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        data
    }
}

const Server_Error = (error) =>{
    return {
        type: actionTypes.SERVER_ERROR,
        error:error
    }
}

export const Auth = (username,password) =>{
    return dispatch =>{
        const payload = {username,password}
        axios.post('http://127.0.0.1:5000/employee/login',payload)
        .then(response =>{
            if(response.data.success){
                localStorage.setItem("token",response.data.access_token)
                localStorage.setItem("role",response.data.role)
                dispatch(Auth_Success(response.data))
            }else{
                dispatch(Auth_Fail(response.data))
            }
        })
        .catch(error =>{
            dispatch(Server_Error(error))
        })
    }
}

export const AutoSignInCheck = () => {
    return dispatch => {
        const access_token = localStorage.getItem('token')
        if (access_token === null) {
            dispatch(logout())
        } else {
            const role = localStorage.getItem('role')
            const data ={access_token,role}
            dispatch(Auth_Success(data))
        }

    }
}

const logout = () =>{
    return {
        type : actionTypes.LOGOUT
    }
}

export const logout_start = (token) =>{
    // localStorage.removeItem('token')
    // localStorage.removeItem('role')
    return dispatch =>{
        const yourConfig = {
            headers: {
            Authorization: "Bearer " + token
        }}

        axios.get('http://127.0.0.1:5000/employee/logout', yourConfig)
        .then(response =>{
            dispatch(logout())
        })
        .catch(error =>{
            dispatch(Server_Error(error))
        })
    }
}