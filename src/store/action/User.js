import * as actionTypes from './actions'
import axios from 'axios'

const fetch_userdata = (data) =>{
    return{
        type: actionTypes.FETCH_USER_DATA,
        data
    }
}

const error_fetchdata = (data) =>{
    return{
        type :actionTypes.ERROR_FETCH_DATA,
        data  
    }
}

const Server_Error =  (error) =>{
    return{
        type : actionTypes.SERVER_ERROR,
        error : error
    }
}

export const fetch_userdata_start = (token) =>{

    return dispatch =>{
        const yourConfig = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            }
        }
        axios.get('http://127.0.0.1:5000/employee/details',yourConfig)
        .then(response =>{    
            if(response.data.success){
                console.log(response.data)
                dispatch(fetch_userdata(response.data))
            }else{
                dispatch(error_fetchdata(response.data))
            }  
        })
        .catch(error =>{
            dispatch(Server_Error(error))
        })
    }
}

export const set_userPersonalDetails_start = (data,token) =>{
    return dispatch =>{
        const yourConfig = {
        headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        // console.log(payload)
        axios.put('http://127.0.0.1:5000/employee/profile',payload,yourConfig)
        .then(response =>{})
        .catch(error =>{
            console.log(error)
            dispatch(Server_Error(error))            
        })
    }
}  

export const set_userAddressDetails_start = (data,token) =>{
    return dispatch => {

        const yourConfig = {
        headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        console.log(payload)
        axios.put('http://127.0.0.1:5000/employee/address',payload,yourConfig)
        .then(response =>{})
        .catch(error =>{
            dispatch(Server_Error(error))            
        })
    }
}

export const set_userQualificationDetails_start = (data,token) =>{
     return dispatch => {

        const yourConfig = {
        headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        console.log(payload)
        axios.put('http://127.0.0.1:5000/employee/qualification',payload,yourConfig)
        .then(response =>{})
        .catch(error =>{
            dispatch(Server_Error(error))            
        })
    }
}

export const set_userSalaryDetails_start = (data,token) =>{
     return dispatch => {

        const yourConfig = {
        headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        console.log(payload)
        axios.put('http://127.0.0.1:5000/employee/salaryinfo',payload,yourConfig)
        .then(response =>{})
        .catch(error =>{
            dispatch(Server_Error(error))            
        })
    }
}

export const add_task = (data,token) =>{
     return dispatch => {

        const yourConfig = {
            headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        axios.post('http://127.0.0.1:5000/employee/task',payload,yourConfig)
        .then(response =>{})
        .catch(error =>{
            dispatch(Server_Error(error))            
        })
    }
}

export const update_task = (data,token,index) =>{
     return dispatch => {

        const yourConfig = {
            headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        axios.put('http://127.0.0.1:5000/employee/task/'+index
        ,payload,yourConfig)
        .then(response =>{})
        .catch(error =>{
            dispatch(Server_Error(error))            
        })
    }
}

export const apply_leave = (data,token) =>{
     return dispatch => {

        const yourConfig = {
            headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        axios.post('http://127.0.0.1:5000/employee/leave',payload,yourConfig)
        .then(response =>{
            console.log(response.data)
        })
        .catch(error =>{
            // dispatch(Server_Error(error))            
        })
    }
}

export const change_password = (data,token) =>{
    return dispatch =>{
        const yourConfig = {
            headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
        }}
        const payload = JSON.stringify(data)
        axios.put('http://127.0.0.1:5000/employee/changepassword',payload,yourConfig)
        .then(response =>{})
        .catch(error =>{
            dispatch(Server_Error(error))            
        })
    }
}

const fetch_tasks = (data) =>{
    return{
        type : actionTypes.FETCH_TASKS,
        data
    }
}

export const fetch_tasks_start = (token) =>{

    return dispatch =>{
        const yourConfig = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            }
        }
        axios.get('http://127.0.0.1:5000/employee/tasks',yourConfig)
        .then(response =>{   
            // console.log(response.data)
            dispatch(fetch_tasks(response.data))  
        })
        .catch(error =>{
            console.log(error)
            // dispatch(Server_Error(error))
        })
    }
}

const fetch_leaves = (data) =>{
    return{
        type : actionTypes.FETCH_LEAVE,
        data
    }
}

export const fetch_leave_start = (token) =>{

    return dispatch =>{
        const yourConfig = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            }
        }
        axios.get('http://127.0.0.1:5000/employee/applyleaves',yourConfig)
        .then(response =>{   
            // console.log(response.data)
            dispatch(fetch_leaves(response.data))  
        })
        .catch(error =>{
            console.log(error)
            // dispatch(Server_Error(error))
        })
    }
}

const fetch_employee_salary= (data) =>{
    return{
        type : actionTypes.FETCH_EMPLOYEE_SALARY_DETAILS,
        data
    }
}

export const fetch_employee_salardetails_start = (token) =>{

    return dispatch =>{
        const yourConfig = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            }
        }
        axios.get('http://127.0.0.1:5000/employee/salarydetails',yourConfig)
        .then(response =>{    
            console.log(response.data)
            dispatch(fetch_employee_salary(response.data))  
        })
        .catch(error =>{
            dispatch(Server_Error(error))
        })
    }
}


const fetch_employee_history= (data) =>{
    return{
        type : actionTypes.FETCH_EMPLOYEE_GRADE_HISTORY,
        data
    }
}

export const fetch_employee_history_start = (token) =>{

    return dispatch =>{
        const yourConfig = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            }
        }
        axios.get('http://127.0.0.1:5000/employee/gradeshistory',yourConfig)
        .then(response =>{    
            console.log(response.data)
            dispatch(fetch_employee_history(response.data))  
        })
        .catch(error =>{
            dispatch(Server_Error(error))
        })
    }
}

